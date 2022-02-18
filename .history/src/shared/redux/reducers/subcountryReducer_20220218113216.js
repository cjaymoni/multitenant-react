import {FETCH_SUBCOUNTRIES, UPDATE_SUBCOUNTRY,ADD_SUBCOUNTRY,DELETE_SUBCOUNTRY} from '../actions/types'



const initialState = {
    subcountries:[],
    subcountry:{},
    pagesize:'',
    booksize:''
}


const subcountryReducer =(state = initialState, action)=>{
    switch(action.type){
        case FETCH_SUBCOUNTRIES:
            return{
               ...state,
               subcountries:action.payload,
               pagesize:action.payload.pg_size,
               booksize:action.payload.bk_size  
            }
            
        case ADD_SUBCOUNTRY:
            return{
                ...state,
              subcountry:action.payload
            }
        default:
             return state
}
}
export default subcountryReducer;