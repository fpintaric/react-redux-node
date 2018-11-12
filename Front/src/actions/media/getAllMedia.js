import axios from "axios";
import { GET_ALL_MEDIA } from "./constants";
import { authHeader } from "../../_helpers/authHeader";

export function getAllMedia() {
  const request = axios.get("http://localhost:8080/media", {
    headers: authHeader()
  });

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: GET_ALL_MEDIA,
        payload: data
      });
    });
  };
}
