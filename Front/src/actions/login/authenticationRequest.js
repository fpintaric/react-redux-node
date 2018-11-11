import axios from "axios";
import { AUTHENTICATION_REQUEST } from "./constants";

export function authenticationRequest(credentials) {
  const request = axios.get(
    `http://localhost:8080/users/authenticate/`,
    credentials
  );

  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: AUTHENTICATION_REQUEST,
          payload: data
        });
      })
      .catch(error => console.log(error.response));
  };
}
