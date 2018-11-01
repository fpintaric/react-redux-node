import { keyBy } from "lodash";
import {
  INSERT_LOCATION,
  DELETE_LOCATION,
  GET_LOCATIONS,
  GET_LOCATION,
  EMPTY_ACTIVE_LOCATION
} from "../actions/constants";

export default function(previousState = {}, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        all: keyBy(action.payload, "_id")
      };
    case INSERT_LOCATION:
      return {
        all: {
          ...previousState.all,
          [action.payload._id]: {
            ...action.payload
          }
        }
      };
    case DELETE_LOCATION:
      const id = action.payload;
      const stateCopy = { ...previousState.all };
      delete stateCopy[id];
      return {
        all: stateCopy
      };
    case GET_LOCATION:
      const location = action.payload;
      return {
        ...previousState,
        active: location
      };
    case EMPTY_ACTIVE_LOCATION:
      return {
        ...previousState,
        active: null
      };

    default:
      return previousState;
  }
}
