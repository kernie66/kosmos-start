import { ActionIcon, Button } from '@mantine/core';
import { useRouteContext } from '@tanstack/react-router';
import { TbLogout } from 'react-icons/tb';
import { useConfirmLogout } from '~/hooks/useConfirmModal';
import { useSignOut } from '~/hooks/useSignOut';

/**
 * Description placeholder
 *
 * @export
 * @returns {*}
 */

export function LogoutButton() {
  const { isAuthenticated } = useRouteContext({ from: '__root__' });
  const { signOut } = useSignOut();
  const { logoutModal } = useConfirmLogout();

  // If the user is not authenticated, we don't render the button
  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logoutModal({ onConfirm: signOut }); // Open the confirm modal
  };

  // If the user is authenticated, we render a responsive logout button
  return (
    <>
      <ActionIcon variant="transparent" color="orange" title="Logout" hiddenFrom="sm" onClick={signOut}>
        <TbLogout strokeWidth={1.5} />
      </ActionIcon>
      <Button
        variant="light"
        color="orange"
        title="Logout"
        size="xs"
        visibleFrom="sm"
        leftSection={<TbLogout />}
        onClick={handleLogout}
      >
        Logga ut
      </Button>
    </>
  );
}
