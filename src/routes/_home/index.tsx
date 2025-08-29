import { Stack } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import WeeklyInfo from '~/components/home/WeeklyInfo';

export const Route = createFileRoute('/_home/')({ component: RouteComponent });

function RouteComponent() {
  return (
    <>
      <Stack align="center">
        <WeeklyInfo />
      </Stack>
      <button
        type="button"
        onClick={() => {
          throw new Error('Sentry Test Error');
        }}
      >
        Break the world
      </button>
    </>
  );
}
