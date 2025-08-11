import { createRouter as createTanStackRouter } from '@tanstack/react-router';
// import { TRPCClientProvider } from '~/lib/trpc/client';
import { DefaultNotFound } from './components/DefaultNotFound';
import { routeTree } from './routeTree.gen';
import { QueryClient } from '@tanstack/react-query';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';

export function createRouter() {
  const queryClient = new QueryClient();
  const router = createTanStackRouter({
    routeTree,
    context: { isAuthenticated: false, queryClient },
    defaultPreload: 'intent',
    defaultErrorComponent: (err) => <p>{err.error.stack}</p>,
    defaultNotFoundComponent: DefaultNotFound,
    scrollRestoration: true,
    // Wrap: ({ children }) => <TRPCClientProvider>{children}</TRPCClientProvider>,
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
