import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import auth_reducer from "../reducers/auth_reducer";
import locations_reducer from "../reducers/locations_reducer";
import media_reducer from "../reducers/media_reducer";
import modal_reducer from "../reducers/modal_reducer";

export const store = combineReducers({
  auth: auth_reducer,
  locations: locations_reducer,
  media: media_reducer,
  modal: modal_reducer,
  form: formReducer
});
