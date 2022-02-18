import { inventoryActions } from "../actions/types";

const initialState = {
  inventories: [],
  inventory: {},
  invassets: [],
  invdetails: {},
  pagesize: "",
  booksize: "",
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case inventoryActions.FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        inventories: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    case inventoryActions.ADD_INVENTORY_SUCCESS:
      return {
        ...state,
        inventory: action.payload,
      };
    case inventoryActions.ADD_TO_INVENTORY:
      return {
        ...state,
        inventory: action.payload,
      };
    case inventoryActions.UPDATE_INVENTORY_SUCCESS:
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
                location_id: action.payload.location_id,
                manager_id: action.payload.manager_id,
              }
            : content
        ),
      };
    case inventoryActions.DELETE_INVENTORY_SUCCESS:
      return {
        ...state,
        inventories: state.inventories.filter(
          (inventory) => inventory.id !== action.payload
        ),
      };

    case inventoryActions.DELETE_FROM_INVENTORY:
      return {
        ...state,
        invassets: state.invassets.filter(
          (invasset) => invasset.id !== action.payload
        ),
      };
    case inventoryActions.FETCH_INVENTORY_ASSETS:
      return {
        ...state,
        invassets: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case inventoryActions.FETCH_INVENTORY_DETAILS:
      return {
        ...state,
        invdetails: action.payload,
      };
    default:
      return state;
  }
};
export default inventoryReducer;
