import api from "../../services/api";
import { dashboardActions } from "./types";

export const fetchDashData = () => (dispatch) => {
  return api
    .get("/dashboard")
    .then((res) => res.data)
    .then((dashbord) =>
      dispatch({
        type: dashboardActions.FETCH_DASH_SUCCESS,
        payload: dashbord,
      })
    );
};
