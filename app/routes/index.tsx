import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { createFileRoute } from '@tanstack/react-router';
import classes from './index.module.css';

export const Route = createFileRoute('/')({
  component: HomePage,
  // loader: async () => await new Promise<string>((resolve) => setTimeout(() => resolve('Hello World!'), 1000)),
});

function HomePage() {
  // const state = Route.useLoaderData();

  const openModal = () =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a modal. Please click one of these
          buttons to proceed.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => notifications.show({ message: 'Action cancelled', color: 'red' }),
      onConfirm: () => notifications.show({ message: 'Action confirmed' }),
    });

  return (
    <div>
      <h1>Home</h1>
      {/* <p>State: {state}</p> */}
      <Button className={classes.button} onClick={openModal}>
        Show notification
      </Button>
    </div>
  );
}
