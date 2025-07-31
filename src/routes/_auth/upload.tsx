import { createFileRoute } from '@tanstack/react-router';
import { Upload } from '~/components/upload/Upload';

export const Route = createFileRoute('/_auth/upload')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Upload />;
}
