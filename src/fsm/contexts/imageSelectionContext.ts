import type { FileWithPath } from '@mantine/dropzone';
import type { MachineSnapshot } from 'xstate';

export type ImageSelectionContext = {
  selectedFile: FileWithPath | null;
  error: unknown;
  fullscreen: boolean;
  imageSelected: boolean;
  dropzoneSubText: string;
};

type SelectImageState = MachineSnapshot<ImageSelectionContext, any, any, any, any, any, any, any>;

export const initialSelectImageContext = {
  selectedFile: null,
  error: undefined,
  fullscreen: false,
  imageSelected: false,
  dropzoneSubText: 'Välj en bildfil att ladda upp',
};

export const selectSelectedFile = (state: SelectImageState) => state.context.selectedFile;
export const selectFullscreen = (state: SelectImageState) => state.context.fullscreen;
export const selectImageSelected = (state: SelectImageState) => state.context.imageSelected;
export const selectDropzoneSubText = (state: SelectImageState) => state.context.dropzoneSubText;
