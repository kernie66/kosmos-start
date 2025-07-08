import { NavLink, RemoveScroll, ScrollArea } from '@mantine/core';
import { useThrottledCallback } from '@mantine/hooks';
import clsx from 'clsx';
import { useEffect } from 'react';
import { TbBrandGithub, TbClipboardText, TbHeart, TbHome2 } from 'react-icons/tb';
import { useSnapshot } from 'valtio';
import { hideMobileNav, store } from '~/store';
import classes from './Nav.module.css';
import { RouterNavLink } from './RouterNavLink';

export function Nav() {
  const { mobileNavVisible } = useSnapshot(store);

  const throttledHideMobileNav = useThrottledCallback(() => {
    if (mobileNavVisible) hideMobileNav();
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', throttledHideMobileNav);
    return () => {
      window.removeEventListener('resize', throttledHideMobileNav);
    };
  }, [throttledHideMobileNav]);

  return (
    <RemoveScroll enabled={mobileNavVisible}>
      <nav className={clsx({ [classes.visible]: mobileNavVisible })} onTouchStart={hideMobileNav}>
        <ScrollArea className={classes.scrollArea} onTouchStart={(e) => e.stopPropagation()} onTouchEnd={hideMobileNav}>
          <RouterNavLink
            className={classes.navLink}
            to="/"
            label="Home"
            leftSection={<TbHome2 size={16} strokeWidth={1.5} />}
          />
          <RouterNavLink
            className={classes.navLink}
            to="/invoices"
            label="Invoices example"
            leftSection={<TbClipboardText size={16} strokeWidth={1.5} />}
            preload={false}
          />
          <NavLink
            target="_blank"
            href="https://github.com/sponsors/icflorescu"
            rel="noopener noreferrer"
            className={classes.navLink}
            label="Sponsor the project"
            leftSection={<TbHeart size={16} strokeWidth={1.5} />}
          />
          <NavLink
            href="https://github.com/icflorescu/mantine-start"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.navLink}
            label="Source code"
            leftSection={<TbBrandGithub size={16} strokeWidth={1.5} />}
          />
        </ScrollArea>
      </nav>
    </RemoveScroll>
  );
}
