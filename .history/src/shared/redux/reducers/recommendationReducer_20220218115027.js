import { priorityActions, recommendationActions } from "../actions/types";

const initialState = {
  recommedations: [],
  recommendation: {},
  userrecommendations: [],
  departmentrecommendations: [],
  priorities: [],
  pagesize: "",
  booksize: "",
  delivered: "",
  useraccept: "",
  userdecline: "",
};

const recommendationReducer = (state = initialState, action) => {
  switch (action.type) {
    case recommendationActions.FETCH_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        recommendations: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
        delivered: action.payload.data.filter((m) => m.status === "delivered"),
      };
    case recommendationActions.FETCH_USER_RECOMMENDATION:
      return {
        ...state,
        userrecommendations: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
        userdecline: action.payload.data.filter((m) => m.status === "declined"),
        useraccept: action.payload.data.filter((m) => m.status === "accepted"),
      };
    case recommendationActions.FETCH_DEPARTMENT_RECOMMENDATION:
      return {
        ...state,
        departmentrecommendations: action.payload.data,
        pagesize: action.payload.pg_size,
        booksize: action.payload.bk_size,
        delivered: action.payload.data.filter((m) => m.status === "delivered"),
      };
    case priorityActions.FETCH_PRIORITY_SUCCESS:
      return {
        ...state,
        priorities: action.payload.data,
      };

    case recommendationActions.ADD_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        recommendation: action.payload,
      };
    case recommendationActions.UPDATE_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        recommedations: state.recommedations.map((content, i) =>
          content.id === action.payload.id
            ? {
                ...content,
                justification: action.payload.justification,
                inventory_id: action.payload.inventory_id,
                status: action.payload.status,
                // department_name: action.payload.department_name,
                //   author_name:action.payload.author_name,
              }
            : content
        ),
      };
    case recommendationActions.DELETE_RECOMMENDATION_SUCCESS:
      return {
        ...state,
        recommendations: state.recommedations.filter(
          (recommendation) => recommendation.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default recommendationReducer;
