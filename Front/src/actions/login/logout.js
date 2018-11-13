import { LOGOUT } from "./constants";

import { history } from "../../_helpers/history";

export function logout() {
  return dispatch => {
    dispatch({
      type: LOGOUT,
      payload: null
    });

    localStorage.removeItem("user");
    history.push("/login");
  };
}
