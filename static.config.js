import React, { Component } from 'react'
import { reloadRoutes } from 'react-static/node'
import chokidar from 'chokidar'
import jdown from 'jdown'

chokidar.watch('content').on('all', () => reloadRoutes())

export default {
  Document: class CustomHtml extends Component {
    render () {
      const { Html, Head, Body, children } = this.props
      return (
        <Html>
          <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no" />
          </Head>
          <Body>
            {children}
          </Body>
        </Html>
      )
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080
  },
  getSiteData: () => ({
    siteTitle: 'Duck Billed Datapus',
  }),
  getRoutes: async () => {
    const { posts } = await jdown('content')
    return [
      ...makePageRoutes({
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
      {
        is404: true,
        component: 'src/pages/404',
      },
    ]
  },
}

function makePageRoutes({
  items,
  pageSize,
  pageToken = 'page',
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