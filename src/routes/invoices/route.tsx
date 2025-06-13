import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Login } from '~/components/Login';

export const Route = createFileRoute('/invoices')({
  component: RouteComponent,
});

function RouteComponent() {
  const isAuthenticated = Route.useRouteContext({ select: (ctx) => ctx.isAuthenticated });
  return isAuthenticated ? <Outlet /> : <Login />;
}
