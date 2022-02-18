import { countryActions } from "../actions/types";

const initialState = {
  countries: [],
  country: {},
  pagesize: "",
  booksize: "",
};

const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case countryActions.FETCH_COUNTRY_SUCCESS:
      return {
        ...state,
        countries: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    case countryActions.ADD_COUNTRY_SUCCESS:
      return {
        ...state,
        country: action.payload,
      };
    default:
      return state;
  }
};
export default countryReducer;
