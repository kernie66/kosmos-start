import { ActionIcon, Button } from '@mantine/core';
import { useNavigate, useRouteContext, useRouterState } from '@tanstack/react-router';
import { TbPlus } from 'react-icons/tb';

export function NewInvoiceButton() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { isAuthenticated } = useRouteContext({ from: '__root__' });

  if (!isAuthenticated || pathname !== '/invoices') return null;

  const handleClick = () => navigate({ to: '/invoices/$id', params: { id: 'new' } });

  return (
    <>
      <ActionIcon variant="light" title="Logout" hiddenFrom="sm" onClick={handleClick}>
        <TbPlus strokeWidth={3} />
      </ActionIcon>
      <Button
        variant="light"
        title="Add new invoice"
        size="xs"
        onClick={handleClick}
        visibleFrom="sm"
        leftSection={<TbPlus />}
      >
        New invoice
      </Button>
    </>
  );
}
