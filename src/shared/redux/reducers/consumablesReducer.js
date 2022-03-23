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
        loading: false,
        error: true,
      };
    case consumablesActionTypes.UPDATE_CONSUMABLE:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case consumablesActionTypes.UPDATE_CONSUMABLE_SUCCESS:
      return {
        ...state,
        departments: state.departments.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                title: action.payload.title,
                location_id: action.payload.location_id,
                manager_id: action.payload.manager_id,
              }
            : content
        ),
      };
    case consumablesActionTypes.DELETE_CONSUMABLE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case consumablesActionTypes.DELETE_CONSUMABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default consumableReducer;
