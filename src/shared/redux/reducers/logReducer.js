import { locationActions, logsActions } from "../actions/types";

const initialState = {
  logs: [],
  log: {},
  pagesize: "",
  booksize: "",
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case logsActions.FETCH_LOGS_SUCCESS:
      return {
        ...state,
        logs: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    default:
      return state;
  }
};
export default logReducer;
