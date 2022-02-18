import { cityActions } from "../actions/types";

const initialState = {
  cities: [],
  city: {},
  pagesize: "",
  booksize: "",
};

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case cityActions.FETCH_CITY_SUCCESS:
      return {
        ...state,
        cities: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    case cityActions.ADD_CITY_SUCCESS:
      return {
        ...state,
        city: action.payload,
      };
    default:
      return state;
  }
};
export default cityReducer;
