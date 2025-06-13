import { lazy } from 'react';

export const QueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);
