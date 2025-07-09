import { SignOutButton, SignedIn, SignedOut } from '@clerk/tanstack-react-start';
import { NavLink, RemoveScroll, ScrollArea } from '@mantine/core';
import { useThrottledCallback } from '@mantine/hooks';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { TbBrandGithub, TbFileUpload, TbHeart, TbHome2, TbLogin, TbLogout } from 'react-icons/tb';
import { desktopToggleState, mobileToggleState } from '~/atoms/toggleStates';
import classes from './Nav.module.css';
import { RouterNavLink } from './RouterNavLink';

export function Nav() {
  const [mobileNavVisible, toggleMobileNav] = useAtom(mobileToggleState);
  const [desktopNavVisible, toggleDesktopNav] = useAtom(desktopToggleState);

  const hideMobileNav = () => {
    toggleMobileNav(false);
  };

  const throttledHideMobileNav = useThrottledCallback(() => {
    if (mobileNavVisible) hideMobileNav();
    if (!desktopNavVisible) toggleDesktopNav(true);
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', throttledHideMobileNav);
    return () => {
      window.removeEventListener('resize', throttledHideMobileNav);
    };
  }, [throttledHideMobileNav]);

  return (
    <RemoveScroll enabled={mobileNavVisible}>
      <ScrollArea px="sm" py="md">
        <RouterNavLink bdrs="md" to="/home" label="Hem" leftSection={<TbHome2 size={16} strokeWidth={1.5} />} />
        <SignedIn>
          <RouterNavLink
            bdrs="md"
            to="/invoices"
            label="Uppdatera veckoinfo"
            leftSection={<TbFileUpload size={16} strokeWidth={1.5} />}
            preload={false}
          />
          <SignOutButton>
            <RouterNavLink bdrs="md" to="/" label="Logga ut" leftSection={<TbLogout size={16} strokeWidth={1.5} />} />
          </SignOutButton>
        </SignedIn>
        <SignedOut>
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
