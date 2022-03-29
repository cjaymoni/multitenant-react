import { tenantActions } from "../actions/types";

const initialState = {
  tenants: [], ///all fetched
  tenant: {}, ///post
  tenantitems: [],
  tenantConfig: {},
  tenantScheme: "",
  pagesize: "",
  booksize: "",
};

const tenantReducer = (state = initialState, action) => {
  switch (action.type) {
    case tenantActions.FETCH_TENANT_SUCCESS:
      return {
        ...state,
        tenants: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case tenantActions.FETCH_TENANT_CONFIG:
      localStorage.setItem("tenantId", action.payload.data[0].scheme);

      return {
        ...state,
        tenantConfig: action.payload.data[0],
        tenantScheme: action.payload.data[0].scheme,
      };

    case tenantActions.ADD_TENANT_SUCCESS:
      return {
        ...state,
        tenant: action.payload,
      };
    case tenantActions.UPDATE_TENANT_SUCCESS:
      return {
        ...state,
        tenants: state.tenants.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
              }
            : content
        ),
      };
    case tenantActions.DELETE_TENANT_SUCCESS:
      return {
        ...state,
        tenants: state.tenants.filter((tenant) => tenant.id !== action.payload),
      };
    default:
      return state;
  }
};
export default tenantReducer;
