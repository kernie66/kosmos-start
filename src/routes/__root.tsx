import { ColorSchemeScript, Container, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/header/Header';
import { Nav } from '~/components/Nav';
import { Progress } from '~/components/Progress';
import { isAuthenticated } from '~/fns/isAuthenticated';
import { seo } from '~/lib/seo';
import cssHref from './__root.css?url';
import classes from './__root.module.css';
import type { ContainerProps } from '@mantine/core';
import type { PropsWithChildren } from 'react';

export const Route = createRootRouteWithContext<{ isAuthenticated: boolean }>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-title', content: 'Mantine Start' },
      ...seo({
        title: 'Mantine Start - Full-stack, type-safe, done right—with style.',
        description: `Kickstart your next full-stack app with Mantine, TanStack, tRPC and Drizzle.`,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: cssHref },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
    ],
  }),
  beforeLoad: async () => ({ isAuthenticated: await isAuthenticated() }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

const CONTAINER_SIZE: ContainerProps['size'] = 'xl';

function RootDocument({ children }: PropsWithChildren) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <HeadContent />
      </head>
      <body className={classes.root}>
        <MantineProvider theme={{ primaryColor: 'green' }}>
          <Progress />
          <ModalsProvider>
            <Header containerSize={CONTAINER_SIZE} />
            <Container size={CONTAINER_SIZE}>
              <Nav />
              <div className={classes.content}>
                <main className={classes.main}>{children}</main>
                <Footer />
              </div>
            </Container>
          </ModalsProvider>
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}
