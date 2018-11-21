import { SHOW_SNACKBAR, HIDE_SNACKBAR } from "../actions/ui/constants";

let initialState = {
  snackbar: {
    open: true,
    mmessage: ""
  }
};

export default function(previousState = initialState, action) {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        snackbar: {
          open: true,
          message: action.payload
        }
      };
    case HIDE_SNACKBAR:
      return {
        snackbar: {
          open: false,
          message: ""
        }
      };
    default:
      return previousState;
  }
}
