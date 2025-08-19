import { lazy } from 'react';

const TanstackDevtools = lazy(() =>
  import('@tanstack/react-devtools').then((d) => ({
    default: d.TanStackDevtools,
  })),
);

const QueryDevtoolsPanel = lazy(() =>
  import('@tanstack/react-query-devtools').then((d) => ({
    default: d.ReactQueryDevtoolsPanel,
  })),
);

const RouterDevtoolsPanel = lazy(() =>
  import('@tanstack/react-router-devtools').then((d) => ({
    default: d.TanStackRouterDevtoolsPanel,
  })),
);

export default function Devtools() {
  return (
    <TanstackDevtools
      config={{
        defaultOpen: false,
        hideUntilHover: true,
      }}
      eventBusConfig={{
        debug: true,
      }}
      plugins={[
        {
          name: 'TanStack Query',
          render: <QueryDevtoolsPanel />,
        },
        {
          name: 'TanStack Router',
          render: <RouterDevtoolsPanel />,
        },
      ]}
    />
  );
}
