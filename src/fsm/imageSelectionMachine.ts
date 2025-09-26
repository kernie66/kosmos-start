import { assertEvent, assign, fromPromise, setup } from 'xstate';
import { setSelectedImage } from './actions/setSelectedImage';
import { initialSelectImageContext } from './contexts/imageSelectionContext';
import type { ImageFileTypes } from './actions/setSelectedImage';
import type { ImageSelectionContext } from './contexts/imageSelectionContext';
import type { FileWithPath } from '@mantine/dropzone';

export type ImageSelectionEvents =
  | { type: 'get image.paste'; data?: File }
  | { type: 'get image.dropzone'; data?: FileWithPath }
  | { type: 'get image.clipboard'; data?: null }
  | { type: 'get image.rejected'; cause: string }
  | { type: 'image.fitted' }
  | { type: 'image.resize' }
  | { type: 'image.update' }
  | { type: 'select.submit' }
  | { type: 'select.cancel' }
  | { type: 'fullscreen.toggle' };

export const imageSelectionMachine = setup({
  types: {
    context: {} as ImageSelectionContext,
    events: {} as ImageSelectionEvents,
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
  /** @xstate-layout N4IgpgJg5mDOIC5QEkC2BDGBlMAbMAxgC4CWA9gHYDEMRABCRjAHQAO6sRYA2gAwC6iUKzKwSpSkJAAPRABYATABoQAT0QBGXhoCczDXIAcChTo0BWAGxydcuQF97KtJjA58xchWZYi6AE5EVHyCSCAiYhIUUrIIlryWzJYA7DrJvGaGvADMGhqWKuoICobmzMnmvLwKvHLJuhUajs5MbniEUT7txHQuMDRg9IyuzAS4JKwARmQBECFSEeJeMYhmZfWGyRXmGtkKljrZhYjmpkk6lWZaWdmGzSB9bR6d7h29rQNDrcwQ-mSsAC9KDwBAtREtJGFYmtyhpNttdvtDscEOYsvoLnlsuZ0mjeOZ7o9Xp5KF1nu9XJ8GN9-GAAFYdSDzMKLKIrBAwjZbcw7PYHI5qRC5BTMQzY5KKXj1A4aBQOJwPVrEzoAcUGFP6EGBzBIFAAbmQANZgZhE7qq9WPBC6g0EdBRELM4TgtlQzTZNL6bQ4y7abK1FE8xKSnnJQwXK6EpXmrzMNX0R5UMD+P7+Ni4e0AMzI-lQpujz1j8Y1YGt+rIdodAid4RdyzdHIssPhPMR-JRcgyzBKhk22jFCmy2S2UdcytjADFxCWqMMWJnxFw5qCWXXIaBYgZLIlzIdpUOdvlDCjDBpmJUqjkUv6JVZR9gY6SAGokMAAdxnc5NtLEAJBoWdSJ6w3RB9mSZhaksTZsR0DI+3ME9tGYWxD2sHY5D5e8ng6WMX3fT9vgAV1YCB7X-MEgPXGRQJSCC5Cg5IYLg3EO1qCDBxsMVGJ0ExSiw8dn1fD9E1gc1mFgQjJlQcQa1ZYDqOKWjIOg3dmPxQM6m7C9xTMWwFCaBUzULQT8JEsS7QoAg8FktdogbMC6IYpidHglEahFBQL14Yw7FgrY7kMgscJM4SPkzQjcFwWACFpMBvCIMgoCgfAbMouyQMU8DlMY1SXJYwUEFKEU7F5cNdjSHZ+Mfbw8NCylaGpEZ2E4cjVzS9kHOy5zXIKxpmBKjIPV7cNqiq4zvCwAALMgPwAOTIUgF0rLxghXQCIXShStA9JJOwYorTjFNzLDKA9klMMUdk8-IxuCibJOkhMPlSjb2XiRIUjSDI4RyPICgK8wjHKLzkniLZO2yW6SW8ABhfB0AoOgAFVWFWgDa3aht3qSVJ0kyX78jcnJgaqGptEYoceMcBUKDICA4CkIy7oo16GwAWn+oo2bKHRed53Ihw0LZZQMlox2qnw-ECFnXQyuxwPOk6eMMeJdBKY6z08qobylORKn2KGXnNEsZfk2J6jPUGrF3XRckqTnQPSZh-SqCxBz2IxPMNotLVaU2qM3Cw5HKfZLGHFXzGyFINEDHlncY9Io6jnEhe90kpye1x-c2zdLAUcCSrAjDtBKAUijxfrBxSA5UksIXRcVcXxuYWqTba1mMsjiC9wwzFeZMOUT0MJJNkqUHBvoyHAqbu6fGmuaFpIJb7XkuSA80IOQ+3cOTqj+o3KsYG5Tg2obBsNP7qk6dHmz9k9ZFRXdxKVXlY0hXtJxXTFAbpnoeYOGwAI2RqwW+DZ6LgVMC7RicEw5Ewfl5HyNgpQVGpvYIAA */
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
      entry: assign({
        showSelect: true,
      }),
      on: {
        'get image.clipboard': {
          target: 'Get Image',
        },

        'get image.dropzone': {
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
          target: 'Fit Image',
          actions: [
            ({ event }) => {
              console.log('Image successfully selected and loaded', event.output, event);
            },
            assign({
              selectedFile: ({ event }) => event.output,
            }),
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
    },

    'Fit Image': {
      entry: assign({
        imageSelected: true,
        imageShown: false,
        imageState: 'pre-render',
        showSelect: false,
      }),
      on: {
        'image.fitted': {
          target: 'View Image',
          reenter: true,
        },
      },
    },

    'View Image': {
      entry: assign({
        imageShown: true,
        imageState: 'fitted',
      }),
      on: {
        'image.resize': {
          target: 'Fit Image',
        },

        'image.update': {
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

        'fullscreen.toggle': {
          target: 'Fit Image',
          actions: assign({
            fullscreen: ({ context }) => !context.fullscreen,
          }),
        },
      },
      // Ensure that fullscreen is restored when exiting
      // exit: [assign({ fullscreen: false, imageSelected: false })],
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
