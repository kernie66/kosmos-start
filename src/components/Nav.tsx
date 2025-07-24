import { SignedIn, SignedOut } from '@clerk/tanstack-react-start';
import { NavLink, RemoveScroll, ScrollArea } from '@mantine/core';
import { useThrottledCallback, useWindowEvent } from '@mantine/hooks';
import { useLocation } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { TbBrandGithub, TbFileUpload, TbHeart, TbHome2, TbLogin, TbLogout } from 'react-icons/tb';
import { desktopToggleState, mobileToggleState } from '~/atoms/toggleStates';
import { useConfirmLogout } from '~/hooks/useConfirmModal';
import { useSignOut } from '~/hooks/useSignOut';
import classes from './Nav.module.css';
import { RouterNavLink } from './RouterNavLink';
import type { ParsedLocation } from '@tanstack/react-router';

export function Nav() {
  const [mobileNavVisible, toggleMobileNav] = useAtom(mobileToggleState);
  const [desktopNavVisible, toggleDesktopNav] = useAtom(desktopToggleState);
  const { signOut } = useSignOut();
  const { logoutModal } = useConfirmLogout();

  let onSignInPage = false;

  const pathName = useLocation({
    select: (location: ParsedLocation) => location.pathname,
  });

  console.log('pathName', pathName);
  if (pathName.startsWith('/sign-in')) {
    onSignInPage = true;
  } else {
    onSignInPage = false;
  }

  const hideMobileNav = () => {
    toggleMobileNav(false);
  };

  const throttledHideMobileNav = useThrottledCallback(() => {
    if (mobileNavVisible) hideMobileNav();
    if (!desktopNavVisible) toggleDesktopNav(true);
  }, 500);

  useWindowEvent('resize', throttledHideMobileNav);

  const handleLogout = () => {
    logoutModal({ onConfirm: signOut }); // Open the confirm modal
  };

  return (
    <RemoveScroll enabled={mobileNavVisible}>
      <ScrollArea px="sm" py="md">
        <SignedIn>
          <RouterNavLink bdrs="md" to="/" label="Hem" leftSection={<TbHome2 size={16} strokeWidth={1.5} />} />
          <RouterNavLink
            bdrs="md"
            to="/upload"
            label="Uppdatera veckoinfo"
            leftSection={<TbFileUpload size={16} strokeWidth={1.5} />}
            preload={false}
          />
          <NavLink
            bdrs="md"
            component="button"
            leftSection={<TbLogout size={16} strokeWidth={1.5} />}
            onClick={handleLogout}
            label="Logga ut"
          />
        </SignedIn>
        <SignedOut>
          {onSignInPage ? (
            <RouterNavLink bdrs="md" to="/home" label="Hem" leftSection={<TbHome2 size={16} strokeWidth={1.5} />} />
          ) : (
            <RouterNavLink bdrs="md" to="/" label="Hem" leftSection={<TbHome2 size={16} strokeWidth={1.5} />} />
          )}
          <RouterNavLink
            bdrs="md"
            to="/sign-in/$"
            label="Logga in"
            leftSection={<TbLogin size={16} strokeWidth={1.5} />}
          />
        </SignedOut>
        <NavLink
          bdrs="md"
          target="_blank"
          href="https://github.com/sponsors/icflorescu"
          rel="noopener noreferrer"
          className={classes.navLink}
          label="Sponsor the project"
          leftSection={<TbHeart size={16} strokeWidth={1.5} />}
        />
        <NavLink
          bdrs="md"
          href="https://github.com/icflorescu/mantine-start"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.navLink}
          label="Source code"
          leftSection={<TbBrandGithub size={16} strokeWidth={1.5} />}
        />
      </ScrollArea>
    </RemoveScroll>
  );
}
