import type { FileWithPath } from '@mantine/dropzone';
import type { MachineSnapshot } from 'xstate';

type ImageStates = 'not shown' | 'pre-render' | 'fitted' | 'resizing' | 'shown';

export type ImageSelectionContext = {
  selectedFile: FileWithPath | null;
  error: unknown;
  fullscreen: boolean;
  imageSelected: boolean;
  dropzoneSubText: string;
  imageShown: boolean | undefined;
  imageState: ImageStates;
};

type SelectImageState = MachineSnapshot<ImageSelectionContext, any, any, any, any, any, any, any>;

export const initialSelectImageContext = {
  selectedFile: null,
  error: undefined,
  fullscreen: false,
  imageSelected: false,
  dropzoneSubText: 'Välj en bildfil att ladda upp',
  imageShown: undefined,
  imageState: 'not shown' as ImageStates,
};

export const selectSelectedFile = (state: SelectImageState) => state.context.selectedFile;
export const selectFullscreen = (state: SelectImageState) => state.context.fullscreen;
export const selectImageSelected = (state: SelectImageState) => state.context.imageSelected;
export const selectDropzoneSubText = (state: SelectImageState) => state.context.dropzoneSubText;
export const selectImageShown = (state: SelectImageState) => state.context.imageShown;
export const selectImageState = (state: SelectImageState) => state.context.imageState;
