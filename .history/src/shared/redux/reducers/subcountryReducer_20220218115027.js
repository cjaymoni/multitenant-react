import { subCountryActions } from "../actions/types";

const initialState = {
  subcountries: [],
  subcountry: {},
  pagesize: "",
  booksize: "",
};

const subcountryReducer = (state = initialState, action) => {
  switch (action.type) {
    case subCountryActions.FETCH_SUBCOUNTRY_SUCCESS:
      return {
        ...state,
        subcountries: action.payload,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    case subCountryActions.ADD_SUBCOUNTRY_SUCCESS:
      return {
        ...state,
        subcountry: action.payload,
      };
    default:
      return state;
  }
};
export default subcountryReducer;
