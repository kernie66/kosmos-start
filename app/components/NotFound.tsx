import { Anchor, Button, Center, Group, Stack, Text, Title } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

export function NotFound({ children }: PropsWithChildren) {
  return (
    <Stack h="100dvh" align="center" justify="center">
      <Title c="dimmed" fz={100}>
        404
      </Title>
      <Center>{children || <Text>The page you are looking for does not exist.</Text>}</Center>
      <Group>
        <Button onClick={() => window.history.back()}>Go back</Button>
        <Anchor size="sm" component={Link} to="/">
          Start Over
        </Anchor>
      </Group>
    </Stack>
  );
}
