import { lazyRouteComponent, Route } from '@tanstack/react-router'
import { rootRoute } from '../root/rootRoute'

export const postsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'posts',
  load: async ({ context: { loaderClient } }) => {
    await loaderClient.load({ key: 'posts' })
  },
}).update({
  component: lazyRouteComponent(() => import('./Posts'), 'Posts'),
})
