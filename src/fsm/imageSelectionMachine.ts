import { assertEvent, assign, fromPromise, setup } from 'xstate';
import { setSelectedImage } from './actions/setSelectedImage';
import { initialSelectImageContext } from './contexts/imageSelectionContext';
import type { ImageFileTypes } from './actions/setSelectedImage';
import type { ImageSelectionContext } from './contexts/imageSelectionContext';
import type { FileWithPath } from '@mantine/dropzone';
import type { ImageSizeProps } from '~/components/upload/PreviewImage';

export type ImageSelectionEvents =
  | { type: 'get image.paste'; data?: File }
  | { type: 'get image.dropzone'; data?: FileWithPath }
  | { type: 'get image.clipboard'; data?: null }
  | { type: 'get image.rejected'; cause: string }
  | { type: 'image.pre-render' }
  | { type: 'image.pre-rendered'; newSize: number }
  | { type: 'image.fitted'; newSize: number }
  | { type: 'image.finalize'; newSize: ImageSizeProps }
  | { type: 'image.resize'; newSize: ImageSizeProps }
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
  /** @xstate-layout N4IgpgJg5mDOIC5QEkC2BDGBlMAbMAxgC4CWA9gHYDEMRABCRjAHQAO6sRYA2gAwC6iUKzKwSpSkJAAPRABYATABoQAT0QBGDXI3MAnAGYA7Bt689OgKwAOWwF87KtJjA58xchWZYi6AE5EVHyCSCAiYhIUUrIIAGy8scyxRnpGcjrWBnp6Cnoq6gjWCrpyxrwKxZYKBpaxsQ5OTK54hJHeLcR0zjA0YPSMLswEuCSsAEZk-hDBUuHintGIerxyzEaxtQZ1FZVG+YhGuWsb8QYG1hrLFg0g3c3ubW6tXU29-U3MEH5krABelDwBLNRPNJKEYstVutNtsKhpLHs1AdrLxmAoNpYqnJypY9Bsbncnh5KO0Hi8XG8GB92JxASFhCDIosEJDjjDYjt4YiCplUdCERzrHJLMKDASmkTHh16HdKQMWH4wAArVqQGahOZM8FLFZs2JbDlwhH7BCWDQKfQJCpyIxGC4KXjWcUuSWeZgAcT65J6EABzBIFAAbmQANZgZiE6Vuz0ypoIAPBgjoSLBdUMiILbUIDTnRLaIWxOS2dIKIyWE12vRJM7WWIWUymIxixy3CVRkkx71gKhgPzfPxsXDJgBmZD8qAjbYe0a9d3jQbISZTAjTYUZmdAEN10P1sN2JviVZqhht6UO6ydLcj05JADFxF2qPLw8PxFxpkCNeuwZvNNDmOklgGA62RpHIsQmgY6RJLUGi2JYvBGOYhbNo0Lrtl494UOgIy-GAj7Pswr7YbhdLAhmP4yH+GwAaKIGpOkEFIoUugIWYvBwXoKI2s62AYcwABqJBgAA7gRHyKmIeGrpqG5UQg6JGMwKyxNYJiXOxxSQcUSQpIWQrqQhWy8fcrRukJoniYMACurAQMmZFfhRURZopyngWpWjLGYWnMRsBhoqY4HrOpZZGCZrokhZYmyrA0rMLA1ljKg4gyd+Lm-gpyTuap6neeUGgmssuiGEhtY6IcqR6BF-HRY+cUPEM6AUAQeBpc5zJuSpnkaT5hXMZiiSlbwxgbPCtQKDVN5eHVsrDtZuC4LABCKmAXhEGQUBQPg7Wghl8ldR5eWaf1BQVJYaLops1TogoCFyFNZlRcJMWvLQVKDDSXC7VqmWHblXknSapg6XBJiISYuKoa26HTd4AAWZBiQAcmQpCvkunhBJ+6Z7cyIPWEkalVEBCjcdYeTMeBF3YrElymJCOY5o9xJeFgSUpbGFI-XJMTxIkyQMRkWQ5JTBTLAFpRIekjrGGp4VXlOT1eAAwvgzV0AAqqw2P0muHVZvzulC3BIu5CamKE1LI2lkWySqQ4LYUGQEBwFI17K+ReNZgAtExBQ+xd2TByHIcIizjy+AEXu-fJZ5rOidMKHI2T6rYFZ4voZS5GYCJAQraF8XDkpdjHvMHFoeq8DYZx1mLiAXIkjpIWTOgcSs0Me6zHqzk0ZeUTEWilGsTa5qktqYhWtjMDYSFaBo+q2xHbr3lzMD9-tg9GynxQUwYObmMozHAboJxwQz2SbAXMNF8rzBYThJB4aXTne5llxHLkqkFhsFRcZBjo0RZCqDUFEHF0jL2epZO4G9mRAWUqVYB1d9I5iKooNYKd4gL0OKpTuStu5YERijNGJAMbJjkrJAemhtABVtDWOstoyzliptkACdRTBJxFNUeEkC2YcwfDA1+scYjCgtDgpOKc8TnGsEVcoAEyhaEGiNQsvDmBqzABrbWsCszBTRIYHEE1SjJGYQUTESlrajTNINSajsgA */
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
          target: 'Fit Image',
          actions: [
            ({ event }) => {
              console.log('Image successfully selected and loaded', event.output, event);
            },
            assign({
              selectedFile: ({ event }) => event.output,
              centerHeight: '100%',
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
        // centerHeight: '100%',
        imageShown: false,
      }),
      on: {
        'image.pre-render': {
          actions: assign({
            imageState: 'pre-render',
          }),
        },
        'image.pre-rendered': {
          actions: assign({
            modalInnerHeight: ({ event }) => event.newSize,
            imageState: 'resizing',
          }),
        },
        'image.fitted': {
          target: 'Finalize Image',
          actions: assign({
            modalInnerHeight: ({ event }) => event.newSize,
          }),
        },
      },
    },

    'Finalize Image': {
      entry: assign({ imageState: 'fitted' }),
      on: {
        'image.finalize': {
          target: 'View Image',
          actions: assign({
            imageState: 'shown',
            centerHeight: ({ event }) => event.newSize,
          }),
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
          actions: assign({
            centerHeight: ({ event }) => event.newSize,
          }),
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
            centerHeight: '100%',
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
