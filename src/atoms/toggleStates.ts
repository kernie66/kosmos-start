import { atom } from 'jotai';
import type { WritableAtom } from 'jotai';

export function atomWithToggle(initialValue?: boolean): WritableAtom<boolean, [boolean?], void> {
  const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
    const update = nextValue ?? !get(anAtom);
    set(anAtom, update);
  });

  return anAtom as WritableAtom<boolean, [boolean?], void>;
}
export const mobileToggleState = atomWithToggle(false);

export const desktopToggleState = atomWithToggle(false);
