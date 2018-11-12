import axios from "axios";
import {
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL
} from "./constants";

export function authenticationRequest(credentials) {
  const request = axios.post(
    `http://localhost:8080/users/authenticate`,
    credentials
  );

  return dispatch => {
    request
      .then(({ data }) => {
        if (data.token) {
          dispatch({
            type: AUTHENTICATION_SUCCESS,
            payload: data
          });
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          dispatch({
            type: AUTHENTICATION_FAIL,
            payload: data
          });
        }
      })
      .catch(error => {
        dispatch({
          type: AUTHENTICATION_FAIL,
          payload: error
        });
        console.log(error);
      });
  };
}
