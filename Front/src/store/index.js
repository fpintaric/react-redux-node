import { combineReducers } from "redux";
import { reducer as form_reducer } from "redux-form";

import auth_reducer from "../reducers/auth_reducer";
import locations_reducer from "../reducers/locations_reducer";
import media_reducer from "../reducers/media_reducer";
import modal_reducer from "../reducers/modal_reducer";
import ui_reducer from "../reducers/ui_reducer";

export const store = combineReducers({
  auth: auth_reducer,
  locations: locations_reducer,
  media: media_reducer,
  modal: modal_reducer,
  form: form_reducer,
  ui: ui_reducer
});
