import axios from "axios";
import { INSERT_LOCATION } from "./constants";

export function postLocation(values) {
  const request = axios.post("http://localhost:8080/locations", values);

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
