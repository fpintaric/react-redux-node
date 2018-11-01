import axios from "axios";

export function postLocation(values) {
  const request = axios.post("http://localhost:8080/locations", values);

  return dispatch => {
    request
      .then(response => {
        console.log(response);
        dispatch({
          type: "INSERT_LOCATION",
          payload: response.data
        });
      })
      .catch(error => console.log(error));
  };
}
