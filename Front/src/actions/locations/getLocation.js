import axios from "axios";
import { GET_LOCATION } from "./constants";
import { authHeader } from "../../_helpers/authHeader";

export function getLocation(locationId) {
  const request = axios.get(`http://localhost:8080/locations/${locationId}`, {
    headers: authHeader()
  });

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: GET_LOCATION,
        payload: data
      });
    });
  };
}
