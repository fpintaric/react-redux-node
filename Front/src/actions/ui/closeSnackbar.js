import { HIDE_SNACKBAR } from "./constants";

export function closeSnackbar() {
  return {
    type: HIDE_SNACKBAR,
    payload: ""
  };
}
