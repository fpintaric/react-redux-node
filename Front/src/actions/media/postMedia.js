import axios from "axios";
import { INSERT_MEDIA } from "./constants";

export function postMedia(values) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: function(progressEvent) {
      let percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
    }
  };
  const request = axios.post("http://localhost:8080/media", values, config);

  return dispatch => {
    request
      .then(response => {
        dispatch({
          type: INSERT_MEDIA,
          payload: response.data
        });
      })
      .catch(error => console.log(error));
  };
}
