import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/upload')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth/upload"!</div>;
}
