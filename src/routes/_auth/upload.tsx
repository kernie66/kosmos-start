import { createBrowserInspector } from '@statelyai/inspect';
import { createFileRoute } from '@tanstack/react-router';
import { createActorContext } from '@xstate/react';
import { Upload } from '~/components/upload/Upload';
import { imageSelectionMachine } from '~/fsm/selectImageMachine';

export const Route = createFileRoute('/_auth/upload')({
  component: RouteComponent,
});

const { inspect } = createBrowserInspector({ autoStart: true });

export const ImageSelectionContext = createActorContext(imageSelectionMachine, { inspect });

function RouteComponent() {
  return (
    <ImageSelectionContext.Provider>
      <Upload />;
    </ImageSelectionContext.Provider>
  );
}
