import { combineReducers } from "redux";
import example_reducer from "../reducers/example_reducer";
import auth_reducer from "../reducers/auth_reducer";
import locations_reducer from "../reducers/locations_reducer";

export const store = combineReducers({
  example: example_reducer,
  auth: auth_reducer,
  locations: locations_reducer
});
