import {
  FETCH_DEPARTMENTS,
  ADD_DEPARTMENTS,
  DELETE_DEPARTMENTS,
  UPDATE_DEPARTMENTS,
} from "../actions/types";

const initialState = {
  departments: [], ///all fetched
  department: {}, ///post
  pagesize:'',
  booksize:''
};

const departmentReducer = (state = initialState, action)=> {
  switch (action.type) {
    case FETCH_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload.data,
        pagesize:action.payload.pg_size,
        booksize:action.payload.bk_size 
      };

    case ADD_DEPARTMENTS:
      return {
        ...state,
        department: action.payload,
      };
    case UPDATE_DEPARTMENTS:
      return {
        ...state,
        departments: state.departments.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                title: action.payload.title,
                location_id: action.payload.location_id,
                manager_id: action.payload.manager_id,
              }
            : content
        ),
      };
    case DELETE_DEPARTMENTS:
      return {
        ...state,
        departments: state.departments.filter(
          (department) => department.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
export default departmentReducer;