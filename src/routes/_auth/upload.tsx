import { ErrorBoundary } from '@sentry/tanstackstart-react';
import { createBrowserInspector } from '@statelyai/inspect';
import { Navigate, createFileRoute } from '@tanstack/react-router';
import { createActorContext } from '@xstate/react';
import { Upload } from '~/components/upload/Upload';
import { imageSelectionMachine } from '~/fsm/imageSelectionMachine';

export const Route = createFileRoute('/_auth/upload')({
  component: RouteComponent,
});

const { inspect } = createBrowserInspector({ autoStart: true });

export const ImageSelectionContext = createActorContext(imageSelectionMachine, { inspect });

function RouteComponent() {
  return (
    <ErrorBoundary fallback={<Navigate to="/" />}>
      <ImageSelectionContext.Provider>
        <Upload />;
      </ImageSelectionContext.Provider>
    </ErrorBoundary>
  );
}
