import { combineReducers } from "redux";
import assetReducer from "./assetReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";

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
