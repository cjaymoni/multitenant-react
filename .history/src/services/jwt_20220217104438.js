import store from "../redux/store";

export function CheckToken() {
  let isExpired = false;

  let auth_token = store.getState().auth;
  const token = auth_token.jwt;
  var dateNow = new Date();

  if (token.exp < dateNow.getTime()) {
    return (isExpired = true), console.log("expired");
  }
  return <></>;
}
