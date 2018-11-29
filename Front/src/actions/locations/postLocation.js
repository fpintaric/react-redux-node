import axios from "axios";
import { insertLocation } from "./insertLocation";
import { authHeader } from "../../_helpers/authHeader";

export function postLocation(values) {
  const request = axios.post("http://localhost:8080/locations", values, {
    headers: authHeader()
  });

  return dispatch => {
    request
      .then(response => {
        dispatch(insertLocation(response.data));
      })
      .catch(error => console.log(error));
  };
}
