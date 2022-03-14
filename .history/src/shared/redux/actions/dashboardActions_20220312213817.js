import api from "../../services/api";
import { dashboardActions, reportActions } from "./types";

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

export const generateReport = (postData) => (dispatch) => {
  return api
    .post("/dashboard/reports", postData)
    .then((res) => res.data)
    .then((report) =>
      dispatch({ type: reportActions.FETCH_REPORT_SUCCESS, payload: report })
    );
};
