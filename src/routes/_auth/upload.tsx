import { ErrorBoundary } from '@sentry/tanstackstart-react';
import { Navigate, createFileRoute } from '@tanstack/react-router';
import UploadContext from '~/components/upload/UploadContext';

export const Route = createFileRoute('/_auth/upload')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ErrorBoundary fallback={<Navigate to="/" />}>
      <UploadContext />
    </ErrorBoundary>
  );
}
