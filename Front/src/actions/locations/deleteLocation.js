import axios from "axios";
import { DELETE_LOCATION } from "./constants";

export function deleteLocation(locationId) {
  const request = axios.delete(`http://localhost:8080/locations/${locationId}`);

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: DELETE_LOCATION,
        payload: locationId
      });
    });
  };
}
