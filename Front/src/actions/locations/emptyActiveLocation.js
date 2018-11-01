import { EMPTY_ACTIVE_LOCATION } from "./constants";

export function emptyActiveLocation() {
  return {
    type: EMPTY_ACTIVE_LOCATION,
    payload: "Empty active location"
  };
}
