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
  /** @xstate-layout N4IgpgJg5mDOIC5QEkC2BDGBlMAbMAxgC4CWA9gHYDEMRABCRjAHQAO6sRYA2gAwC6iUKzKwSpSkJAAPRABYATABoQAT0QBGXhoCczDXIAcChTo0BWAGxydcuQF97KtJjA58xchWZYi6AE5EVHyCSCAiYhIUUrIIlryWzJYA7DrJvGaGvADMGhqWKuoICobmzMnmvLwKvHLJuhUajs5MbniEUT7txHQuMDRg9IyuzAS4JKwARmQBECFSEeJeMYhmZfWGyRXmGtkKljrZhYjmpkk6lWZaWdmGzSB9bR6d7h29rQNDrcwQ-mSsAC9KDwBAtREtJGFYmtyhpNttdvtDscEOYsvoLnlsuZ0mjeOZ7o9Xp5KF1nu9XJ8GN92JwQaFhOCoisEDCNltzDs9gcjmpEJZsrxzlz4tlciYdITWsSXt16I8qcMWP4wAArDqQeZhRbMqGrCyw+GcxE8lHi5iGbHJRS8eoHDQKBxOB7SuVeZgAcUGFP6EGBzBIFAAbmQANZgZhEt2kr3y1oIQMhgjoKIhLWMyLLPUIXZpfTaHGXbSCuQozmJG2c5KGC5XKWuGXu2M+sBUMD+P7+Ni4FMAMzI-lQkddzyb3seCeDZGTqYE6fCTKzoGhBvZCO5yL5CDkGWYJUMm20loUYq29ew0e8ADFxC2qEqI73xFw5qDtYvIcvNHJLIlzIc7TFHZ8kMFFDA0ZhKiqHIUkFa0rHPJ4OndAA1EgwAAdzvB9mBVMQAXpMFM0-GREH2ZJmFqSxNmxHQMkPcwwO0ZhbGA6wdjkblEMbUk0Mw7DvgAV1YCAU0I99iOibNyMon8aP-ejcRRHc5Eok8bEtZJsh0ExSm4y9mD4rCFVgOVmFgQTJlQcR5x1JdSOKFJZOorSFJ0BiyzqPcoKtMxbAUJpnSjUdePQ4yPlM55RnQCgCDwWyPykr9HIoqj5Lo9ylK3GoFG86DjDsOitjuIKR2Q0L+IVXtBNwXBYAIFUwG8IgyCgKB8ASySWRktLXIyjyt1KXK7C5Gtc0afSQu8Iy71oakRlpLhOohJKHJ6uS+sU-EUUaZgRoybSDxrapJvK7wsAACzILCADkyFIJ8Zy8YI3wzFaWS0bSkh3FyhtOS0UX2MogOSUxLR2BQdksU6SXOyzrLjSllt1ZL4kSFI0gyOEcjyAot3MIxyig214i2HdshhzoAGF8BiugAFVWBehkFy67M0aSVJ0kyHH8kBnIiaqGptC0sUdMcZ0KDICA4CkYKzqI97swAWjxopVcp91fACIhFZRhy7Ao0HLH-Ep4l0EpAcsCDIaqODbTkSp9k10kZRbPX7NieoIOSE2Tb83JKjVsj0mYQUqgsE89iMSGXe8ZtHg9kjYjyAnyn2AVqxN7IUg0MtOTDrT0hznOcQ0ZI4+YG9EZgJPVpTywFAokbyM47QSl5Io8T2k8UgOVJrfqSuZsTiSleS8xskogDOMxHQdJMUtBsMJJNkqX2Dp-CnSobAzLuuug7oekgnpIuzk80CxVONzPDGz3PAasInHXo2obBsSusHh29R7e-XYkdrlY2ps77aB0qBfGXkKh2xxH5RQgUWi7ymswGmYA6aMzriyH8FFTDhy0vRAU-MgHEwKjYW0FQJb2CAA */
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
