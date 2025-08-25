import { createBrowserInspector } from '@statelyai/inspect';
import { assertEvent, assign, createActor, fromPromise, setup } from 'xstate';
import { setSelectedImage } from './actions/setSelectedImage';
import type { ImageFileTypes } from './actions/setSelectedImage';
import type { FileWithPath } from '@mantine/dropzone';

export type Events =
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
    context: {} as { selectedImage: {} | null; error: unknown; fullscreen: boolean },
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
  /** @xstate-layout N4IgpgJg5mDOIC5QEkC2BDGBlMAbMAxgC4CWA9gHYDEATnEejUQNoAMAuoqAA5mwmlKXEAA9EAFgBMAGhABPRAEZxAdgB0rAKwBOZds0rJAZhXjN4gL4XZaTGBz5i5CmqwMmVNpyQhe-QRTCYggAbNoAHGpG4iaSmqyKmpKs4YqyCghGkiFqkuEGikZGIZLaIYoqVjYY2HiEAa51xAAEtjBUMETNJDVgagS4JNwARmSMEF7CfgLOQUqFkmohrNpG4SWrCZLi6YhFrBqsR6ySiqymhiGaVSBt9k0NDvWtvR1gXT12ahA0ZNwAXpQwJMfNMAnMEIoFksVmsNkYtjt5Htwgd4scVNo4kkTDc7k8nJRGo4unc3h9empuOhYERgRwpnwZkIfMEoZJFstVutSgjFNtdggYopDkdCqYjAZVHjegTHg8XnZyd1KXQAFb1SAgnhM8Gs+YcmHc+GIwWSTEaSWmLQlbK6GV2OXONQABToADcSGAAO6K9oEAAW6AoMBVdm1vl1s31CE0Rm0UW0WgiFVKKiMaWRseyloMCPWa3EIXCDtqJOdbrAnp9frAVFgDzUsAArsNUAII2Do6BguYE-Hk6lDNp05mMiEi7l8umTIZwoYjKX7uWiZXq76yQ2Sf1gwQ8J2oyye4g+4nB6mRxnBeJWDkVNOOfFNOUikunUSsAGyL6AHJkUgAGYkAQ6ABJ4DKgoegQxlC-JGnCvKmlmxginGBjGOEZiosYkhvg8zpYK27akq8B7+N2oiIOs4hqDi4h6M+4jiLogoTuo94GDo5hnFkJbWLcsr4USADC+DBs0ACq3Dgd4OrkUelEIOEeRqKYpxYoo+Q6KwSIZDekR5AUKg2jemjXPx+JCS4ADi7y1lQEBAmoJAUO6ZAANZ9JZK42XZdwIC5bkgQEXhkcy0HHrG8ZnjoQ5pleWbposKRxPkymqMslgWYJPlqLZJFKmANC-DQVK4KBAFkDQqBqN59TOvltYBa5ZDBc4oUQXJ4UQrBnKwjymz8rpEipLRxyKPo5QlJofHVI6Vl5X5ryfDAajoAQe7cHSEydZG8kRYp96RFIZSaMoIQqIkhiCppIqsFamknCoKhneaeG5WuXobpSADqLmOd6VBEGQUBQPgagAc2uC4LABB0GAFBhXqkU5hNJwZreZSpMWKiCjN6iYdoTG2s94jhNo731auHpfbWagAGJQzDcNgAjQMg2DfSQ9DsPw4ju1dgpbKrDCylJiEawjjoMhZkkORQkm5PFMx2SLjcFBkBAcDCHVhIHYLB3BAAtGEaioiOxabBm4QJRkRuaGo2hOxEkpEzNigXbNAnzblbiMEQjL7RCcb9kmsUXqOgp8qpD6whdKjFpTevEs8dyB91Mb6AmXIYxNZylNoUdZLRVp8vOEv0SEScNJ9NZp5BQcxkbpxmysCdK-dmkZkY15rEsaPrBdz5JhT2U+1TLi199Xx-RQAPp8jh0yxkctqAr5wmM+2ynNXBFfr+-4kEBbUKQbPVZCKmGb-k0QpAngqjeiRzRPkZT6LvH5EQItYLxRwSXQcDS4RUgGGWJcVik4OIzmenkBcH8XCiTAOJKSv8haIGMpEIBqhTj5DiD3LMN51CGUMHEG0hQ1ZzTLBPRaBUYCoMNkoNYBx7rizCGdG8EsbrzlFEcJ8ZNbwpHga6GmddKSMx5izBG9CerPTNjoZYWRjLRATiEVixQ1BMRWBNCI5pnxVysBYIAA */
  context: {
    selectedImage: null,
    error: undefined,
    fullscreen: false,
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
      initial: 'Window',
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

      states: {
        Window: {
          on: {
            'toggle.fullscreen': {
              target: 'Fullscreen',
              actions: assign({
                fullscreen: ({ context }) => !context.fullscreen,
              }),
            },
          },
        },

        Fullscreen: {
          on: {
            'toggle.fullscreen': {
              target: 'Window',
              actions: assign({
                fullscreen: ({ context }) => !context.fullscreen,
              }),
            },
          },
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
