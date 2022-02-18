import store from "../redux/store";

export function CheckToken() {
  let isExpired = false;

  let auth_token = store.getState().auth;
  const token = auth_token.jwt;
  var dateNow = new Date();

  if (token.exp < dateNow.getTime()) {
    return (isExpired = true), console.log(isExpired);
  }
}
// const AuthVerify = (props) => {
//   props.history.listen(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       const decodedJwt = parseJwt(user.accessToken);
//       if (decodedJwt.exp * 1000 < Date.now()) {
//         props.logOut();
//       }
//     }
//   });
//   return <div></div>;
// };
// export default withRouter(AuthVerify);
