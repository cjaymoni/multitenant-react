import {
  FETCH_CATEGORIES,
  ADD_CATEGORIES,
  DELETE_CATEGORIES,
  UPDATE_CATEGORIES,
  FETCH_CATEGORYITEMS,
} from "../actions/types";

const initialState = {
  categories: [], ///all fetched
  category: {}, ///post
  categoryitems:[],
  pagesize:'',
    booksize:''
};

const categoryReducer= (state = initialState, action) =>{
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload.data,
        pagesize:action.payload.pg_size,
        booksize:action.payload.bk_size 
      };
      case FETCH_CATEGORYITEMS:
        return {
          ...state,
          categoryitems: action.payload.data,
          pagesize:action.payload.pg_size,
          booksize:action.payload.bk_size 
        };
    case ADD_CATEGORIES:
      return {
        ...state,
        category: action.payload,
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: state.categories.map((content, i) =>
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
    case DELETE_CATEGORIES:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
export default categoryReducer;