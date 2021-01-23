import { AUTH_ERROR, AUTH_SUCCESS, AUTH_LOADING } from "./constants";
import * as authApiClient from "../services/authApi";
/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
function authenticate() {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    const data = await authApiClient.authenticate();
    if (data.success) {
      dispatch({
        type: AUTH_SUCCESS,
        userData: {
          name: "THUTA",
          email: "blackhelios.web@gmail",
        },
      });
    } else {
      dispatch({
        type: AUTH_ERROR,
        error: {
          message: "User not authorized",
        },
      });
    }
  };
}

export { authenticate };
