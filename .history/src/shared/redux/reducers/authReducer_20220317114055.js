import { authActions } from "../actions/types";
import reduxReset from "redux-reset";
import jwt_decode from "jwt-decode";

//let user = JSON.parse(localStorage.getItem("user"));

// const initialState = user ? { loggedIn: true, user } : {};
const initialState = {
  user: {},
  role: null,
  isAuthenticated: null,
  user_id: "",
  requestReset: {},
  passwordReset: {},
  verifieddata: {},
  testingdata: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.payload.user, // this will show the spinner
        error: false,
      };
    case authActions.LOGIN_SUCCESS:
      localStorage.setItem("login", JSON.stringify(action.payload.user));
      localStorage.setItem(
        "role",
        JSON.stringify(action.payload.user.role.title)
      );
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user_id", JSON.stringify(action.payload.user.id));
      localStorage.setItem(
        "department_id",
        JSON.stringify(action.payload.user.department_id)
      );

      return {
        loggedIn: true,
        user: { ...action.payload.user },
        isAuthenticated: true,
        role: action.payload.user.role.title,
        user_id: action.payload.user.id,
        jwt: jwt_decode(action.payload.access_token),
        error: false,
      };
    case authActions.LOGIN_ERROR:
      // console.log(action.payload);
      return {
        loggedIn: false,
        error: action.payload,
      };
    case authActions.LOGOUT:
      return {
        reduxReset,
      };
    default:
      return state;
  }
};

export default authReducer;
