import { dashboardActions, reportActions } from "../actions/types";

const initialState = {
  dashitems: [], ///all fetched assets
  report: [],
  pagesize: "",
  booksize: "",
};
const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardActions.FETCH_DASH_SUCCESS:
      return {
        ...state,
        dashitems: action.payload,

        //    available:action.payload.data.filter(m=>m.available)
      };
    case reportActions.FETCH_REPORT_SUCCESS:
      return {
        ...state,
        report: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
