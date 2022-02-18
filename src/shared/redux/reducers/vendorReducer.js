import { vendorActions } from "../actions/types";

const initialState = {
  vendors: [], ///all fetched
  vendor: {}, ///post
  pagesize: "",
  booksize: "",
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case vendorActions.FETCH_VENDORS_SUCCESS:
      return {
        ...state,
        vendors: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    case vendorActions.ADD_VENDORS_SUCCESS:
      return {
        ...state,
        vendor: action.payload,
      };
    case vendorActions.ADD_VENDOR_CATEGORY:
      return {
        ...state,
        vendor: action.payload,
      };
    case vendorActions.UPDATE_VENDORS_SUCCESS:
      return {
        ...state,
        vendors: state.vendors.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                title: action.payload.title,
                contact: action.payload.contact,
                website: action.payload.website,
                email: action.payload.email,
              }
            : content
        ),
      };
    case vendorActions.DELETE_VENDORS_SUCCESS:
      return {
        ...state,
        vendors: state.vendors.filter((vendor) => vendor.id !== action.payload),
      };
    default:
      return state;
  }
};
export default vendorReducer;
