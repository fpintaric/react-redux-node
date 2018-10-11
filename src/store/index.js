import { createStore, combineReducers } from "redux";
import example_reducer from "../reducers/example_reducer";

export const store = createStore(
  combineReducers({
    example: example_reducer
  })
);
