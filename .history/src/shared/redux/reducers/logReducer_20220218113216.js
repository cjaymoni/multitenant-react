import {FETCH_LOGS} from '../actions/types'


const initialState = {
    logs:[],
    log:{},
    pagesize:'',
    booksize:''
}


const logReducer=(state = initialState, action)=>{
    switch(action.type){
        case FETCH_LOGS:
            return{
               ...state,
               logs:action.payload.data,
               pagesize:action.payload.pg_size,
               booksize:action.payload.bk_size  
            }

        default:
             return state
}
}
export default logReducer;