import axios from "axios";

export function getLocations() {
  const request = axios.get("http://localhost:8080/locations");

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: "GET_LOCATIONS",
        payload: data
      });
    });
  };
}
