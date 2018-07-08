import axios from 'axios'

export default {
  getSiteData: () => ({
    siteTitle: 'React Static',
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return [
      {
        path: '/',
        component: 'src/components/home/home',
      },
      {
        path: '/blog',
        component: 'src/components/blog/blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/components/blog/post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/components/404',
      },
    ]
  },
}
