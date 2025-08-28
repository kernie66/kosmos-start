import type { FileWithPath } from '@mantine/dropzone';
import type { MachineSnapshot } from 'xstate';

export type SelectImageContext = {
  selectedFile: FileWithPath | null;
  error: unknown;
  fullscreen: boolean;
  imageSelected: boolean;
};

type SelectImageState = MachineSnapshot<SelectImageContext, any, any, any, any, any, any, any>;

export const initialSelectImageContext = {
  selectedFile: null,
  error: undefined,
  fullscreen: false,
  imageSelected: false,
};

export const selectSelectedFile = (state: SelectImageState) => state.context.selectedFile;
export const selectFullscreen = (state: SelectImageState) => state.context.fullscreen;
export const selectImageSelected = (state: SelectImageState) => state.context.imageSelected;
