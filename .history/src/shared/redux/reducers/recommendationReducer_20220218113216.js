import {ADD_RECOMMENDATIONS, DELETE_RECOMMENDATIONS, FETCH_DEPARTMENTRECOMMENDATIONS, FETCH_PRIORITIES, FETCH_RECOMMENDATIONS, FETCH_USERRECOMMENDATIONS, UPDATE_RECOMMENDATIONS} from '../actions/types'

const initialState ={
    recommedations:[],
    recommendation:{},
    userrecommendations:[],
    departmentrecommendations:[],
    priorities:[],
    pagesize:'',
    booksize:'',
    delivered:'',
    useraccept:'',
    userdecline:''
}

const recommendationReducer =(state = initialState, action)=>{
    switch(action.type){
        case FETCH_RECOMMENDATIONS:
            return{
               ...state,
               recommendations:action.payload.data,
               pagesize:action.payload.pg_size,
               booksize:action.payload.bk_size ,
               delivered:action.payload.data.filter(m=>m.status ==='delivered')
 
            }
            case FETCH_USERRECOMMENDATIONS:
              return{
                 ...state,
                 userrecommendations:action.payload.data,
                 pagesize:action.payload.pg_size,
               booksize:action.payload.bk_size,
               userdecline:action.payload.data.filter(m=>m.status ==='declined'),
               useraccept:action.payload.data.filter(m=>m.status ==='accepted')

  
              }
              case FETCH_DEPARTMENTRECOMMENDATIONS:
                return{
                   ...state,
                   departmentrecommendations:action.payload.data,
                   pagesize:action.payload.pg_size,
                   booksize:action.payload.bk_size,
                   delivered:action.payload.data.filter(m=>m.status ==='delivered')
              
                   }
              case FETCH_PRIORITIES:
                return{
                   ...state,
                   priorities:action.payload.data 
                }
    
  

    case ADD_RECOMMENDATIONS:
        return {
          ...state,
          recommendation: action.payload,
        };
      case UPDATE_RECOMMENDATIONS:
        return {
          ...state,
          recommedations: state.recommedations.map((content, i) =>
            content.id === action.payload.id
              ? {
                  ...content,
                  justification: action.payload.justification,
                  inventory_id: action.payload.inventory_id ,
                  status:action.payload.status
                  // department_name: action.payload.department_name,
                //   author_name:action.payload.author_name,
                }
              : content
          ),
        };
      case DELETE_RECOMMENDATIONS:
        return {
          ...state,
          recommendations: state.recommedations.filter((recommendation) => recommendation.id !== action.payload),
        };
        default:
        return state

    }
}
export default recommendationReducer;