import { Stack } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import WeekPicker from '~/components/common/WeekPicker';
import WeeklyInfo from '~/components/home/WeeklyInfo';

export const Route = createFileRoute('/_home/')({ component: RouteComponent });

function RouteComponent() {
  return (
    <>
      <Stack align="center">
        <WeeklyInfo />
      </Stack>
      <WeekPicker />
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
