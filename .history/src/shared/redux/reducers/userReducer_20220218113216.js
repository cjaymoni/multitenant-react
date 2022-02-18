import {
    ADD_USERS,
    BULK_INSERT,
    DELETE_USERS,
   FETCHBY_USERID,
   FETCH_DEPARTMENTUSERS,
   FETCH_ROLES,
   FETCH_USERS, UPDATE_USERS
} from '../actions/types';


const initialState ={
    
    users:[], ///all fetched users
    user:{},
    roles:[],
    bulk:[],
    departmentusers:[],
    userdetail:{},
    pagesize:'',
    booksize:''

}

const userReducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_USERS:
            return{
               ...state,
               users:action.payload.data,
               pagesize:action.payload.pg_size,
               booksize:action.payload.bk_size  
            };
        case FETCHBY_USERID:
              return{
                 ...state,
                 userdetail:action.payload
              };
        case FETCH_ROLES:
              return{
                 ...state,
                 roles:action.payload.data 
              };
        case FETCH_DEPARTMENTUSERS:
              return{
                ...state,
                departmentusers:action.payload.data,
                pagesize:action.payload.pg_size,
                booksize:action.payload.bk_size 

              }
      
    case ADD_USERS:
        return {
          ...state,
          user: action.payload,
        };
        case BULK_INSERT:
          return {
            ...state,
            bulk: action.payload,
          };
      case UPDATE_USERS:
        return {
          ...state,
          users: state.users.map((content, i) =>
            content.id === action.payload.id
              ? {
                  ...content,
                  id:action.payload.id,
                  first_name: action.payload.first_name,
                  last_name: action.payload.last_name,
                  middle_name: action.payload.middle_name,
                  phone: action.payload.phone,
                  role: action.payload.role,
                  email: action.payload.email
                }
              : content
          ),
        };
      case DELETE_USERS:
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.payload),
        };
      default:
        return state;
    } 
}

export default userReducer;