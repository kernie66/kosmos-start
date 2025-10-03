import type { FileWithPath } from '@mantine/dropzone';
import type { MachineSnapshot } from 'xstate';

type ImageStates = 'not shown' | 'pre-render' | 'fitted' | 'resizing' | 'shown';

/*
export type ImageSelectionContext = {
  selectedFile: FileWithPath | null;
  error: unknown;
  fullscreen: boolean;
  imageSelected: boolean;
  dropzoneSubText: string;
  imageShown: boolean | undefined;
  imageState: ImageStates;
  showSelect: boolean;
  showButtons: boolean;
};
*/

export const initialSelectImageContext = {
  selectedFile: <FileWithPath | null>null,
  error: <unknown>undefined,
  fullscreen: false,
  imageSelected: false,
  dropzoneSubText: 'Välj en bildfil att ladda upp',
  imageShown: <boolean | undefined>undefined,
  imageState: 'not shown' as ImageStates,
  showSelect: false,
  showButtons: false,
};

export type ImageSelectionContext = typeof initialSelectImageContext;

type SelectImageState = MachineSnapshot<ImageSelectionContext, any, any, any, any, any, any, any>;

export const imageSelector = {
  imageSelectionValues: (state: SelectImageState) => state.context,
};
