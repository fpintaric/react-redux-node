import axios from "axios";
import { DELETE_MEDIA } from "./constants";
import { authHeader } from "../../_helpers/authHeader";

export function deleteMedia(mediaId) {
  const request = axios.delete(`http://localhost:8080/media/${mediaId}`, {
    headers: authHeader()
  });

  return dispatch => {
    request.then(() => {
      dispatch({
        type: DELETE_MEDIA,
        payload: mediaId
      });
    });
  };
}
