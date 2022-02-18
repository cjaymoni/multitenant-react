import {
  FETCH_VENDORS,
  ADD_VENDORS,
  DELETE_VENDORS,
  UPDATE_VENDORS,
  ADDVEN_CATEGORY
} from "../actions/types";

const initialState = {
  vendors: [], ///all fetched
  vendor: {}, ///post
  pagesize:'',
    booksize:''
};

const vendorReducer = (state = initialState, action) =>{
  switch (action.type) {
    case FETCH_VENDORS:
      return {
        ...state,
        vendors: action.payload.data,
        pagesize:action.payload.pg_size,
        booksize:action.payload.bk_size 
      };

    case ADD_VENDORS:
      return {
        ...state,
        vendor: action.payload,
      };
      case ADDVEN_CATEGORY:
        return{
          ...state,
          vendor:action.payload
        }
    case UPDATE_VENDORS:
      return {
        ...state,
        vendors: state.vendors.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                title: action.payload.title,
                contact:action.payload.contact,
                website:action.payload.website,
                email:action.payload.email
              }
            : content
        ),
      };
    case DELETE_VENDORS:
      return {
        ...state,
        vendors: state.vendors.filter((vendor) => vendor.id !== action.payload),
      };
    default:
      return state;
  }
}
export default vendorReducer;