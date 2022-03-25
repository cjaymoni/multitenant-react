import { departmentActions } from "../actions/types";

const initialState = {
  departments: [], ///all fetched
  department: {}, ///post
  pagesize: "",
  booksize: "",
  baseDepartments: [],
};

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case departmentActions.FETCH_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    case departmentActions.FETCH_BASE_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        baseDepartments: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case departmentActions.ADD_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        department: action.payload,
      };
    case departmentActions.UPDATE_DEPARTMENTS_SUCCESS:
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
    case departmentActions.DELETE_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: state.departments.filter(
          (department) => department.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default departmentReducer;
