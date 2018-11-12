import axios from "axios";
import { history } from "./history";
import { AUTHENTICATION_FAIL } from "../actions/login/constants";

export const setupInterceptors = store => {
  axios.interceptors.response.use(
    response => {
      console.log(response);
      return response;
    },
    error => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log("something's fucky");
        localStorage.removeItem("user");
        store.dispatch({
          type: AUTHENTICATION_FAIL,
          payload: error
        });
        history.push("/login");
      }
      return error;
    }
  );
};
