import axios from "axios";
import { DELETE_MEDIA } from "./constants";

export function deleteMedia(mediaId) {
  const request = axios.delete(`http://localhost:8080/media/${mediaId}`);

  return dispatch => {
    request.then(() => {
      dispatch({
        type: DELETE_MEDIA,
        payload: mediaId
      });
    });
  };
}
