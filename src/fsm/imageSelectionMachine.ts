import { assertEvent, assign, fromPromise, setup } from 'xstate';
import { setSelectedImage } from './actions/setSelectedImage';
import { initialSelectImageContext } from './contexts/imageSelectionContext';
import type { ImageFileTypes } from './actions/setSelectedImage';
import type { ImageSelectionContext } from './contexts/imageSelectionContext';
import type { ImageSelectionEvents } from './events/imageSelectionEvents';

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
  /** @xstate-layout N4IgpgJg5mDOIC5QEkC2BDGBlMAbMAxgC4CWA9gHYDEMRABCRjAHQAO6sRYA2gAwC6iUKzKwSpSkJAAPRABYATABoQAT0QBOBczka9ADgDMvAOwBGQ-pOKAvjZVpMYHPmLkKzLEXQAnIlT5BJBARMQkKKVkEAFYNADZmOJMNEwUtZIV9BTkVdQRMuWYFOLiLM15o0pNDErsHJmc8QnDPJuI6RxgaMHpGJ2YCXBJWACMyXwhAqVDxd0jEfQ1o5nMrfSS0wzks3MRDfcTK7LjoswUa3TqQTsbXFpdmjobu3obmCB8yVgAvSh4BaaiWaSYJRRbLVYmdapDRbHZqPb6QpmI5pfTRXilWz2a4NB5uSitO5PJwvBhvHxgABWzUgU2CM3C8wQ4JWZjWG1h22UCIQ3OYKLiCnZpXivF4ciuN3xLQA4j0SV0IH9mCQKAA3MgAazAzGlbTlCpuCDVmoI6HCgXpwiBTNBiAsSQFvBR0Wiwuicn2hl2+UWzAqhjMZg0wd4+nDSKleIN7mY8voNyoYB8nx8bFwFoAZmQfKg9TG7nGE4qwCaNWRzZaBNaQra5vaWUs2RyYXCeXlhYYihjxfoIyY3Z7otGnDK4wAxcSlqh9FhZ8RcSYAhn1kGgKJmL0JWI1DSY3jFUwdhZmZi98XbwyZJb6UfYWOEgBqJDAAHcZ3PdZSxN9-kEbTCBsN0QBRohMAM5DiRYrDiSxhWqX1Um7U5SgqIV9mySUcX1Itn1fD8ky-ZgAFdWAgC1-0BID1xkUDwMg6CNFg+CzEQ3koLPXhDCWRRUmqOJMWw+ox0fDwX3fGdYANZhYBIkZUHEWtGWAuj8gYiUmJYrI2J9XlBMKYo0LSUwllie9bmaOMJMI55pLuAZ0AoAg8GUtcIkbMCIM0mCTDgnT2LyC4VhKcp0XOKC0gs8d8MkpMsxI3BcFgAhKTADwiDIKAoHwNyaI8kD1O8qDfP8hC9LyExrADMxSnA3glhKCVorEzwAAsyA-AA5MhSAXKt3ACFdAOBAq1PKENEjkUxwK3Yp3Q0X0vUKE4hTKft1kMEccMLKzCSweTFMTZ48tG5lYgSJIUjSBQMiyHJ9IqELBNDdY2LOMwWrwjwAGF8CcugAFVWCGgC63y874kSZIYVurR7t9GoEiM4M5FOUxpsHOwcQoMgIDgKRcL2saVNoqIAFo4l9SmA3FOn6fpkwvuJzxvD8aizsbL0INSE4lihMD+xPdSNGe4M4i9aJ9DY5mCQ8GVSw5u1CpMF0QsqaJr2vE45DMJbTmYeIsXFEMKniWXDWOpwldUzczkKXnSjSUVLF9TJ9FpjDoNWfZhNxUTvuYKcrZgG2yYdWIILkNGwOyBRD34304lhHRQvKN0SgUc4LesgjFdXCHG01gNYQF4whK5JDFBWPjil0Wr9jvHaA5ZrAOu63qSH6i1VNJsa7eyFYUedkNXY46C2Sd4x1lu7Ic-2w7pxuMP+-kavedicCsil+E8gMsWQw0XW5Cqpnm4fQO-rAAHgZX5k0YgzZxQ9TFzGFmplhRtiJUPc4z7sIAA */
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
