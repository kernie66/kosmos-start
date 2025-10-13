import { createBrowserInspector } from '@statelyai/inspect';
import { createActorContext } from '@xstate/react';
import { lazy } from 'react';
import { imageSelectionMachine } from '~/fsm/imageSelectionMachine';

const { inspect } = createBrowserInspector({ autoStart: true });

// Lazy load the Upload component to avoid starting Stately Inspector before the component is mounted
const Upload = lazy(() => import('~/components/upload/Upload'));

export const ImageSelectionContext = createActorContext(imageSelectionMachine, { inspect });

export default function UploadContext() {
  return (
    <ImageSelectionContext.Provider>
      <Upload />
    </ImageSelectionContext.Provider>
  );
}
