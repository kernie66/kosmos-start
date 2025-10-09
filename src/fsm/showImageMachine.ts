import { assign, setup } from 'xstate';
import { initialShowImageValues } from './contexts/imageSelectionValues';
import type { ShowImageValues } from './contexts/imageSelectionValues';
import type { ShowImageEvents } from './events/imageSelectionEvents';

export const showImageMachine = setup({
  types: {
    context: {} as ShowImageValues,
    events: {} as ShowImageEvents,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwBYHsDuBJAtgQxgDoA5NAFwAIBldDAOwGIBLfIgJziYC8wBtABgC6iUAAc0sJmSZo6IkAA9EAJn4BWQgE41AZgCMytQBoQATxXKdhfjZs6AHHoAsANk0B2Ze4C+3k6kxcAjBCADEpCiCYZlYQgDMpMkgBYSQQcUlpWXklBGU9fkInHXc1W3K7E3METT1rex1GpuadJ19-WiiQgDUmMAxI2Jjgwg5JHhT5DKkZOTTc1Q1tfUMqxGc6tQaWlr12kADsIZYRjhw0ADc+ISmJGez5iysDAs0S4zNEEsK1Xz8QOhoCBweSHLq3TKzHKIAC0LjWCDh+zBsRI5GotDmYjuWSxikQTmUCL09h8-xRI3ClHBaWmuOhCB0Ljqynsmn4LlWnwQL3qOx2yM6qN6-UGwQh9zxuUJCMchF+fyAA */
  context: initialShowImageValues,

  id: 'showImage',
  initial: 'Not Shown',

  states: {
    'Not Shown': {
      entry: [
        assign(initialShowImageValues),
        () => {
          console.log('Show Image process entered Not Shown state');
        },
      ],
      on: {
        'image.resize': 'Fit Image',
      },
    },
    'Fit Image': {
      entry: assign({
        imageState: 'pre-render',
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
        imageState: 'fitted',
      }),
      on: {
        'image.resize': {
          target: 'Fit Image',
        },
      },
    },
  },

  on: {
    'image.remove': {
      target: '.Not Shown',
      actions: assign({ imageState: 'removed' }),
    },
  },
});
