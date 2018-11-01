import axios from "axios";
import { INSERT_LOCATION } from "./constants";

export function editLocation(values) {
  const request = axios.put(
    `http://localhost:8080/locations/${values._id}`,
    values
  );

  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: INSERT_LOCATION,
          payload: data
        });
      })
      .catch(error => console.log(error.response));
  };
}
