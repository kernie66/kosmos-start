import { svSE } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/tanstack-react-start';
import { AppShell, Box, ColorSchemeScript, MantineProvider, ScrollArea, mantineHtmlProps } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { HeadContent, Scripts } from '@tanstack/react-router';
import { useAtom, useAtomValue } from 'jotai';
import { desktopToggleState, mobileToggleState } from '~/atoms/toggleStates';
import { Footer } from './Footer';
import { Header } from './header/Header';
import { Nav } from './Nav';
import { Progress } from './Progress';
import classes from './RootDocument.module.css';
import type { PropsWithChildren } from 'react';
import './styles.css'; // Remove browser scroll bar, replace with ScrollArea

export function RootDocument({ children }: PropsWithChildren) {
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
