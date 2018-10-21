import { combineReducers } from "redux";
import auth_reducer from "../reducers/auth_reducer";
import locations_reducer from "../reducers/locations_reducer";
import modal_reducer from "../reducers/modal_reducer";

export const store = combineReducers({
  auth: auth_reducer,
  locations: locations_reducer,
  modal: modal_reducer
});
