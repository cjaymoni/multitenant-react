import api from "../../services/api";
import { logsActions } from "./types";

export const fetchLogs = (type) => (dispatch) => {
  return api
    .get(`/logs/${type}`)
    .then((res) => res.data)
    .then((logs) =>
      dispatch({
        type: logsActions.FETCH_LOGS_SUCCESS,
        payload: logs,
      })
    );
};
