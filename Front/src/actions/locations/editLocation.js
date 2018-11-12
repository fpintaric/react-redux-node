import axios from "axios";
import { INSERT_LOCATION } from "./constants";
import { authHeader } from "../../_helpers/authHeader";

export function editLocation(values) {
  const request = axios.put(
    `http://localhost:8080/locations/${values._id}`,
    values,
    {
      headers: authHeader()
    }
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
