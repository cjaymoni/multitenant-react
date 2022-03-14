import Swal from "sweetalert2";
import api from "../../services/api";
import { userService } from "../../services/auth.service";
// import history from "../../services/history";
import { authActions } from "./types";

export const loginUser = (userDetails) => (dispatch) => {
  return (
    dispatch(request({ userDetails })),
    userService
      .auth(userDetails)
      // .then((res) => res.data)
      .then((user) => {
        dispatch(success(user));
        // history.push("/home");
        window.location.assign("/dashboard");
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
  return { type: authActions.LOGIN_SUCCESS, payload: user.data };
}
function failure(error) {
  return { type: authActions.LOGIN_ERROR, payload: error };
}

export function logout() {
  userService.logout();
  window.location.assign("/");
  return { type: authActions.LOGOUT };
}

export const verifyEmail = (email) => (dispatch) => {
  return api
    .get(`/users/?search=email&value=${email}`)
    .then((res) => res.data)
    .then((userdetail) =>
      dispatch(
        {
          type: authActions.VERIFY_EMAIL,
          payload: userdetail.data[0],
        },
        console.log(userdetail.data[0]),
        localStorage.setItem(
          "verified_id",
          JSON.stringify(userdetail.data[0].id)
        )
      )
    );
};

export const requestReset = (email) => (dispatch) => {
  return api
    .post("/authenticate/request-password-reset", { email })
    .then((reset) => {
      if (reset.status === 200) {
        dispatch(
          {
            type: authActions.REQUEST_RESET,
            payload: reset.data,
          },
          Swal.fire({
            icon: "success",
            title: "Request Successful",
            text: "Check email for confirmation",
            showConfirmButton: true,
            timer: 2000,
          }).then(function () {
            window.location.replace("/resetpassword");
          })
        );
      } else {
        Swal.fire({
          icon: "error",
          text: reset.data,
          title: "Request failed",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
};

export const PasswordReset = (id, formData) => (dispatch) => {
  return api.patch(`/users/${id}/reset-password`, formData).then((post) => {
    if (post.status === 200) {
      dispatch(
        {
          type: authActions.PASSWORD_RESET,
          payload: post,
        },
        Swal.fire({
          title: "Password reset successfully",
          text: "Proceed to signin",
          icon: "success",
          timer: 2000,
          showConfirmButton: true,
        }).then(function () {
          window.location.replace("/signin");
        })
      );
    } else {
      Swal.fire({
        icon: "error",
        text: post.data,
        title: "Failed",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};

export const handleChangePassword = (formData) => {
  const { currentPassword, newPassword, newPasswordRepeated } = formData;

  this.props.dispatch({
    type: authActions.CHANGE_PASSWORD__REQUESTED,
    payload: {
      userId: this.props.auth.id,
      currentPassword,
      newPassword,
      newPasswordRepeated,
    },
  });
};
