import type { MachineSnapshot } from 'xstate';

export type SelectImageContext = {
  selectedImage: {} | null;
  error: unknown;
  fullscreen: boolean;
  imageSelected: boolean;
};

type SelectImageState = MachineSnapshot<SelectImageContext, any, any, any, any, any, any, any>;

export const initialSelectImageContext = {
  selectedImage: null,
  error: undefined,
  fullscreen: false,
  imageSelected: false,
};

export const selectFullscreen = (state: SelectImageState) => state.context.fullscreen;
export const selectImageSelected = (state: SelectImageState) => state.context.imageSelected;
