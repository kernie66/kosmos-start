import { ActionIcon, Button } from '@mantine/core';
import { ParsedLocation, useLocation, useNavigate, useRouteContext } from '@tanstack/react-router';
import { TbPlus } from 'react-icons/tb';

export function NewUploadButton() {
  const navigate = useNavigate();

  const pathname = useLocation({ select: (location: ParsedLocation) => location.pathname });
  const { isAuthenticated } = useRouteContext({ from: '__root__' });

  if (!isAuthenticated || pathname === '/upload') return null;

  const handleClick = () => navigate({ to: '/upload' });

  return (
    <>
      <ActionIcon variant="light" title="Upload" hiddenFrom="sm" onClick={handleClick}>
        <TbPlus strokeWidth={3} />
      </ActionIcon>
      <Button
        variant="light"
        title="Lägg till info"
        size="xs"
        onClick={handleClick}
        visibleFrom="sm"
        leftSection={<TbPlus />}
      >
        Lägg till info
      </Button>
    </>
  );
}
