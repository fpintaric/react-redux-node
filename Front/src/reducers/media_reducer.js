import { keyBy } from "lodash";

import { GET_ALL_MEDIA } from "../actions/media/constants";

export default (previousState = {}, action) => {
  switch (action.type) {
    case GET_ALL_MEDIA:
      return {
        all: keyBy(action.payload, "_id")
      };
    default:
      return previousState;
  }
};
