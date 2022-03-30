import { subscriptionPackageActions } from "../actions/types";

const initialState = {
  subscriptionPackages: [], ///all fetched
  subscriptionPackage: {}, ///post
  pagesize: "",
  booksize: "",
};

const subscriptionPackageReducer = (state = initialState, action) => {
  switch (action.type) {
    case subscriptionPackageActions.FETCH_SUBSCRIPTION_PACKAGE_SUCCESS:
      return {
        ...state,
        subscriptionPackages: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
      };

    case subscriptionPackageActions.ADD_SUBSCRIPTION_PACKAGE_SUCCESS:
      return {
        ...state,
        subscriptionPackage: action.payload,
      };
    case subscriptionPackageActions.UPDATE_SUBSCRIPTION_PACKAGE_SUCCESS:
      return {
        ...state,
        subscriptionPackages: state.subscriptionPackages.map((content, i) =>
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
    case subscriptionPackageActions.DELETE_SUBSCRIPTION_PACKAGE_SUCCESS:
      return {
        ...state,
        subscriptionPackages: state.subscriptionPackages.filter(
          (subscriptionPackage) => subscriptionPackage.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default subscriptionPackageReducer;
