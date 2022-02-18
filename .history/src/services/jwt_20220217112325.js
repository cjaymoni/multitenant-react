import { createBrowserHistory } from "history";
import React from "react";
import Swal from "sweetalert2";
import store from "../redux/store";
import withRouter from "../routes/withRouter";

const CheckToken = () => {
  let isExpired = false;

  let auth_token = store.getState().auth;
  const token = auth_token.jwt;
  var dateNow = new Date();

  if (token.exp < dateNow.getTime()) {
    return (isExpired = true);
  }
};

const AuthVerify = (props) => {
  let history = createBrowserHistory();
  history.listen(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      //   const decodedJwt = parseJwt(user.accessToken);
      if (
        CheckToken
        //   decodedJwt.exp * 1000 < Date.now()
      ) {
        props.logOut();
      }
    }
  });
  return Swal.fire({
    title: "Authentication Token Expired",
    html: "<div>Login</div>",
    icon: "info",
    showConfirmButton: false,
    timer: 3000,
  });
};
export default withRouter(AuthVerify);
