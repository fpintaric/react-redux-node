import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_FAIL,
  AUTHENTICATION_SUCCESS
} from "../actions/login/constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { authenticated: true, user } : {};

export default (previousState = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_SUCCESS:
      return {
        ...previousState,
        authenticated: true,
        user: action.payload
      };
    case AUTHENTICATION_FAIL:
      return {
        ...previousState,
        authenticated: false,
        user: null
      };
    default:
      return previousState;
  }
};
