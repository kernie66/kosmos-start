import { createBrowserInspector } from '@statelyai/inspect';
import { assertEvent, assign, createActor, fromPromise, setup } from 'xstate';
import { setSelectedImage } from './actions/setSelectedImage';

export type Events =
  | { type: 'get image.paste'; data?: File }
  | { type: 'get image.dropzone'; data?: File }
  | { type: 'get image.clipboard'; data?: File }
  | { type: 'get image.rejected' }
  | { type: 'image.accepted'; data?: File }
  | { type: 'image.rejected'; data?: string }
  | { type: 'change image' }
  | { type: 'select.submit' }
  | { type: 'select.cancel' }
  | { type: 'restart' };

export const imageSelectionMachine = setup({
  types: {
    context: {} as { selectedImage: {} | null; error: unknown },
    events: {} as Events,
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
    setSelectedImage: fromPromise(async ({ input }: { input: { event: Events } }) => {
      console.log('Invoking setSelectedImage with event:', input.event);
      const selectedImage = await setSelectedImage({ event: input.event });
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
  /** @xstate-layout N4IgpgJg5mDOIC5QEkC2BDGBlMAbMAxgC4CWA9gHYB0O+xABGpmAMQxH0kYxUG4kAHAEZl0AJwgBtAAwBdRKAFlYJUpQUgAHogBMAZgCsVaSZM6ALADYdl8wHY7egDQgAnonMAOacc969dpb+Bnrm-pYAvhEuTNh4hGrUtAmM3KzsnGlUEGJkAgBelGAy8kggSiqJGtoI+kamZlY29o4u7gjmOgCcVAZ+AXbS+hYGXXpRMWnJxORJ8Qyx6WAcXMxUAuiwRMVyGhWqs9W6hsYNFta2Ds5uiAE90v0GFp6eltIAjBMgi9OJVAAKYjAADcSGAAO6pZgsAgAC3QFBgmWYJT2ygO6jKNUGPnMXR0OgMlgM5mkli6Tzauj6VH8wR0fkJTwsXx+8z+gJBYMhixYsHZVFgAFchKhVKiyvsqljEO8hkZzCE5e8DAY7F1PF1LFSEHodO9TiYngZpH0umNItFvlN2bMAUDQRCoTA+QKCAiCHgJYp0dLQDU5YSqIq9MrVerNdqbrU3oaPl08fj3prWTa6H8sLCyJCAHJkUgAMxI7sSLG95V9hxluq8VHeFnNXjsOkC73e5h1XR8D38+hxpJNOlTzF+doA4stnaxVjx0ARPQJtlJdpLK5j-YhLJ4jH1Rn529JOt0dZ0en1-A4hnrFWNh3F03bflO2JOZ2AqECAFYJSDlqVVjdahOBohiaS5Wmjd4Al6R49SGKDLE+L4KDICA4A0NkH3XCtKgArREAAWijdoCPMKgCQpHRDy8bpPEcS1JhHW1KBodkpzRXDsJqTodWVKhWy7c07E8Ns7jvMBRxYzlHR5NIOIxCgjgQV4jACE1OiJQJ9XeHUbEsKguneSwtzeAx60MIzxMkpIs1zfMSCLEs8P-LjN3rYNvGJd51SsC8dT8cjBnscw2w1SMkMY+8EjtABhfAEXoABVAR5L9fCEDbV4DM8MJiS7aw9G3XTRnIk0PieIIqPrAwrOYpIRTFDhFlSvCA2TfSNVy0YyX0Irozg0qzD0Q9HFCWqsOoCcmrk1dOMU6tzDCci5TGPwySaBMTzJGCL28DUbCJKIoiAA */
  context: {
    selectedImage: null,
    error: undefined,
  },
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

    'Preview Image': {
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
      },
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

    'Get Image': {
      entry: () => {
        console.log('Entering Get Image state');
      },
      invoke: {
        src: 'setSelectedImage',
        input: ({ event }) => {
          assertEvent(event, ['get image.clipboard', 'get image.dropzone', 'get image.paste']);
          return { event };
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
  },
  on: {
    restart: {
      target: '.Select Image',
      actions: () => {
        console.log('Image selection restarted');
      },
    },
  },
});

const { inspect } = createBrowserInspector();

export const imageSelectionActor = createActor(imageSelectionMachine, { inspect });
imageSelectionActor.start();
