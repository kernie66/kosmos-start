import { svSE } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/tanstack-react-start';
import { getAuth } from '@clerk/tanstack-react-start/server';
import { AppShell, Box, ColorSchemeScript, MantineProvider, ScrollArea, mantineHtmlProps } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';
import { useAtom, useAtomValue } from 'jotai';
import { desktopToggleState, mobileToggleState } from '~/atoms/toggleStates';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/header/Header';
import { Nav } from '~/components/Nav';
import { Progress } from '~/components/Progress';
import { seo } from '~/lib/seo';
import cssHref from './__root.css?url';
import classes from './__root.module.css';
import './styles.css';
import type { PropsWithChildren } from 'react';

export const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await getAuth(getWebRequest());

  return {
    userId,
  };
});

export const Route = createRootRouteWithContext<{ isAuthenticated: boolean }>()({
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

function RootDocument({ children }: PropsWithChildren) {
  const [mobileOpened, toggleMobileOpened] = useAtom(mobileToggleState);
  const desktopOpened = useAtomValue(desktopToggleState);

  return (
    <ClerkProvider localization={svSE}>
      <html lang="sv" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <HeadContent />
        </head>
        <body className={classes.root}>
          <MantineProvider theme={{ primaryColor: 'green' }}>
            <Progress />
            <ModalsProvider>
              <AppShell
                header={{ height: 62 }}
                navbar={{
                  width: { sm: 240 },
                  breakpoint: 'sm',
                  collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
                }}
                footer={{ height: 100 }}
              >
                <AppShell.Header zIndex={102}>
                  <Header />
                </AppShell.Header>
                <AppShell.Navbar onClick={() => mobileOpened && toggleMobileOpened(false)}>
                  <Nav />
                </AppShell.Navbar>
                <AppShell.Main bg="teal.2">
                  <ScrollArea
                    className={classes.scrollArea} // Set height to the available main area
                    offsetScrollbars
                    type="auto"
                  >
                    <Box>{children}</Box>
                  </ScrollArea>
                </AppShell.Main>
                <AppShell.Footer>
                  <Footer />
                </AppShell.Footer>
              </AppShell>
            </ModalsProvider>
          </MantineProvider>
          <Scripts />
        </body>
      </html>
    </ClerkProvider>
  );
}
