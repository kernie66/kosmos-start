import { Navigate, createFileRoute } from '@tanstack/react-router';

// Set a /home route that redirects to the root route
// This is needed to get home from the login page without
// having to log in first, as Clerk does not allow
// redirects to the root route '/' directly.
export const Route = createFileRoute('/home')({
  component: Home,
});

function Home() {
  return <Navigate to="/" />;
}
