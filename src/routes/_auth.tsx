import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div>Hello authenticated user!</div>
      <Outlet />
    </>
  );
}
