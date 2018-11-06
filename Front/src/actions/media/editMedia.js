import axios from "axios";
import { INSERT_MEDIA } from "./constants";

export function editMedia(values) {
  console.log(values);
  const request = axios.put(
    `http://localhost:8080/media/${values._id}`,
    values
  );

  return dispatch => {
    request
      .then(({ data }) => {
        dispatch({
          type: INSERT_MEDIA,
          payload: data
        });
      })
      .catch(error => console.log(error.response));
  };
}
