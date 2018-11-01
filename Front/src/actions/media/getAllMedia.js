import axios from "axios";
import { GET_ALL_MEDIA } from "./constants";

export function getAllMedia() {
  const request = axios.get("http://localhost:8080/media");

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: GET_ALL_MEDIA,
        payload: data
      });
    });
  };
}
