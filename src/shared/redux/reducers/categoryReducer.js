import { categoryActions } from "../actions/types";

const initialState = {
  categories: [], ///all fetched
  category: {}, ///post
  categoryitems: [],
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
