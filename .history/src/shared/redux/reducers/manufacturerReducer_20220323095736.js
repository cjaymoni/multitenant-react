import { manufacturerActions } from "../actions/types";

const initialState = {
  manufacturers: [], ///all fetched
  manufacturer: {}, ///post
  pagesize: "",
  booksize: "",
};

const manufacturerReducer = (state = initialState, action) => {
  switch (action.type) {
    case manufacturerActions.FETCH_MANUFACTURERS_SUCCESS:
      return {
        ...state,
        manufacturers: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    case manufacturerActions.ADD_MANUFACTURERS_SUCCESS:
      return {
        ...state,
        manufacturer: action.payload,
      };
    case manufacturerActions.UPDATE_MANUFACTURERS_SUCCESS:
      return {
        ...state,
        manufacturers: state.manufacturers.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                title: action.payload.title,
                status: action.payload.status,
                city_id: action.payload.city_id,
              }
            : content
        ),
      };
    case manufacturerActions.DELETE_MANUFACTURERS_SUCCESS:
      return {
        ...state,
        manufacturers: state.manufacturers.filter(
          (manufacturer) => manufacturer.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default manufacturerReducer;
