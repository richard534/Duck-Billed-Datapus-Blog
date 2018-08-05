---
title: Uploading/Streaming Audio using NodeJS + Express + MongoDB/GridFS
description: How to upload/stream music to/from nodejs with express and mongo
slug: uploading-streaming-audio-using-nodejs-express-mongodb-gridfs
date: 08 Nov 2017
---

I am writing this post in reaction to the lack of information I found while trying to develop my final year computer science project. My project was a music streaming web application akin to spotify.
> This posts code Repository: [https://github.com/richard534/nodeMongoAudioUploadStreamTest/tree/master](https://github.com/richard534/nodeMongoAudioUploadStreamTest/tree/master)

There are tutorials out there that cover this, however, almost all of them make use of further abstractions such as the “[gridfs-stream](https://www.npmjs.com/package/gridfs-stream)” npm package.

In this tutorial I will just use the native[ MongoDB driver for node](https://www.npmjs.com/package/mongodb) to handle interacting with GridFS. This gives you a lot more flexibility and will help you control what’s actually happening under the hood.

### Assumptions

* Basic understanding of mongodb (starting mongod, viewing collections)

* Basics of express and express router

* Basics of JavaScript (callback functions)

### Npm Module Dependencies (NPM packages)

* [Express](https://www.npmjs.com/package/express)@4.13.3 (nodejs web application framework, simplifies creation of RESTful API)

* [Multer](https://www.npmjs.com/package/multer)@1.3.0 (for handling multipart/form-data requests)

* [Mongodb](https://www.npmjs.com/package/mongodb)@2.2.33 (official mongodb nodejs driver)

### Node Module Dependencies

* [Stream](https://nodejs.org/api/stream.html#stream_readable_streams) (Node module that handles streaming of data)

## Let Code Begin 💻

Create a new directory and run npm init to create a package.json file

    mkdir streamingMusicTest
    cd streamingMusicTest
    npm init
    npm install --save express mongodb multer
    touch index.js

Once this is done open your index.js file in a text editor then follow along.

### Module Dependencies

```javascript
/**
 * NPM Module dependencies.
 */
const express = require('express');
const trackRoute = express.Router();
const multer = require('multer');

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

/**
 * NodeJS Module dependencies.
 */
const { Readable } = require('stream');
```

You’ll first want to declare your module dependencies. I’ve split these into both npm modules and nodejs modules for readability.

### Initialize Express, Express Router and MongoDB


Next we will initialize the express application. Then we will call app.use('/tracks', trackRoute) to bind the trackRoute router to the /tracks URL.

It is then time to connect our application to mongoDB. I declare a variable called db in the module scope of the file to store an instance of the database once we have successfully connected to it.

After that we use the [MongoClient AP](https://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html)I; which is part of the node mongodb driver, to connect to our local mongodb database.

### Declaring GET track stream route


The next step is to declare the REST route that will handle getting the track stream from our web service.

We will use the get method on the express router object referenced by the trackRoute variable to create a handler for GET requests on the/tracks/:trackID URL. Express will automatically bind the value present in the :trackID section of the URL to the variable req.params.trackID within the callback function of the .get method.

The first step we need to take inside this method is to try and cast the string value present in the req.params.trackID variable to a mongoDB ObjectID. The reason for this cast is because the openDownloadStream method that we use further on in this function [requires a variable of type objectID to be passed to it](https://mongodb.github.io/node-mongodb-native/2.2/api/GridFSBucket.html#openDownloadStream).

We wrap the cast in a try catch because the MongoDB drivers [ObjectID](https://mongodb.github.io/node-mongodb-native/2.2/api/ObjectID.html) API throws an error if it fails to cast the string to an objectID.

After a successful cast we set the response headers to ‘content-type: audio/mp3' and ‘accept-ranges: bytes’. This will help the browser know how to handle the response. *Note: Properly handling partial content (client skipping through track) is out of the scope of this tutorial, this is a good [article](https://www.codeproject.com/Articles/813480/HTTP-Partial-Content-In-Node-js) regarding that topic.

We then create a variable called bucket and initialize it with an instance of [GridFSBucket](https://mongodb.github.io/node-mongodb-native/2.2/api/GridFSBucket.html) from the mongodb module. We pass the db variable we initialized earlier and an object literal which declares the bucket name we want to read from. In this case we named the bucket “tracks”.

The [openDownloadStream](https://mongodb.github.io/node-mongodb-native/2.2/api/GridFSBucket.html#openDownloadStream) method on the GridFSBucket object returns a readable stream for streaming file data from gridfs. We need only pass it the trackID of the file we want to stream.

When we say a “readable stream” we are referring to a readable stream as defined in the NodeJS [Streams API](https://nodejs.org/api/stream.html#stream_readable_streams).

The readable stream returned from the openDownloadStream method emits a number NodeJS [Events](https://nodejs.org/api/events.html). You can see from the [Readable Stream Docs](https://nodejs.org/api/stream.html#stream_class_stream_readable) that a readable stream emits five types of events; close, data, end, error and readable.

For our purposes we are only interested in the data, error and end events. We write a [listener function](https://nodejs.org/api/events.html#events_emitter_on_eventname_listener) for each of these possible events.

    downloadStream.on('data', (chunk) => { res.write(chunk); });

We must add a data event listener in order to start the stream flowing. The data event is emitted each time a chunk is available (a chunk being a part of the file). The listener callback will be passed a chunk each time the event is called. Inside the listener callback we can then use the res.write function to send the chunk to the client. This is performed until the readable stream runs out of data; at which point the end event is called. As a sidenote the res.write function is actually not a part of express, we are directly calling the [Node HTTP API](https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback).

    downloadStream.on('end', () => { res.end(); });

Once we readable stream emits the end event we simply use the express res.end method to end the response process.

    downloadStream.on('error', () => { res.sendStatus(404); });

For completeness I also wrote a listener function for the error event. For the sake of simplicity in the event of an error I just send a 404 to the client. In the real world you will want to parse the error and return a more accurate error message.

### Declaring POST track route


Finally its time to declare the REST route that will handle posting a track to our web service.

Much the same as last time we use the express router instance we assigned to thetrackRoute variable. Using the get method on the router object we create a handler for GET requests on the /tracks URL.

Instead of passing data to the backend using a URL parameter like :trackID in the last example we will be sending a [POST request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) with the ‘multipart/formdata’ content type in the header. This will allow us to add a track name and binary track to the request body.

The other type of post request body is called 'application/x-www-form-urlencoded'. It is commonly used when we just want to send key-value pairs to the server. However it disallows the sending of binary files, as such we must use the‘multipart/formdata’ request type.

Express does not support ‘multipart/formdata’ requests by default. In order to handle our requests we must use an npm package called [Multer](https://www.npmjs.com/package/multer).

The first thing we do in our post handler is initialise an instance of multer with a number of options. I pass an instance of multer.memoryStorage to the storage option of the multer object. This will tell multer to store the uploaded file in a buffer while it is being processed, preventing the file from ever being written to the file system. I also pass an object literal called ‘limits’.

The limits object is stating that I want my request to have a maximum of 1 non-file field, a maximum filesize of 6mb (filesize denoted in bytes), a maximum of 1 file in the request and a maximum of 2 parts (files+fields). Multer will perform validation against these conditions and pass an error if it fails.

We use multers .single(fieldname) method to accept a single file with the name track. We place the rest of this functions code inside the callback function of this method.

We then check if the .single() method’s callback function was passed an err value, which would indicate an error occurred during the multer validation. For the sake of simplicity I simply return a 400 “bad request” response to the client if multer passes an error. I then check if the request body contains a name key as the multer validation rules do not check this.

Since we are using Multer in memory storage mode the file is stored in memory as an object of type [Buffer](https://nodejs.org/api/buffer.html). Multer binds the file to a field in the express request object. We can retrieve it from the request object under req.file.buffer.

We must convert the buffer containing the file to a readable stream so we can stream it to gridFS. This is achieved using the readable class we imported from the Node streams API at the start. We create a new readable object using new Readable(). Readables .push method allows us to push the buffer into the readable. Finally we push a null value into the readable to signify the end of the data.

Same as the last example we initialize an instance of GridFSBucket and configure it to use the ‘tracks’ bucket on our local mongodb database.

The GridFSBuckets [.openUploadStream](https://mongodb.github.io/node-mongodb-native/2.2/api/GridFSBucket.html#openUploadStream)() method returns a writable stream for writing buffers to GridFS. we pass it the name of the track from the request body(this will be the files name in gridFS) and assign it to a variable called uploadStream.

We use the .pipe() method on the readable object referenced by the readableTrackStream variable to push all of its data to the writable uploadStream. This finally starts the process of streaming the file to gridFS.

Finally we just define a couple of listener functions for the ‘error’ and ‘finish’ events that the [GridFSBucketWriteStream emits](https://mongodb.github.io/node-mongodb-native/2.2/api/GridFSBucketWriteStream.html) (calling .openUploadStream on the GridFSBucket API returns an instance of GridFSBucketWriteStream). On error I simply return a 500 and on finish I send a 201 ‘created’ message.

## Lets see if its works 🕹

To test the web service I use [Postman](https://www.getpostman.com/). Start the node application by typing node index.js into the command line.

### POST track route

We can test the POST track endpoint using the following URL localhost:3005/tracks. Set the type of request to post and set the request body type to form-data. Finally add the name and track key-value pairs to the request, making sure to set the track value to type ‘file’ and selecting the track from your filesystem.

![Manually testing POST track endpoint](https://cdn-images-1.medium.com/max/4860/1*jt24F16eOklWORLkoGOI1Q.png)*Manually testing POST track endpoint*

We should receive a 201 response from the service and a message confirming the upload. Take a copy of the ObjectID returned; we will use it to test the GET track endpoint.

### GET track route

We can test the GET track endpoint using the following URL `localhost:3005/tracks/5a04a2ec95a1ac09f6d2d59e` (the url parameter being the object ID we received from the previous POST request). Set the type of the request to GET and send away!

![Manually testing POST track endpoint](https://cdn-images-1.medium.com/max/4880/1*w3N_-2mpvAboGAQ8tbrRgw.png)*Manually testing POST track endpoint*

Since we set the response ‘content type’ header to ‘audio/mp3’ postman will render a small player and begin playing the song.

## Further reading/inspiration

This post was heavily influenced by the following article on nodejs streams: [https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93)

Thanks for reading :) Please let me know what you think!

Follow me on Twitter: [https://twitter.com/Richard534](https://twitter.com/Richard534)
