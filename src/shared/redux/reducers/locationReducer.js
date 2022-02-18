import { locationActions } from "../actions/types";

const initialState = {
  locations: [], ///all fetched
  location: {}, ///post
  departmentlocations: [],
  pagesize: "",
  booksize: "",
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case locationActions.FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        locations: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case locationActions.FETCH_DEPARTMENT_LOCATION:
      return {
        ...state,
        departmentlocations: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    case locationActions.ADD_LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload,
      };
    case locationActions.UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        locations: state.locations.map((content, i) =>
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
    case locationActions.DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        locations: state.locations.filter(
          (location) => location.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default locationReducer;
