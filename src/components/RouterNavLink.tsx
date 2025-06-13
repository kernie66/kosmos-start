import { NavLink } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import type { NavLinkProps } from '@mantine/core';
import type { LinkProps } from '@tanstack/react-router';

export type RouterNavLinkProps = Omit<NavLinkProps, 'component'> & LinkProps;

export function RouterNavLink(props: RouterNavLinkProps) {
  return <NavLink component={Link} {...(props as any)} />;
}
