import { AppShell, Box, ScrollArea } from '@mantine/core';
import { useAtom, useAtomValue } from 'jotai';
import { desktopToggleState, mobileToggleState } from '~/atoms/toggleStates';
import classes from './App.module.css';
import { Footer } from './Footer';
import { Header } from './header/Header';
import { Nav } from './Nav';
import type { PropsWithChildren } from 'react';

export function App({ children }: PropsWithChildren) {
  const [mobileOpened, toggleMobileOpened] = useAtom(mobileToggleState);
  const desktopOpened = useAtomValue(desktopToggleState);

  return (
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
  );
}
