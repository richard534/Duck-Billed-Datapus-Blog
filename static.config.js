import React, { Component } from 'react'
import { reloadRoutes } from 'react-static/node'
import chokidar from 'chokidar'
import jdown from 'jdown'
import { Renderer } from 'marked';
import highlightjs from 'highlight.js';

chokidar.watch('content').on('all', () => reloadRoutes())

// Custom marked renderers.
const renderer = new Renderer();
renderer.code = (code, language) => {
  // Check whether the given language is valid for highlight.js.
  const validLang = !!(language && highlightjs.getLanguage(language));
  // Highlight only if the language is valid.
  const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
  // Render the highlighted code with `hljs` class.
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

renderer.codespan = (code) => {
  return `<code class="hljs">${code}</code>`;
};

export default {
  Document: ({ Html, Head, Body, children }) => (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <Body>
        {children}
      </Body>
    </Html>
  ),
  siteRoot: 'https://duckbilleddatapus.com',
  devServer: {
    host: '0.0.0.0',
    port: 8080
  },
  getSiteData: () => ({
    siteTitle: 'Duck Billed Datapus',
  }),
  getRoutes: async () => {
    const { posts } = await jdown('content', { renderer })
    return [
      ...makePaginationRoutes({
        items: posts,
        pageSize: 5,
        pageToken: 'page',
        route: {
          path: '/',
          component: 'src/pages/home'
        },
        decorate: (pagePostContentItems, pageNum, totalNumPages) => ({
          getData: () => ({
            posts: pagePostContentItems,
            pageNum: pageNum,
            totalNumPages: totalNumPages
          }),
        })
      }),
      ...makeBlogPostRoutes({
        posts: posts,
        pageToken: 'post',
        route: {
          path: '/',
          component: 'src/pages/postPage'
        },
        decorate: (postContent, nextPost, previousPost) => ({
          getData: () => ({
            post: postContent,
            nextPost: nextPost,
            previousPost: previousPost
          }),
        })
      }),
      {
        is404: true,
        component: 'src/pages/404',
      }
    ]
  }
}

function makePaginationRoutes({
  items,
  pageSize,
  pageToken,
  route,
  decorate
}) {
  const itemsCopy = [...items].reverse() // Make a copy of the items
  const pages = [] // Make an array for all of the different pages

  while (itemsCopy.length) {
    // Splice out all of the items into separate pages using a set pageSize
    pages.push(itemsCopy.splice(0, pageSize))
  }

  // Calculate total number of pages before mutating the pages array
  const totalNumberPages = pages.length

  // Move the first page out of pagination. This is so page one doesn't require a page number.
  const firstPage = pages.shift()

  const routes = [
    {
      ...route,
      ...decorate(firstPage, 1, totalNumberPages) // and only pass the first page as data
    },
    // map over each page to create an array of page routes
    ...pages.map((page, i) => ({
      ...route, // route defaults
      path: `${route.path}/${pageToken}/${i + 2}`,
      ...decorate(page, i + 2, totalNumberPages)
    }))
  ]

  return routes
}

function makeBlogPostRoutes({
  posts,
  pageToken,
  route,
  decorate
}) {
  const routes = [
    // map over each markdown file and create a blog post route
    ...posts.map((post, i, array) => ({
      ...route, // route defaults
      path: `${route.path}/${pageToken}/${post.slug}`,
      ...decorate(post, nextPageIfExists(array, i), previousPageIfExists(array, i))
    }))
  ]

  return routes
}

function nextPageIfExists(pageArray, index) {
  let nextPageIndex = index + 1
  if(pageArray[nextPageIndex] == undefined) {
    return undefined
  } else {
    return pageArray[nextPageIndex]
  }
}

function previousPageIfExists(pageArray, index) {
  let previousPageIndex = index - 1
  if(pageArray[previousPageIndex] == undefined) {
    return undefined
  } else {
    return pageArray[previousPageIndex]
  }
}

