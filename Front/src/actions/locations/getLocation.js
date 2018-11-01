import axios from "axios";
import { GET_LOCATION } from "./constants";

export function getLocation(locationId) {
  const request = axios.get(`http://localhost:8080/locations/${locationId}`);

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: GET_LOCATION,
        payload: data
      });
    });
  };
}
