import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { TRPCClientProvider } from '~/lib/trpc/client';
import { DefaultNotFound } from './components/DefaultNotFound';
import { routeTree } from './routeTree.gen';

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    context: { isAuthenticated: false },
    defaultPreload: 'intent',
    defaultErrorComponent: (err) => <p>{err.error.stack}</p>,
    defaultNotFoundComponent: DefaultNotFound,
    scrollRestoration: true,
    Wrap: ({ children }) => <TRPCClientProvider>{children}</TRPCClientProvider>,
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
