import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: AuthenticatedComponent,
});

function AuthenticatedComponent() {
  return (
    <>
      <div>Hello authenticated user!</div>
      <Outlet />
    </>
  );
}
