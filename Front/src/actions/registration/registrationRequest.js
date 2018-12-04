import axios from "axios";
import { REGISTRATION_REQUEST } from "./constants";

export function registrationRequest(userData) {
  const request = axios.post(`http://localhost:8080/users/register`, userData);

  return dispatch => {
    request.then(data => {
      if (data.token) {
        dispatch({
          type: REGISTRATION_REQUEST,
          payload: data
        });
      }
    });
  };
}
