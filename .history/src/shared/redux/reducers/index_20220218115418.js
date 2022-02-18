import { combineReducers } from "redux";
import assetReducer from "./assetReducer";
import categoryReducer from "./categoryReducer";
import departmentReducer from "./departmentReducer";
import inventoryReducer from "./inventoryReducer";
import recommendationReducer from "./recommendationReducer";
import requestReducer from "./requestReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import vendorReducer from "./vendorReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import currencyReducer from "./currencyReducer";
import countryReducer from "./countryReducer";
import subcountryReducer from "./subcountryReducer";
import cityReducer from "./cityReducer";
import locationReducer from "./locationReducer";
import tenantReducer from "./tenantReducer";
import dashboardReducer from "./dashboardReducer";

const persistConfig = {
  key: "root",
  storage,

  whitelist: ["auth", "tenants"],
};
const allReducers = combineReducers({
  assets: assetReducer,
  categories: categoryReducer,
  inventories: inventoryReducer,
  requests: requestReducer,
  recommendations: recommendationReducer,
  users: userReducer,
  departments: departmentReducer,
  vendors: vendorReducer,
  auth: authReducer,
  countries: countryReducer,
  subcountries: subcountryReducer,
  cities: cityReducer,
  locations: locationReducer,
  tenants: tenantReducer,
  dashboard: dashboardReducer,
});

export default persistReducer(persistConfig, allReducers);
