import { subscriptionActions } from "../actions/types";

const initialState = {
  subscriptions: [], ///all fetched
  subscription: {}, ///post
  pagesize: "",
  booksize: "",
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case subscriptionActions.FETCH_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    case subscriptionActions.ADD_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscription: action.payload,
      };
    case subscriptionActions.UPDATE_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: state.subscriptions.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                title: action.payload.title,
                status: action.payload.status,
                city_id: action.payload.city_id,
              }
            : content
        ),
      };
    case subscriptionActions.DELETE_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          (subscription) => subscription.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default subscriptionReducer;
