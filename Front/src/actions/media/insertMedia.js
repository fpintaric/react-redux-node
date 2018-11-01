import { INSERT_MEDIA } from "./constants";

export function insertLocation(media) {
  return {
    type: INSERT_MEDIA,
    payload: media
  };
}
