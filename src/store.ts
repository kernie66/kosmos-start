import { proxy } from 'valtio';

export const store = proxy({
  mobileNavVisible: false,
  pendingFns: 0,
});

export function toggleMobileNavVisibility() {
  store.mobileNavVisible = !store.mobileNavVisible;
}

export function hideMobileNav() {
  store.mobileNavVisible = false;
}

export function addPendingFn() {
  store.pendingFns++;
}

export function removePendingFn() {
  store.pendingFns--;
}
