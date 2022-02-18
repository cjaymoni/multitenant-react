import React from "react";
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
  props.history.listen(() => {
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
  return <div></div>;
};
export default withRouter(AuthVerify);
