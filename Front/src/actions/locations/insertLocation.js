import { INSERT_LOCATION } from "./constants";

export function insertLocation(location) {
  return {
    type: INSERT_LOCATION,
    payload: location
  };
}
