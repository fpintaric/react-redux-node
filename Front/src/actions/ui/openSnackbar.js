import { SHOW_SNACKBAR } from "./constants";

export function openSnackbar(message) {
  return {
    type: SHOW_SNACKBAR,
    payload: message
  };
}
