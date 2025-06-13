import { lazy } from 'react';

export const RouterDevtools = lazy(() =>
  import('@tanstack/react-router-devtools').then((d) => ({
    default: d.TanStackRouterDevtools,
  }))
);
