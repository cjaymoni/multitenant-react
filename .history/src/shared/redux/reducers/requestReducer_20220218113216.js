import {FETCH_REQUESTS, UPDATE_REQUEST, ISSUE_REQUEST, DELETE_REQUEST, FETCH_USERREQUESTS, FETCH_DEPARTMENTREQUESTS} from '../actions/types'

const initialState ={
    requests:[],
    request:{},
    userrequests:[],
    departmentrequests:[],
    pagesize:'',
    booksize:'',
    userpagesize:'',
    userbooksize:'',
    useraccept:'',
    userdecline:''
}

const requestReducer =(state = initialState, action)=>{
    switch(action.type){
        case FETCH_REQUESTS:
            return{
               ...state,
               requests:action.payload.data,
               pagesize:action.payload.pg_size,
               booksize:action.payload.bk_size  
            }
            case FETCH_USERREQUESTS:
                return{
                   ...state,
                   userrequests:action.payload.data,
                   userpagesize:action.payload.pg_size,
                   userbooksize:action.payload.bk_size,
                   useraccept:action.payload.data.filter(m=>m.action ==='accepted'),
                   userdecline:action.payload.data.filter(m=>m.action ==='declined')

 
                }
                case FETCH_DEPARTMENTREQUESTS:
                    return{
                       ...state,
                       departmentrequests:action.payload.data,
                       pagesize:action.payload.pg_size,
                       booksize:action.payload.bk_size  
                    }
        case ISSUE_REQUEST:
            return{
                ...state,
                request:action.payload
            }
        case UPDATE_REQUEST:
            return{
                ...state,
                requests: state.requests.map(
                    (content, i) => content.id === action.payload.id ?
                     {...content, 
                        action : action.payload.action,
                        pickup_date: action.payload.pickup_date,
                        return_date : action.payload.return_date,
                        status : action.payload.status,
                        justification : action.payload.justification,
                        }
                        : content)
            };

            case DELETE_REQUEST:
                return {
                  ...state,
                  requests: state.requests.filter((request) => request.id !== action.payload),
                };
              default:
                return state;
            
    

    }
}
export default requestReducer;