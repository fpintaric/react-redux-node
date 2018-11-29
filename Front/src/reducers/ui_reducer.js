import { SHOW_SNACKBAR, HIDE_SNACKBAR } from "../actions/ui/constants";
import {
  INSERT_LOCATION,
  DELETE_LOCATION
} from "../actions/locations/constants";

let initialState = {
  snackbar: {
    open: false,
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
    case INSERT_LOCATION:
      return {
        snackbar: {
          open: true,
          message: "Location added"
        }
      };
    case DELETE_LOCATION:
      return {
        snackbar: {
          open: true,
          message: "Location deleted"
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
