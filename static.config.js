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
        decorate: items => ({
          getData: () => ({
            posts: items
          })
        })
      }),
      ...makeBlogPostRoutes({
        items: posts,
        pageToken: 'post',
        route: {
          path: '/',
          component: 'src/pages/postPage'
        },
        decorate: item => ({
          getData: () => ({
            post: item
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

  // Move the first page out of pagination. This is so page one doesn't require a page number.
  const firstPage = pages.shift()

  const routes = [
    {
      ...route,
      ...decorate(firstPage) // and only pass the first page as data
    },
    // map over each page to create an array of page routes, and spread it!
    ...pages.map((page, i) => ({
      ...route, // route defaults
      path: `${route.path}/${pageToken}/${i + 2}`,
      ...decorate(page)
    }))
  ]

  return routes
}

function makeBlogPostRoutes({
  items,
  pageToken,
  route,
  decorate
}) {
  const routes = [
    // map over each page to create an array of page routes, and spread it!
    ...items.map((post, i) => ({
      
      ...route, // route defaults
      path: `${route.path}/${pageToken}/${post.slug}`,
      ...decorate(post)
    }))
  ]

  return routes
}
