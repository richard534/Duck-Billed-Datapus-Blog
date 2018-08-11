import React from "react";
import { withRouteData, Link } from "react-static";

export default withRouteData(({ post }) => (
  <div className="blog-post">
    <p className="date-stamp">{post.date}</p>
    <Link to={"/post/" + post.slug}><h1>{post.title}</h1></Link>
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: post.contents }}
    />
    <Link to={"/post/" + post.slug + "#comment"}><p id="comment" className="comments">Comments (20)</p></Link>
  </div>
));
