import { categoryActions } from "../actions/types";

const initialState = {
  categories: [], ///all fetched
  category: {}, ///post
  categoryitems: [],
  categotyAssets: [],
  categoryVendors: [],
  categoryConsumables: [],

  categoryDetails: {},
  pagesize: "",
  booksize: "",
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryActions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case categoryActions.FETCH_CATEGORY_ASSETS:
      return {
        ...state,
        categotyAssets: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case categoryActions.FETCH_CATEGORY_CONSUMABLES:
      return {
        ...state,
        categotyAssets: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case categoryActions.FETCH_CATEGORY_DETAILS:
      return {
        ...state,
        categoryDetails: action.payload,
      };
    case categoryActions.FETCH_CATEGORY_VENDORS:
      return {
        ...state,
        categoryVendors: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case categoryActions.FETCH_CATEGORY_ITEMS:
      return {
        ...state,
        categoryitems: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };
    case categoryActions.ADD_CATEGORIES_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };
    case categoryActions.UPDATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((content, i) =>
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
    case categoryActions.ADD_CATEGORY_ASSET:
      return {
        ...state,
        category: action.payload,
      };
    case categoryActions.ADD_CATEGORY_CONSUMABLE:
      return {
        ...state,
        category: action.payload,
      };
    case categoryActions.ADD_CATEGORY_VENDOR:
      return {
        ...state,
        category: action.payload,
      };
    case categoryActions.REMOVE_CATEGORY_ASSET:
      return {
        ...state,
        category: action.payload,
      };
    case categoryActions.REMOVE_CATEGORY_CONSUMABLE:
      return {
        ...state,
        category: action.payload,
      };
    case categoryActions.REMOVE_CATEGORY_VENDOR:
      return {
        ...state,
        category: action.payload,
      };
    case categoryActions.DELETE_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default categoryReducer;
