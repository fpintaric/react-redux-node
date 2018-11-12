import axios from "axios";
import { INSERT_LOCATION } from "./constants";
import { authHeader } from "../../_helpers/authHeader";

export function postLocation(values) {
  const request = axios.post("http://localhost:8080/locations", values, {
    headers: authHeader()
  });

  return dispatch => {
    request
      .then(response => {
        dispatch({
          type: INSERT_LOCATION,
          payload: response.data
        });
      })
      .catch(error => console.log(error));
  };
}
