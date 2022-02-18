import { dashboardActions } from "../actions/types";

const initialState = {
  dashitems: [], ///all fetched assets

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
    default:
      return state;
  }
};

export default dashboardReducer;
