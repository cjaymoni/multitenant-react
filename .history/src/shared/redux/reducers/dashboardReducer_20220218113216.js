import { FETCH_DASH_DATA } from "../actions/types";



const initialState ={
    
    dashitems:[], ///all fetched assets
   
    pagesize:'',
    booksize:'',
  
}
const dashboardReducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_DASH_DATA:
            return{
               ...state,
               dashitems:action.payload,
           
            //    available:action.payload.data.filter(m=>m.available) 
            }
        default:
            return state;
        
    }
}

export default dashboardReducer;