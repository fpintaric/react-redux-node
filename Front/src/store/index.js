import { createStore, combineReducers } from "redux";
import example_reducer from "../reducers/example_reducer";
import auth_reducer from "../reducers/auth_reducer";

export const store = createStore(
  combineReducers({
    example: example_reducer,
    auth: auth_reducer
  })
);
