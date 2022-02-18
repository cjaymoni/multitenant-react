import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import persistReducer from "../reducers/index";
const initialState = {};

const middleware = [thunk];

//  const store = createStore(persistReducer,
//   initialState, applyMiddleware(thunk));

const store = createStore(
  persistReducer,
  initialState,

  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export const persistor = persistStore(store);

export default store;
