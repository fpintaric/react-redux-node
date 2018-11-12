import axios from "axios";
import { GET_LOCATIONS } from "./constants";
import { authHeader } from "../../_helpers/authHeader";

export function getLocations() {
  const request = axios.get("http://localhost:8080/locations", {
    headers: authHeader()
  });

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: GET_LOCATIONS,
        payload: data
      });
    });
  };
}
