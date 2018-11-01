import { keyBy } from "lodash";

import {
  GET_ALL_MEDIA,
  DELETE_MEDIA,
  INSERT_MEDIA
} from "../actions/media/constants";

export default (previousState = {}, action) => {
  switch (action.type) {
    case GET_ALL_MEDIA:
      return {
        all: keyBy(action.payload, "_id")
      };

    case INSERT_MEDIA:
      return {
        all: {
          ...previousState.all,
          [action.payload._id]: {
            ...action.payload
          }
        }
      };
    case DELETE_MEDIA:
      const id = action.payload;
      const stateCopy = { ...previousState.all };
      delete stateCopy[id];
      return {
        all: stateCopy
      };
    default:
      return previousState;
  }
};
