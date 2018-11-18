import axios from "axios";
import { AUTHENTICATION_SUCCESS, AUTHENTICATION_FAIL } from "./constants";

import { history } from "../../_helpers/history";

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
          history.push("/");
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
        history.push("/");
      });
  };
}
