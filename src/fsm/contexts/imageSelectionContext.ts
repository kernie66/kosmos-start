import type { FileWithPath } from '@mantine/dropzone';
import type { MachineSnapshot } from 'xstate';

type ImageStates = 'not shown' | 'pre-render' | 'fitted';

export const initialSelectImageContext = {
  selectedFile: null as FileWithPath | null,
  error: undefined as unknown,
  fullscreen: false,
  imageSelected: false,
  dropzoneSubText: 'Välj en bildfil att ladda upp',
  imageShown: undefined as boolean | undefined,
  imageState: 'not shown' as ImageStates,
  showSelect: false,
  showButtons: false,
};

export type ImageSelectionContext = typeof initialSelectImageContext;

type SelectImageState = MachineSnapshot<ImageSelectionContext, any, any, any, any, any, any, any>;

export const imageSelector = {
  imageSelectionValues: (state: SelectImageState) => state.context,
};
