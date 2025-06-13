import { ActionIcon, Burger, Container, Group, Title } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { TbBrandGithub, TbHeartFilled } from 'react-icons/tb';
import { useSnapshot } from 'valtio';
import { Logo } from '~/components/Logo';
import { hideMobileNav, store, toggleMobileNavVisibility } from '~/store';
import { ColorSchemeActionIcon } from './ColorSchemeActionIcon';
import { DevtoolsActionIcon } from './DevtoolsActionIcon';
import classes from './Header.module.css';
import { LogoutButton } from './LogoutButton';
import { NewInvoiceButton } from './NewInvoiceButton';
import type { ContainerProps } from '@mantine/core';

export type HeaderProps = {
  containerSize: ContainerProps['size'];
};

export function Header({ containerSize }: HeaderProps) {
  const { mobileNavVisible } = useSnapshot(store);

  return (
    <header className={classes.root} onTouchStart={hideMobileNav}>
      <Container size={containerSize} h="100%">
        <Group justify="space-between" align="center" h="100%">
          <Group gap="xs">
            <Burger
              color="currentColor"
              hiddenFrom="sm"
              size="sm"
              aria-label="Toggle navigation"
              opened={mobileNavVisible}
              onTouchStart={(e) => {
                e.stopPropagation();
                toggleMobileNavVisibility();
              }}
            />
            <Link to="/">
              <Title className={classes.title}>
                <Logo className={classes.logo} />
                Mantine Start
              </Title>
            </Link>
          </Group>
          <Group gap="xs">
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
    </header>
  );
}
