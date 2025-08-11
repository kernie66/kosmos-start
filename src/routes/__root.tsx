import { getAuth } from '@clerk/tanstack-react-start/server';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';
import { RootDocument } from '~/components/RootDocument';
import { seo } from '~/lib/seo';
import cssHref from './__root.css?url';
import { QueryClient } from '@tanstack/react-query';

interface MyRootContext {
  isAuthenticated: boolean;
  queryClient: QueryClient;
}

export const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  return {
    userId,
  };
});

export const Route = createRootRouteWithContext<MyRootContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-title', content: 'Kosmos' },
      ...seo({
        title: 'Öppna förskolan Kosmos - information.',
        description: `Publik information från Kosmos, utan sociala medier.`,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: cssHref },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      // { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
    ],
  }),
  beforeLoad: async () => {
    const { userId } = await fetchClerkAuth();
    return { isAuthenticated: Boolean(userId) };
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}
