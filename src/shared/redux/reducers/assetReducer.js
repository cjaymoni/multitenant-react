import { assetActionTypes } from "../actions/types";

const initialState = {
  assetList: [], ///all fetched assets
  titems: [],
  noninvassets: [],
  item: {}, ///post asset
  pagesize: "",
  booksize: "",
  available: [],
  assetinfo: {},
};
const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case assetActionTypes.FETCH_ASSETS:
      return {
        ...state,
        loading: true, // this will show the spinner
        error: false,
      };

    case assetActionTypes.FETCH_ASSETS_SUCCESS:
      return {
        ...state,
        assetList: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
        loading: false,
        error: false,
      };
    case assetActionTypes.FETCH_ASSET_BY_ID:
      return {
        ...state,
        assetinfo: action.payload,
      };
    case assetActionTypes.FETCHAVAILABLE_ASSETS:
      return {
        ...state,
        available: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case assetActionTypes.FETCH_ASSETS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default assetReducer;
