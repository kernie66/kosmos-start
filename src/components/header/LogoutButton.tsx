import { ActionIcon, Button } from '@mantine/core';
import { useRouteContext, useRouter } from '@tanstack/react-router';
import { TbLogout } from 'react-icons/tb';
import { logout } from '~/fns/logout';
import { useFn } from '~/hooks/useFn';

export function LogoutButton() {
  const { isAuthenticated } = useRouteContext({ from: '__root__' });
  const router = useRouter();

  const { execute: logoutUser, isExecuting: isLoggingOut } = useFn(logout, {
    onSuccess: () => {
      localStorage.removeItem('isAuthenticated');
      router.invalidate();
    },
  });

  if (!isAuthenticated) return null;

  const handleClick = () => logoutUser();

  return (
    <>
      <ActionIcon
        variant="transparent"
        color="orange"
        title="Logout"
        onClick={handleClick}
        loading={isLoggingOut}
        hiddenFrom="sm"
      >
        <TbLogout strokeWidth={1.5} />
      </ActionIcon>
      <Button
        variant="light"
        color="orange"
        title="Logout"
        size="xs"
        onClick={handleClick}
        loading={isLoggingOut}
        visibleFrom="sm"
        leftSection={<TbLogout />}
      >
        Logout
      </Button>
    </>
  );
}
