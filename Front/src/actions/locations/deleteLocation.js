import axios from "axios";
import { DELETE_LOCATION } from "./constants";
import { authHeader } from "../../_helpers/authHeader";

export function deleteLocation(locationId) {
  const request = axios.delete(
    `http://localhost:8080/locations/${locationId}`,
    {
      headers: authHeader()
    }
  );

  return dispatch => {
    request.then(() => {
      dispatch({
        type: DELETE_LOCATION,
        payload: locationId
      });
    });
  };
}
