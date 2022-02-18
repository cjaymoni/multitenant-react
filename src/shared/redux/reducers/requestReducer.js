import { requestActions } from "../actions/types";

const initialState = {
  requests: [],
  request: {},
  userrequests: [],
  departmentrequests: [],
  pagesize: "",
  booksize: "",
  userpagesize: "",
  userbooksize: "",
  useraccept: "",
  userdecline: "",
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case requestActions.FETCH_REQUEST_SUCCESS:
      return {
        ...state,
        requests: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case requestActions.FETCH_USER_REQUEST:
      return {
        ...state,
        userrequests: action.payload.data,
        userpagesize: action.payload.pg_size,
        userbooksize: action.payload.bk_size,
        useraccept: action.payload.data.filter((m) => m.action === "accepted"),
        userdecline: action.payload.data.filter((m) => m.action === "declined"),
      };
    case requestActions.FETCH_DEPARTMENT_REQUEST:
      return {
        ...state,
        departmentrequests: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case requestActions.ISSUE_REQUEST_SUCCESS:
      return {
        ...state,
        request: action.payload,
      };
    case requestActions.UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        requests: state.requests.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                action: action.payload.action,
                pickup_date: action.payload.pickup_date,
                return_date: action.payload.return_date,
                status: action.payload.status,
                justification: action.payload.justification,
              }
            : content
        ),
      };

    case requestActions.DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        requests: state.requests.filter(
          (request) => request.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default requestReducer;
