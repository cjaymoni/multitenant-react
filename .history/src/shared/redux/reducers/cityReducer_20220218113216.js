import {FETCH_CITIES,UPDATE_CITY,ADD_CITY,DELETE_CITY} from '../actions/types'


const initialState = {
    cities:[],
    city:{},
    pagesize:'',
    booksize:''
}


const cityReducer=(state = initialState, action)=>{
    switch(action.type){
        case FETCH_CITIES:
            return{
               ...state,
               cities:action.payload.data,
               pagesize:action.payload.pg_size,
               booksize:action.payload.bk_size  
            }
            
        case ADD_CITY:
            return{
                ...state,
              city:action.payload
            }
        default:
             return state
}
}
export default cityReducer;