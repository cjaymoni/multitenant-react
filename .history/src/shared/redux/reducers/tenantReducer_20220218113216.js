import {
    FETCH_TENANTS,
    ADD_TENANTS,
    DELETE_TENANTS,
    UPDATE_TENANTS,
    FETCH_TENANT_CONFIG,
  } from "../actions/types";
  
  const initialState = {
    tenants: [], ///all fetched
    tenant: {}, ///post
    tenantitems:[],
    tenantConfig:{},
    pagesize:'',
      booksize:''
  };
  
  const tenantReducer= (state = initialState, action) =>{
    switch (action.type) {
      case FETCH_TENANTS:
        return {
          ...state,
          tenants: action.payload.data,
          pagesize:action.payload.pg_size,
          booksize:action.payload.bk_size 
        };
      case FETCH_TENANT_CONFIG:
        return{
          ...state,
          tenantConfig:action.payload.data
        }
    
      case ADD_TENANTS:
        return {
          ...state,
          tenant: action.payload,
        };
      case UPDATE_TENANTS:
        return {
          ...state,
          tenants: state.tenants.map((content, i) =>
            content.id === action.payload.id
              ? {
                  ...content,
                  id:action.payload.id,
                  title: action.payload.title,
                  description:action.payload.description
                }
              : content
          ),
        };
      case DELETE_TENANTS:
        return {
          ...state,
          tenants: state.tenants.filter(
            (tenant) => tenant.id !== action.payload
          ),
        };
      default:
        return state;
    }
  }
  export default tenantReducer;