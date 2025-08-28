import { createBrowserInspector } from '@statelyai/inspect';
import { assertEvent, assign, createActor, fromPromise, setup } from 'xstate';
import { setSelectedImage } from './actions/setSelectedImage';
import { initialSelectImageContext } from './contexts/imageSelectionContext';
import type { ImageFileTypes } from './actions/setSelectedImage';
import type { SelectImageContext } from './contexts/imageSelectionContext';
import type { FileWithPath } from '@mantine/dropzone';

export type SelectImageEvents =
  | { type: 'get image.paste'; data?: null }
  | { type: 'get image.dropzone'; data?: FileWithPath }
  | { type: 'get image.clipboard'; data?: ClipboardEvent }
  | { type: 'get image.rejected' }
  | { type: 'image.accepted'; data?: File }
  | { type: 'image.rejected'; data?: string }
  | { type: 'change image' }
  | { type: 'select.submit' }
  | { type: 'select.cancel' }
  | { type: 'toggle.fullscreen' }
  | { type: 'restart' };

export const imageSelectionMachine = setup({
  types: {
    context: {} as SelectImageContext,
    events: {} as SelectImageEvents,
  },
  actions: {
    /*
    showNotification,
    pasteClipboard,
    acceptFile,
    readClipboard,
    */
  },
  actors: {
    setSelectedImage: fromPromise(async ({ input }: { input: { selection: ImageFileTypes } }) => {
      console.log('Invoking setSelectedImage with event:', input.selection);
      const selectedImage = await setSelectedImage({ selection: input.selection });
      return selectedImage;
    }),
  },
  guards: {
    isImage({ context, event }) {
      // Add your guard condition here
      return true;
    },
    accept({ context, event }) {
      // Add your guard condition here
      return true;
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEkC2BDGBlMAbMAxgC4CWA9gHYDEATnEejUQNoAMAuoqAA5mwmlKXEAA9EAVgBMAOgDMrVgHYAnABYlyjasmqANCACeiAIyrF01uOWnFs2QDZJrYw4C+r-Wkxgc+YuQppLAYmKjZOJBBefkEKYTEEcXFjaWTxe3txAA5ZY2NFPP0jBFlJe2lJLPScxUVJSVyk908MbDxCWKD24gACLxgqGCIeklawaQJcEm4AIzJGCHDhaIEA+MQc5Wl7Z3tjZTK92WVlIsRSrZOTqp3WLOdlcWaQfp9uzt8OvrHBsGHR7zSCA0MjcABelDAS0iK1i6wQm22u32hxcJzOJXu0lUV1sqhu2nsimer0+-koXT8w1ev3+Y2k3HQsCIUI4yz4qyEkQSiJ2xj2BwyaNOhkQqnk0iuyiOilY+NkqieHheYzJH3e328tJG9LoACsOpBoTwOXDuRtjkj+SihccRcVJCoLLJxLKkqV7FlVPYSar3gFpABxP6agYQSHSEgUABuZAA1uNSf6KcHqWMEFHYwR0LFwsaoqa1uaEZa+QLUXaMbYZHdJOJFQrHQqfcqk1SA6nQ2AqGAaCCaAzcDmAGZkGioaRtjodkOvDMxsjZ3McfOwougHnqSWyRT1rKZRQ5fkY-EpHEnHF18SlVT5X3eNUztNagEwaToAgEMDcFmLNkwwsuQ3DYsWMdJJEFMDWHkWQMWMLIUmg9ITnyLJ7ldYx7zadsKQABToaMSDAAB3LsqAIAALdAKBgHVvFXQC4mLBoZCJZRZXqWQahUDEpHKJD7HYpwsl3FwsLeHDAnwsBCJIsjYHeaRYAAVxmVABAYmJ11ERAWO2FQOIabj7UQexvQqKoCngk5KlycTHzwgiiNImkFKpCZqK-XBNM5JjgIQPS2MMridx40UEHUcpD2qOt4MkfZ7Fkezkykpy5JpIgyCgKB8GkYdlNwXBYAIOgwAoHyzX87QMR3cRUiyOtZQa2UzK9ZLJKCCiyFIgA5MhSGHEglwCMJ-xNLSgJ0hBpVUaQqjUPZ8lrUoMQaFJr1dJQEPyV1bHa6cKSwVT1OfAYKu0hIknWsCMmyXJ8kKcKzPMaKiWyKwlDs1s-Q6gBhfBqJ6ABVbhRoicbfPhK7UhuzIjwe4wTzuCzqgM7RSjrfbyVSmTnLIoY6LfRlmVZcGCwmvypvi8odyyTQEKsCCvSyVbBMlK4bgUe59iVZUKDICA4GEKdsfZCn4QAWnsDEJbqqV5flpLvofFKghCIgxch4tjhkcCNtYNQqlYSQaucaRotlBVHkqO9lewg7AjVLtNcqqaMnKMsGnYwSnER8K7F1l1BOcCDMLtiSHaDWcxhdi6TDyS4GwcG9jDKEyEHg8opTp9JtHqcUsc6aTZJcmOAPF4spDkBQVHUFQtB0E9amdapckVeokhbFoVY6rAut6-qSEG4bJrXSaEjyfZJSTxKdFTwSMQQ7EpRxe5fcsQuAyOtSBGd8utf845zD1l0DfxcRjYxMyopuWV1HkHYlW7+3sekf6wEBkHY-HsVU+kVOc7M3kPycQSNzCVBiskBqCUlbuCAA */
  context: initialSelectImageContext,
  id: 'ImageSelection',
  initial: 'Start',
  states: {
    Start: {
      entry: () => {
        console.log('Image selection process entered Start state');
      },
      always: 'Select Image',
    },

    'Select Image': {
      on: {
        'get image.clipboard': {
          target: 'Get Image',
        },

        'get image.dropzone': {
          target: 'Get Image',
        },

        'get image.paste': {
          target: 'Get Image',
        },

        'get image.rejected': {
          target: 'Show Notification',
          reenter: true,
        },
      },
    },

    'Get Image': {
      entry: () => {
        console.log('Entering Get Image state');
      },
      invoke: {
        src: 'setSelectedImage',
        input: ({ event }) => {
          assertEvent(event, ['get image.clipboard', 'get image.dropzone', 'get image.paste']);
          return { selection: event.data || null };
        },
        onDone: {
          target: 'Preview Image',
          actions: [
            ({ event }) => {
              console.log('Image successfully selected and loaded', event.output);
            },
            assign(({ event }) => ({
              selectedImage: event.output,
            })),
          ],
        },
        onError: {
          target: 'Select Image',
          actions: [
            ({ event }) => {
              console.error('Error selecting image:', event.error);
            },
            assign({
              error: ({ event }) => event.error,
            }),
          ],
        },
      },

      on: {
        'image.accepted': 'Preview Image',
      },
    },

    'Preview Image': {
      entry: assign({
        imageSelected: true,
      }),
      on: {
        'change image': {
          target: 'Select Image',
        },

        'select.submit': {
          target: 'Submit Image',
        },

        'select.cancel': {
          target: 'Clean Up',
        },

        'toggle.fullscreen': {
          target: 'Preview Image',
          actions: assign({
            fullscreen: ({ context }) => !context.fullscreen,
          }),
        },

        'get image.paste': 'Get Image',
      },
      // Ensure that fullscreen is restored when exiting
      exit: [assign({ fullscreen: false }), assign({ imageSelected: false })],
    },

    'Show Notification': {
      always: {
        target: 'Select Image',
        reenter: true,
      },
      entry: {
        type: 'showNotification',
      },
    },

    'Submit Image': {
      always: {
        target: 'Select Image',
        reenter: true,
      },
    },

    'Clean Up': {
      always: {
        target: 'Select Image',
        reenter: true,
      },
    },
  },
  on: {
    restart: {
      target: '.Select Image',
      actions: () => {
        console.log('Image selection restarted');
      },
    },
    'get image.paste': '.Get Image',
  },
});

const { inspect } = createBrowserInspector();

export const imageSelectionActor = createActor(imageSelectionMachine, { inspect });
imageSelectionActor.start();
