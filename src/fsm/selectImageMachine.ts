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
  /** @xstate-layout N4IgpgJg5mDOIC5QEkC2BDGBlMAbMAxgC4CWA9gHYDEATnEejUQNoAMAuoqAA5mwmlKXEAA9EAVgBMAOgDMrVgA5WkgJwB2ACwBGSVoBsmgDQgAnom2b101uNXbVs9bM2qV6xQF9PJtJjA4+MTkFNJYDExUbJxIILz8ghTCYgji4trS6eL6jnbasvqK+ibmCLKS+tKSiuJa8oqakpKyXj4gfth4hIlhXcQABB1gVDBE-SQYMNIEuCTcAEZkjBDRwvECIcmIirKq0vqs2upHu4rqqvYliLLyNgqsmqwX+jd23r6TAX09gd2DnyMwGMJv5pBAaGRuAAvShgVaxdaJLYIHZ7A5HE6qM4XbRXMrKTL3cSsdT6Y5NTTvdqfX7BSi9IJjIaA4GfaTcdCwIhwjhrPgbISxFKo-aHY7OLHnS5mRCaWQZe6sA7iJxuRSqKlDWk-b7-fws8ZsugAK26kHhPH5SKF212ooxEux0tKej2rFktRu2n0kk0fu9mpp3xC0gA4kC9TAqBBYdISBQAG5kADWYGkWuD9PDTM+CHjSYI6ES0QtcStmxtKLt6PFpyluJlCGcMiUkmyiiaWnSkkD-m1IezkeGYBoEJo7NwRYAZmQaKh00HGQOI0M84myIXixxS4iK6BhY9pI51LUrKodOlZHjNIoMsSFOp3UocuJKW0M0usyuASCpugCAQYDcNyKy8gi5aCvu2wEto2SqooOwnOIeLaLeNgeieWQPn6+i9p0n6hAACnQCYkGAADuQ5UAQAAW6AUDAhr+DuEFJJWzQyGSGiNFYcokg2pRSJU7q1F2bhYmkeFfAR0jEWApEUVRsDfNIsAAK7zKgAgsQke6iIgHH7OcWi+nU-F4oYlTVOIt6wa2aTqFJ-b0nJCmUcyymMtM9GAbgOkCmxUEIIZXEmbx8jHNeSrSB4tQVI8hiPEqTmZkRJFke5AJEGQUBQPg0hTmpuC4LABB0GAFD+daQWNHiTjiJkHYqjc8qxQ8KUyVgNFkJRAByZCkFOJCbiEURgZaumQfpCCqIY0g1KoaRemkuR4s0d4YYYqiSM+2gdd0IZYBpWk5vqVV6SkaR3rBOQevYBRFBZVgxTUzj6Ec6hNGS+10qEADC+D0f0ACq3BjTEE0BciV2ZDduT3YUxSNo8ihVK9sH5PYhgNN4bQUGQEBwMIH4HVNu5TSkAC0SOlNTP0-BERB8pNgXTbsMjZG2lkRRJV6NvIGSxaSCgepoZKOe+i6k6E2pDszUOVvoSv2jk+ic0qsF1eUmQYStUovOI9PLqdMDy9V03aJbeznq+1SwWcHjqChZx3AocpOLoCHJZLfapbJ6WKUMZsXRIMjyEoKjcboBjGMj6jWCJn0XLNSsIUb9JdT1-T9YNw1Fnp5OsyklsOEemi27eNnx2ceJofeDyuIUcrqntPv4dLYTHQIcvgSzyK7NYnPZGLPM1HzpSWS9p5aH6xIOOn-2AxQIPcMHFOyro0ie1jNx6DtAmyiSaO1DZzetbjnhAA */
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
  },
});

const { inspect } = createBrowserInspector();

export const imageSelectionActor = createActor(imageSelectionMachine, { inspect });
imageSelectionActor.start();
