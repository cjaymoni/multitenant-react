import { envActions } from "../actions/types";

const initialState = {
  configurations: {}, ///all fetched
  configuration: {}, ///post
};

const configurationReducer = (state = initialState, action) => {
  switch (action.type) {
    case envActions.FETCH_ENV_CONFIG_SUCCESS:
      return {
        ...state,
        configurations: action.payload,
      };

    case envActions.ADD_ENV_CONFIG_SUCCESS:
      return {
        ...state,
        configuration: action.payload,
      };
    case envActions.UPDATE_ENV_CONFIG_SUCCESS:
      return {
        ...state,
        configurations: state.configurations.map((content, i) =>
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
    case envActions.DELETE_ENV_CONFIG_SUCCESS:
      return {
        ...state,
        configurations: state.configurations.filter(
          (configuration) => configuration.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default configurationReducer;
