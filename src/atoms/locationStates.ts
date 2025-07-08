import { atomWithDefault, atomWithStorage } from 'jotai/utils';
import { atomStorage } from './atomStorage.js';
import { atom } from 'jotai';

const defaultLat = import.meta.env.VITE_DEFAULT_LATITUDE;
const defaultLon = import.meta.env.VITE_DEFAULT_LONGITUDE;
export const defaultPosition = {
  lat: parseFloat(defaultLat),
  lng: parseFloat(defaultLon),
};
export const defaultAddress = 'Rotebro, Sollentuna, Sverige';

export const currentLocationState = atomWithStorage(
  'location',
  {
    address: defaultAddress,
    position: defaultPosition,
  },
  atomStorage,
  { getOnInit: true }
);

export const currentPositionState = atom(
  (get) => get(currentLocationState).position
  /* Not used
  (get, set, update) => {
    console.log('update', update);
    set(currentLocationState, {
      address: get(currentLocationState).address,
      position: update,
    });
  }
  */
);

export const historyLocationState = atomWithStorage(
  'locationHistory',
  [],
  atomStorage,
  { getOnInit: true }
);

export const mapLocationState = atomWithDefault((get) =>
  get(currentLocationState)
);
