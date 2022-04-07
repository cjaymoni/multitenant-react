import { roleActions, userActions } from "../actions/types";

const initialState = {
  users: [], ///all fetched users
  admins: [],
  user: {},
  roles: [],
  bulk: [],
  departmentusers: [],
  userdetail: {},
  pagesize: "",
  booksize: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case userActions.FETCH_ADMINS_SUCCESS:
      return {
        ...state,
        admins: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case userActions.FETCH_BY_USERID:
      return {
        ...state,
        userdetail: action.payload,
      };
    case roleActions.FETCH_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload.data,
      };
    case userActions.FETCH_DEPARTMENT_USERS:
      return {
        ...state,
        departmentusers: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    case userActions.ADD_USERS_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case userActions.BULK_INSERT:
      return {
        ...state,
        bulk: action.payload,
      };
    case userActions.UPDATE_USERS_SUCCESS:
      return {
        ...state,
        users: state.users.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                id: action.payload.id,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                middle_name: action.payload.middle_name,
                phone: action.payload.phone,
                role: action.payload.role,
                email: action.payload.email,
              }
            : content
        ),
      };
    case userActions.DELETE_USERS_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
