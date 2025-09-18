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
  /** @xstate-layout N4IgpgJg5mDOIC5QEkC2BDGBlMAbMAxgC4CWA9gHYDEMRABCRjAHQAO6sRYA2gAwC6iUKzKwSpSkJAAPRABYATABoQAT0QBGDb17MNANgDMAVjn6AnIY2XehgL52VaTGBz5i5CsyxF0AJyIqPkEkEBExCQopWQR9Xn1mfQB2c30ADkNFNIVeOUMVdQRDXjTmJIV9Y2N9DRM4pI0HJyZXPEJI7zbiOmcYGjB6RhdmAlwSVgAjMn8IYKlw8U9oxHNcssrqrTkUpKTjAsRquTLjJKtqquzKppBe1vcOt3aelv7BluYIPzJWAC9KHgCeaiRaSUIxVbHJIbGoabbmXb7NSIGrGZgKU5WNIaXbxZI3O5PDyUToPF4uN4MD7sTiAkLCEGRZYISHrKqw+GIg6xSonM45CwZXhJAktImPLr0O6UoYsPxgABW7Ugc1CCyZ4JWa2h7K2Oz23MySWYaQR5mMGQa5jkGjSopc4s8zAA4gNyX0IADmCQKAA3MgAazAzEJkqdrqlLQQPv9BHQkWCqoZESWmoQtTSCThVxM2O05mUyIQxnMGmYcmyZzicks5mx9uwYZJEfdYCoYD83z8bFw8YAZmQ-KgQ2Km14W3do36yHGEwIk2FGanQBDtTC9QiDUW5DvmCZtEk0ofytYRY5bqOHk6AGLiVtUWXBvviLizIFqpdgleaORVRJyWw9l4OskniJJuWxZhjB0HQNkyfc7XPUMrxJAA1EgwAAd3vR9mHlMRfjpYEUy-GREAqY1cnSU1cgArYIMMSjhUMBQdzSXgDCSOQG3udonXQrCcI+ABXVgIHjIiPxIqI0wo5gqLSGidw4uFuUUBJzE01ILhMcoFB4x00Iw7DpVgSVmFgYSJlQcQF3VZcyIQOSFKUujVKLU5dAUCpjAxTMNAULQDLHZgBJM14zIeEZ0AoAg8Dsz8ZO-JzknksxFMhNy5G5by0W8jZsg4kC0m4pDLz4ozBOlPthNwXBYAIeUwC8IgyCgKB8AS6TmWc9LXJU7Ki0sQxy2rBRdl2caFEQ5oHRCsL71oKlhhpLgutBJLHN66jMoG7lDwSaD+WsC0C3KYKUK8LAAAsyGwgA5MhSGfWdPCCd9kw25ltGmxIjzyTybUMYHDR0PczRrbIFEYnFStmxtLu8KybMjCl1o1ZK4gSZJUgyLIcjyblTjLcpKm8krQLMfSyrmxGAGF8BiugAFVWHe+lF26tMscSFJ0kyaaCfyIt8rKHycnNOFdgRBxzwoMgIDgKRkIqzb7NImIAFp9G5bWLtV7xfACYivrTHdjVJi0AuKfQjBykr0XF-QK2oqx7BphGDfFVsTYxxyGhJjZVi2G1AsNAL5J1DEDCqYxGg93jiXHN07l9hyYi2EbdmBxRDFWTINCJ1ZyxMfOuJMBRUn1pPmFvVGYDTjXNBqBIa2sbYdC423uVRcs0gtbJrao6n4cTjoFtTqTTeS4wRuAxjfJqDiMV4JFCi0MtbYAi1pqK9JjGrx5boep6SBe+MHPVzaM7hLOzgFvPbBtHLSxNOF9Al8pDHYrjD6dLBkZ3knp9P2MRfwKDFpUbE0M8TC0KJ5SBvkLQ1ECvHUehkvAMzAEzVmjdr7yFSpXSucRY4Fm-jrEWGJEHQ20s7aa7sHBAA */
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

        'get image.paste': 'Get Image',
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
