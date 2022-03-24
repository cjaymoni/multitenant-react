import { consumablesActionTypes } from "../actions/types";

const initialState = {
  consumableList: [], ///all fetched assets

  consumable: {}, ///post asset
  pagesize: "",
  booksize: "",
  consumableInfo: {},
};
const consumableReducer = (state = initialState, action) => {
  switch (action.type) {
    case consumablesActionTypes.FETCH_CONSUMABLES:
      return {
        ...state,
        loading: true, // this will show the spinner
        error: false,
      };
    case consumablesActionTypes.ADD_CONSUMABLE_SUCCESS:
      return {
        ...state,
        consumable: action.payload,
      };
    case consumablesActionTypes.FETCH_CONSUMABLES_SUCCESS:
      return {
        ...state,
        consumableList: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
        loading: false,
        error: false,
      };

    case consumablesActionTypes.FETCH_CONSUMABLES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case consumablesActionTypes.FETCH_CONSUMABLE_BY_ID:
      return {
        ...state,
        consumableInfo: action.payload,
        loading: false,
      };
    case consumablesActionTypes.UPDATE_CONSUMABLE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case consumablesActionTypes.UPDATE_CONSUMABLE_SUCCESS:
      return {
        ...state,
        consumableList: state.consumableList.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                title: action.payload.title,
                quantity: action.payload.quantity,
                inventory_id: action.payload.inventory_id,
                description: action.payload.description,
                unit_price: action.payload.unit_price,
              }
            : content
        ),
      };
    case consumablesActionTypes.DELETE_CONSUMABLE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case consumablesActionTypes.DELETE_CONSUMABLE_SUCCESS:
      return {
        ...state,
        consumableList: state.consumableList.filter(
          (consumable) => consumable.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default consumableReducer;
