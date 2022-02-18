import { FETCH_COUNTRIES, UPDATE_COUNTRY, DELETE_COUNTRY, ADD_COUNTRY } from "../actions/types";


const initialState = {
    countries:[],
    country:{},
    pagesize:'',
    booksize:''
}


const countryReducer =(state = initialState, action)=>{
    switch(action.type){
        case FETCH_COUNTRIES:
            return{
               ...state,
               countries:action.payload.data,
               pagesize:action.payload.pg_size,
               booksize:action.payload.bk_size  
            }
            
        case ADD_COUNTRY:
            return{
                ...state,
              country:action.payload
            }
        default:
             return state
}
}
export default countryReducer;