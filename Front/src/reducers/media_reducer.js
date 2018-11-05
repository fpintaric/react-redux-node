import { keyBy } from "lodash";

import {
  GET_ALL_MEDIA,
  DELETE_MEDIA,
  INSERT_MEDIA,
  GET_SINGLE_MEDIA,
  EMPTY_ACTIVE_MEDIA
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
    case GET_SINGLE_MEDIA:
      const media = action.payload;
      return {
        ...previousState,
        active: media
      };
    case EMPTY_ACTIVE_MEDIA:
      return {
        ...previousState,
        active: null
      };
    default:
      return previousState;
  }
};
