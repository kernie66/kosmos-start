import type { AnyMachineSnapshot } from 'xstate';

export type SelectImageContext = {
  selectedImage: {} | null;
  error: unknown;
  fullscreen: boolean;
  imageSelected: boolean;
};

export const initialSelectImageContext = {
  selectedImage: null,
  error: undefined,
  fullscreen: false,
  imageSelected: false,
};

export const selectFullscreen = (state: AnyMachineSnapshot) => state.context.fullscreen;
export const selectImageSelected = (state: AnyMachineSnapshot) => state.context.imageSelected;
