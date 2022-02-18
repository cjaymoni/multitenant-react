import {
    FETCH_CURRENCIES
 } from '../actions/types';
 
 
 const initialState ={
     
    currencies:[], ///all fetched currencies
    pagesize:'',
    booksize:''
 }
 
 const currencyReducer =(state = initialState, action)=>{
     switch(action.type){
         case FETCH_CURRENCIES:
             return{
                ...state,
                currencies:action.payload.data,
                pagesize:action.payload.pg_size,
                booksize:action.payload.bk_size 
             }
 
         default:
         return state;
             
     }
 }
 export default currencyReducer;