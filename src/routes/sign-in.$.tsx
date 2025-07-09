import { SignIn } from '@clerk/tanstack-react-start';
import { Flex } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { desktopToggleState } from '~/atoms/toggleStates';

export const Route = createFileRoute('/sign-in/$')({
  component: SignInPage,
});

function SignInPage() {
  const hideDesktopNav = useSetAtom(desktopToggleState);

  hideDesktopNav(false);

  return (
    <Flex justify="center" pt="md">
      <SignIn />
    </Flex>
  );
}
