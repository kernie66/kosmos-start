import { createJSONStorage } from 'jotai/utils';

export const atomStorage = createJSONStorage(() => localStorage);
