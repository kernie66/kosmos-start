import { SignOutButton } from '@clerk/tanstack-react-start';
import { ActionIcon, Button } from '@mantine/core';
import { useRouteContext } from '@tanstack/react-router';
import { TbLogout } from 'react-icons/tb';

export function LogoutButton() {
  const { isAuthenticated } = useRouteContext({ from: '__root__' });

  // If the user is not authenticated, we don't render the button
  if (!isAuthenticated) return null;

  // If the user is authenticated, we render a responsive logout button
  return (
    <>
      <SignOutButton>
        <ActionIcon variant="transparent" color="orange" title="Logout" hiddenFrom="sm">
          <TbLogout strokeWidth={1.5} />
        </ActionIcon>
      </SignOutButton>
      <SignOutButton>
        <Button variant="light" color="orange" title="Logout" size="xs" visibleFrom="sm" leftSection={<TbLogout />}>
          Logga ut
        </Button>
      </SignOutButton>
    </>
  );
}
