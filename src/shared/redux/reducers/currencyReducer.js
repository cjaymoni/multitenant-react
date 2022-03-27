import { currencyActions } from "../actions/types";

const initialState = {
  currencies: [], ///all fetched currencies
  pagesize: "",
  booksize: "",
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case currencyActions.FETCH_CURRENCY_SUCCESS:
      return {
        ...state,
        currencies: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    default:
      return state;
  }
};
export default currencyReducer;
