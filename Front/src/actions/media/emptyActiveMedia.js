import { EMPTY_ACTIVE_MEDIA } from "./constants";

export function emptyActiveMedia() {
  return {
    type: EMPTY_ACTIVE_MEDIA,
    payload: "Empty active media"
  };
}
