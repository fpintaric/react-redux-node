import axios from "axios";
import { INSERT_MEDIA } from "./constants";
import { authHeader } from "../../_helpers/authHeader";

export function editMedia(values) {
  const request = axios.put(
    `http://localhost:8080/media/${values._id}`,
    values,
    {
      headers: authHeader()
    }
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
