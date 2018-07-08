import { reloadRoutes } from 'react-static/node'
import chokidar from 'chokidar'
import jdown from 'jdown'

chokidar.watch('content').on('all', () => reloadRoutes())

export default {
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
      {
        path: '/',
        component: 'src/pages/home',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.slug}`,
          component: 'src/containers/post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/pages/404',
      },
    ]
  },
}
