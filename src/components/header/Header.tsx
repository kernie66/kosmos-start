import { SignedIn, UserButton } from '@clerk/tanstack-react-start';
import { ActionIcon, Burger, Container, Group } from '@mantine/core';
import { useAtom } from 'jotai';
import { TbBrandGithub, TbHeartFilled } from 'react-icons/tb';
import { desktopToggleState, mobileToggleState } from '~/atoms/toggleStates';
import { ColorSchemeActionIcon } from './ColorSchemeActionIcon';
import { DevtoolsActionIcon } from './DevtoolsActionIcon';
import DibberButton from './DibberButton';
import classes from './Header.module.css';
import { LogoutButton } from './LogoutButton';
import { NewInvoiceButton } from './NewInvoiceButton';

export function Header() {
  const [mobileOpened, toggleMobile] = useAtom(mobileToggleState);
  const [desktopOpened, toggleDesktop] = useAtom(desktopToggleState);

  return (
    <Container className={classes.root} fluid h="100%">
      <Group justify="space-between" align="center" h="100%">
        <Group gap="xs">
          <Burger
            opened={mobileOpened}
            onClick={() => toggleMobile()}
            hiddenFrom="sm"
            size="sm"
            aria-label="Toggle navigation"
          />
          <Burger
            opened={desktopOpened}
            onClick={() => toggleDesktop()}
            visibleFrom="sm"
            size="sm"
            aria-label="Toggle navigation"
          />
          <DibberButton />
        </Group>
        <Group gap="xs">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <NewInvoiceButton />
          <LogoutButton />
          {import.meta.env.DEV && <DevtoolsActionIcon />}
          <ActionIcon
            component="a"
            href="https://github.com/sponsors/icflorescu"
            target="_blank"
            rel="noopener noreferrer"
            variant="transparent"
            color="red"
            title="Sponsor this project"
          >
            <TbHeartFilled strokeWidth={1.5} />
          </ActionIcon>
          <ActionIcon
            component="a"
            href="https://github.com/icflorescu/mantine-start"
            target="_blank"
            rel="noopener noreferrer"
            variant="transparent"
            color="currentColor"
            title="View source on GitHub"
          >
            <TbBrandGithub strokeWidth={1.5} />
          </ActionIcon>
          <ColorSchemeActionIcon />
        </Group>
      </Group>
    </Container>
  );
}
