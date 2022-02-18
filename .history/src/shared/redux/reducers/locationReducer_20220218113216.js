import {
  FETCH_LOCATION,
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
  FETCH_DEPARTMENTLOCATION
} from "../actions/types";

const initialState = {
  locations: [], ///all fetched
  location: {},///post
  departmentlocations:[] ,
  pagesize:'',
    booksize:''
};

const locationReducer =(state = initialState, action)=> {
  switch (action.type) {
    case FETCH_LOCATION:
      return {
        ...state,
        locations: action.payload.data,
        pagesize:action.payload.pg_size,
        booksize:action.payload.bk_size 
      };
      case FETCH_DEPARTMENTLOCATION:
        return {
          ...state,
          departmentlocations: action.payload.data,
          pagesize:action.payload.pg_size,
          booksize:action.payload.bk_size 
        };
  
    case ADD_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        locations: state.locations.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                title: action.payload.title,
                status:action.payload.status,
                city_id:action.payload.city_id
              }
            : content
        ),
      };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          (location) => location.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
export default locationReducer;