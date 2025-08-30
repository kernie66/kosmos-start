import { assertEvent, assign, fromPromise, setup } from 'xstate';
import { setSelectedImage } from './actions/setSelectedImage';
import { initialSelectImageContext } from './contexts/imageSelectionContext';
import type { ImageFileTypes } from './actions/setSelectedImage';
import type { ImageSelectionContext } from './contexts/imageSelectionContext';
import type { FileWithPath } from '@mantine/dropzone';

export type SelectImageEvents =
  | { type: 'get image.paste'; data?: File }
  | { type: 'get image.dropzone'; data?: FileWithPath }
  | { type: 'get image.clipboard'; data?: null }
  | { type: 'get image.rejected'; cause: string }
  | { type: 'image.accepted'; data?: File }
  | { type: 'image.rejected'; data?: string }
  | { type: 'change image' }
  | { type: 'select.submit' }
  | { type: 'select.cancel' }
  | { type: 'toggle.fullscreen' }
  | { type: 'restart' };

export const imageSelectionMachine = setup({
  types: {
    context: {} as ImageSelectionContext,
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
  /** @xstate-layout N4IgpgJg5mDOIC5QEkC2BDGBlMAbMAxgC4CWA9gHYDEATnEejUQNoAMAuoqAA5mwmlKXEAA9EAVgBMAOgDMrVgHZF48QA5FagCxqAbLK0AaEAE9EWrbOmtJBtbPUbZagIziAvu+NpMYHPmJyahgiAAISDBhpbnRYIjA2TiQQXn5BCmExBC1FaX1JNVZZWQBOXTU1EskLYzMEF0lxXWkS1l0XXUUc2UUHSU9vSL88QnTpLAYmKkThVIEgzIkyvMUytXVxG0k22sRZaukVBWdFSRcS8VWtAZAfbBHAynGHsLuwKhDwoekCXBJuABGZEYEBmyTm6UWCEqWkOulULjU1VkDT0u2yDRaKk2JQaujOOhub38oyCzwCryGHzAYQivmkEBoZG4AC9KAkOLM+PMhMksjC4QikZZUbp0Vp9NIcgj2pcqpJqkShiTHhRyaNQm9qbTvjE4hykjxuZC+YgBYp4eJEcjReirVYStjbIiypJHUrfCqxl7NVTPnSonQAFajSBgo1pBam6ElWEWoU2gpi0yIBolawKGyKNxW3S43Qe+4UskAcRpvt8VAg7OkJAoADcyABrMDSYkvUvlt4IOuNgjodKJcMpY1R0D82OCq3ClFJ9EuNrNaolFcryTZ+yF4bFp5lymVsA0Jk0aK4AcAMzINFQbeVHd3XaGPYbZH7g44w4hY9EZuWC5cOhJtsSIuHauiwtKEriGULg9DkW5ep2+4wFQAatugBAEGA3DxKCnLgqOvLjogJQOHI2y2CovTqMo86rNImzHFoiLlPG-ReLcd47mqAAKdD1iQYAAO4VihBAABboBQMBfL4n6ERk0aSPiKxlK0lwdKRoEpggihtBmCjrBaFzwuxgyevevH8YJIlarALzSLAACuAKoAI8mRkRP4IMpMidGprAaXmKLokiS5aKuBQXNKsgIZZ0h8WAAnCaJ7z2RSPxSVhuAeTyinET5Kn+XmgXZsF2l1OozRHEUSJlKsrAlHF3EJdZKVakQZBQFA+DSOeTm4LgsAEHQYAULlJoFcxLSrrNc1ojprQyNmWjKc4si6PobjNaSTyJcltl+uWaHRLE8QTd+WS+apJVBVp6KxuIDGZg0ORbWUO2quM4lkCJAByZCkOeJBvkE0z4RGeVQgu2zWLYDhFNRxSyKFLhSrN4F5uoBQuJ93ouW5yHvBdXlZNBzTFes6xbDsOlIrkNXKFo6g5B9HHti1ADC+BSaEACq3Dg4aI6efl3nkzdVObAqtOVRU0iNAoykSiU6zbTcFBkBAcDCBzu1i1+pOIAAtM0mbmxbrAAeixtPXN9srqseNkhMjBEFyotQpYDPKfaOjwgY4jovIrAK4xPR6eu8ixezXH6+qxCpR7UPRnpaPxizK4s7LEgaGHxx1f5jXOw+RPJ5N3kuABT0LqRmhFK0mh2k00gNPIuhKG0bQx+ZRbx-tNlJwRnvRlIcgKMoqgaNoeiSPOCiwh0vS9I0Ud5iXapYD9-2AyQwOg15hti1kVfM63jU9IUpRKGoD0yOoxRSJU9gKg0G-jATAhD5DFdZBYy2+1gv7cQgdQrKUOIxDSqhvaKHftzMAvMBbl0uuYS4CsqikXkJcLQVtLh2jzorWqboi5NU8O4IAA */
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
          actions: assign({
            error: ({ event }) => event.cause || 'Okänd orsak',
            dropzoneSubText: ({ event }) => event.cause,
          }),
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
              console.log('Image successfully selected and loaded', event.output, event);
            },
            assign(({ event }) => ({
              selectedFile: event.output,
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
          actions: assign({
            dropzoneSubText: 'Välj en ny bildfil för att byta ut den nuvarande',
          }),
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
    'get image.paste': '.Get Image',
  },
});
