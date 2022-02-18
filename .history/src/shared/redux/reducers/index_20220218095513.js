import { combineReducers } from "redux";
import assetReducer from "./assetReducer";
import authReducer from "./authReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,

  whitelist: ["auth", "tenants"],
};
const allReducers = combineReducers({
  assets: assetReducer,
  auth: authReducer,
});

export default persistReducer(persistConfig, allReducers);
