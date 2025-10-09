import type { FileWithPath } from '@mantine/dropzone';

export type ImageSelectionEvents =
  | { type: 'get image.paste'; data?: File }
  | { type: 'get image.dropzone'; data?: FileWithPath }
  | { type: 'get image.clipboard'; data?: null }
  | { type: 'get image.rejected'; cause: string }
  | { type: 'select.update' }
  | { type: 'select.submit' }
  | { type: 'select.cancel' }
  | { type: 'fullscreen.toggle' };

export type ShowImageEvents = { type: 'image.fitted' } | { type: 'image.resize' } | { type: 'image.remove' };
