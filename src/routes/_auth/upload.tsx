import { createFileRoute } from '@tanstack/react-router';
import FileModal from '../../components/upload/FileModal';

export const Route = createFileRoute('/_auth/upload')({
  component: RouteComponent,
});

function RouteComponent() {
  return <FileModal />;
}
