import { assertEvent, assign, fromPromise, sendTo, setup } from 'xstate';
import { setSelectedImage } from './actions/setSelectedImage';
import { initialSelectImageValues } from './contexts/imageSelectionValues';
import { showImageMachine } from './showImageMachine';
import type { ImageFileTypes } from './actions/setSelectedImage';
import type { ImageSelectionValues } from './contexts/imageSelectionValues';
import type { ImageSelectionEvents } from './events/imageSelectionEvents';

export const imageSelectionMachine = setup({
  types: {
    context: {} as ImageSelectionValues,
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
    showImageActor: showImageMachine,
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
  /** @xstate-layout N4IgpgJg5mDOIC5QEkC2BDGBlMAbMAxgC4CWA9gHYDEMRABCRjAHQAO6sRYA2gAwC6iUKzKwSpSkJAAPRABYATABoQAT0QBOBczka9ADgDMvAOwBGQ-pOKAvjZVpMYHPmLkKzLEXQAnIlT5BJBARMQkKKVkEAFYNADZmOJMNEwUtZIV9BTkVdQRMuWYFOLiLM15o0pNDErsHJmc8QnDPJuI6RxgaMHpGJ2YCXBJWACMyXwhAqVDxd0jEfQ1o5nMrfSS0wzks3MRDfcTK7LjoswUa3TqQTsbXFpdmjobu3obmCB8yVgAvSh4BaaiWaSYJRRbLVYmdapDRbHZqPb6QpmI5pfTRXilWz2a4NB5uSitO5PJwvBhvHxgABWzUgU2CM3C8wQ4JWZjWG1h22UCIQ3OYKLiCnZpXivF4ciuN3xLQA4j0SV0IH9mCQKAA3MgAazAzGlbTlCpuCDVmoI6HCgXpwiBTNBiAsSQFvBR0Wiwuicn2hl2+UWzAqhjMZg0wd4+nDSKleIN7mY8voNyoYB8nx8bFwFoAZmQfKg9TG7nGE4qwCaNWRzZaBNaQra5vaWUs2RyYXCeXlhYYihjxfoIyY3Z7otGnDK4wA1EhgADupaofRYlLE33+QRtYQboCiCmiJgDcjiiyscUswuqvtS3dOpQqQv22UlOP1RcJU9n89gBuYAFdWBALTXQFNxBbdEF4X1eFHbBYzfac5yTL87mYWAfxGVBxFrRktxkRBd33CUjw0E8zzMC9eTiCUihKco0lMJZYmg25mkneDP2-c0KAIPAsPrUDcPyPcDyIkisjIn1eQuFYaPDd0tiFDQmPHOCPyTLMf1wXBYAISkwA8IgyCgKB8F4kCIkbfDhOPExTzE8i8hMawAzMUo914JYSglJTYI8LAAAsyDnAA5MhSCzEgq3cAIAQZPjzLAhByhDRI5FMPczEUE40l9L1ChOIUyn7dZDBHZ9CxYwksDQjDE2eUzgXigTYgSJIUjSBQMiyHIKIqaTKNDdYyLOMxvNfDwAGF8HQCg6AAVVYaL1zrMzmWaxJkhhDqtC630agSYpSgy05TFSwc7BxCgyAgOApBfCrGuw-iogAWm2X1nosQpexdd1ojWDRMVG+7PG8PxgIa5kvX3VITiWKFd37Ds8NiPrgziL0-rIoGCV8g1S3Bu0EpMF1pMqaJDHOYpPTMHLTmYeIsXFEMKnibHDVqpwCZwqJg2yFYDrOeIQ0sX1Mn0ANMXOI9Vn2J96jHHzmHfBCGi5p7EHJgNYXh4xMV0LZL0UFZFBh3QXP2fQ2bjfzAroEKwoii0cMexqebOQoYdKNJRRF3lD3F8wveMdYOuyK3Kuq8R8dilbGzkI2YdiPcsj++E8koj2aJDDQ5AyxyTHDiappm+a1dd+QhM2cUPUxcwkYQGplgFsiJV4BRzgL86gA */
  context: initialSelectImageValues,
  id: 'ImageSelection',
  initial: 'Start',
  invoke: {
    id: 'showImage',
    src: 'showImageActor',
  },
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
          target: 'View Image',
          actions: [
            ({ event }) => {
              console.log('Image successfully selected and loaded', event.output, event);
            },
            assign({
              selectedFile: ({ event }) => event.output,
              imageSelected: true,
            }),
            sendTo('showImage', { type: 'image.resize' }),
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

    'View Image': {
      entry: assign({
        showSelect: false,
      }),
      on: {
        'select.update': {
          target: 'Select Image',
          actions: assign({
            dropzoneSubText: 'Välj en ny bildfil för att byta ut den nuvarande',
            fullscreen: false,
          }),
        },

        'select.submit': {
          target: 'Submit Image',
        },

        'select.cancel': {
          target: 'Clean Up',
        },

        'fullscreen.toggle': {
          target: 'View Image',
          actions: [
            assign({
              fullscreen: ({ context }) => !context.fullscreen,
            }),
          ],
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
