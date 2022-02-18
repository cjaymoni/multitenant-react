import {ADD_INVENTORIES,ADD_TOINVENTORIES,DELETE_FROMINVENTORIES, DELETE_INVENTORIES,FETCH_INVENTORYDETAILS, FETCH_INVENTORIES,FETCH_INVENTORYASSETS, UPDATE_INVENTORIES} from '../actions/types'


const initialState ={
    inventories:[],
    inventory:{},
    invassets:[],
    invdetails:{},
    pagesize:'',
    booksize:''
}

const inventoryReducer = (state = initialState, action)=> {
    switch(action.type){
        case FETCH_INVENTORIES:
            return{
               ...state,
               inventories:action.payload.data,
               pagesize:action.payload.pg_size,
               booksize:action.payload.bk_size 
            } 

        case ADD_INVENTORIES:
      return {
        ...state,
        inventory: action.payload,
      };
      case ADD_TOINVENTORIES:
        return{
          ...state,
          inventory:action.payload
        }
    case UPDATE_INVENTORIES:
      return {
        ...state,
        inventories: state.inventories.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                // id:action.payload.id,
                title: action.payload.title,
                // metatitle: action.payload.metatitle,
                description: action.payload.description,
                // department_name:action.payload.department_name,
                location_id:action.payload.location_id,
                manager_id:action.payload.manager_id
              }
            : content
        ),
      };
    case DELETE_INVENTORIES:
      return {
        ...state,
        inventories: state.inventories.filter(
          (inventory) => inventory.id !== action.payload
        ),
      };
      
      case DELETE_FROMINVENTORIES:
        return {
          ...state,
          invassets: state.invassets.filter((invasset) => invasset.id !== action.payload),
        };
    case FETCH_INVENTORYASSETS:
            return{
                ...state,
                invassets:action.payload.data,
                pagesize:action.payload.pg_size,
                booksize:action.payload.bk_size 
            }
    case FETCH_INVENTORYDETAILS:
            return{
                ...state,
                invdetails:action.payload
            }  
        default:
                return state;
            }
}
export default inventoryReducer;