import { LoaderClientProvider } from '@tanstack/react-loaders'
import { Router, RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { loaderClient } from './loaderClient'
import { indexRoute } from './routes/index/indexRoute'
import { postRoute } from './routes/posts/post/postRoute'
import { postsIndexRoute } from './routes/posts/post/postsIndexRoute'
import { postsRoute } from './routes/posts/postsRoute'
import { rootRoute } from './routes/root/rootRoute'

const routeTree = rootRoute.addChildren([
  postsRoute.addChildren([postRoute, postsIndexRoute]),
  indexRoute,
])

// Set up a Router instance
const router = new Router({
  routeTree,
  defaultPreload: 'intent',
  context: {
    loaderClient,
  },
})

// Register things for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <LoaderClientProvider client={loaderClient}>
      <RouterProvider router={router} />
    </LoaderClientProvider>,
  )
}
