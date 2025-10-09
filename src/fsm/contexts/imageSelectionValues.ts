import type { ShowImageEvents } from '../events/imageSelectionEvents';
import type { FileWithPath } from '@mantine/dropzone';
import type { Actor, MachineSnapshot, StateMachine } from 'xstate';

export type ImageStates = 'not shown' | 'pre-render' | 'fitted' | 'removed';

export const initialSelectImageValues = {
  selectedFile: null as FileWithPath | null,
  error: undefined as unknown,
  fullscreen: false,
  imageSelected: false,
  dropzoneSubText: 'Välj en bildfil att ladda upp',
  showSelect: false,
};

export const initialShowImageValues = {
  imageState: 'not shown' as ImageStates,
};

export type ImageSelectionValues = typeof initialSelectImageValues;

export type ShowImageValues = typeof initialShowImageValues;

export type ShowImageSnapshot = {
  context: ShowImageValues;
};

export type SelectImageState = MachineSnapshot<ImageSelectionValues, any, any, any, any, any, any, any>;

export type ShowImageState = MachineSnapshot<ShowImageValues, any, any, any, any, any, any, any>;

export const imageSelector = {
  imageSelectionValues: (state: SelectImageState) => state.context,
  showImageActor: (state: SelectImageState) =>
    state.children.showImage as Actor<
      StateMachine<ShowImageValues, any, any, any, any, any, any, any, any, any, any, any, any, any>
    >,
  imageState: (snapshot: ShowImageSnapshot) => snapshot.context.imageState,
  sendShowImageEvent: (state: SelectImageState) => state.children.showImage.send as (event: ShowImageEvents) => void,
};
