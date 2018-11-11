import { AUTHENTICATION_REQUEST } from "../actions/login/constants";

export default (previosState = {}, action) => {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      console.log(action.payload);
      break;
    default:
      return {
        authenticated: false,
        user: null
      };
  }
};
