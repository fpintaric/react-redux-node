import axios from "axios";
import { GET_SINGLE_MEDIA } from "./constants";
import { authHeader } from "../../_helpers/authHeader";

export function getSingleMedia(mediaId) {
  const request = axios.get(`http://localhost:8080/media/${mediaId}`, {
    headers: authHeader()
  });

  return dispatch => {
    request.then(({ data }) => {
      dispatch({
        type: GET_SINGLE_MEDIA,
        payload: data
      });
    });
  };
}
