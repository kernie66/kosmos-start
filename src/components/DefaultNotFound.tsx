import { Button, Stack, Text } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { TbHome2 } from 'react-icons/tb';
import { desktopToggleState } from '~/atoms/toggleStates';

export function DefaultNotFound() {
  const toggleDesktopNav = useSetAtom(desktopToggleState);

  toggleDesktopNav(true); // Show desktop nav when not found

  return (
    <Stack align="center">
      <Text mt="xl">Sidan hittades inte</Text>
      <Button component={Link} to="/" leftSection={<TbHome2 size={16} strokeWidth={1.5} />}>
        Gå till startsidan
      </Button>
    </Stack>
  );
}
