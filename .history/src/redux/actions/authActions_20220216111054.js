import { userService } from "../../services/auth.service";
import history from "../../services/history";
import { authActions } from "./types";

export const loginUser = (userDetails) => (dispatch) => {
  return (
    dispatch(request({ userDetails })),
    userService
      .auth(userDetails)
      // .then((res) => res.data)
      .then((user) => {
        dispatch(success(user));
        history.push("/home");
      })
      .catch((error) => {
        dispatch(failure(error));
      })
  );
};

//   userService.auth(userDetails).then(
//     (user) => {
//       dispatch(success(user));
//       history.push("/sand");
//     },
//     (error) => {
//       dispatch(failure(error));
//       // dispatch(alertActions.error(error));
//     }
//   )
// )
// };

function request(user) {
  return { type: authActions.LOGIN_REQUEST, payload: user };
}
function success(user) {
  return { type: authActions.LOGIN_SUCCESS, payload: user };
}
function failure(error) {
  return { type: authActions.LOGIN_ERROR, payload: error };
}

export function logout() {
  userService.logout();
  history.push("/");
  return { type: authActions.LOGOUT };
}
