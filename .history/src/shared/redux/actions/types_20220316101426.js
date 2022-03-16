export const assetActionTypes = Object.freeze({
  FETCH_ASSETS: "FETCH_ASSETS",
  FETCH_ASSETS_SUCCESS: "FETCH_ASSETS_SUCCESS",
  FETCH_ASSETS_ERROR: "FETCH_ASSETS_ERROR",
  FETCHAVAILABLE_ASSETS: "FETCHAVAILABLE_ASSETS",
  FETCHNON_INVASSETS: "FETCHNON_INVASSETS",
  FETCH_ASSET_BY_ID: "FETCH_ASSET_BY_ID",
  FETCHDECOMMISSION_ASSETS: "FETCHDECOMMISSION_ASSETS",
  ADD_ASSET: "ADD_ASSET",
  ADD_ASSET_SUCCESS: "ADD_ASSET_SUCCESS",
  UPDATE_ASSET: "UPDATE_ASSET",
  UPDATE_ASSET_SUCCESS: "UPDATE_ASSET_SUCCESS",
  DELETE_ASSET: "DELETE_ASSET",
  DELETE_ASSET_SUCCESS: "DELETE_ASSET_SUCCESS",
});

export const authActions = Object.freeze({
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGOUT: "LOGOUT",
  REQUEST_RESET: "REQUEST_RESET",
  PASSWORD_RESET: "PASSWORD_RESET",
  VERIFY_EMAIL: "VERIFY_EMAIL",
  CHANGE_PASSWORD__REQUESTED: "CHANGE_PASSWORD__REQUESTED",
});

export const categoryActions = Object.freeze({
  FETCH_CATEGORIES: "FETCH_CATEGORIES",
  FETCH_CATEGORIES_SUCCESS: "FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_ERROR: "FETCH_CATEGORIES_ERROR",
  FETCH_CATEGORY_ITEMS: "FETCH_CATEGORY_ITEMS",
  ADD_CATEGORIES: "ADD_CATEGORIES",
  ADD_CATEGORIES_SUCCESS: "ADD_CATEGORIES_SUCCESS",
  UPDATE_CATEGORIES: "UPDATE_CATEGORIES",
  UPDATE_CATEGORIES_SUCCESS: "UPDATE_CATEGORIES_SUCCESS",
  DELETE_CATEGORIES: "DELETE_CATEGORIES",
  DELETE_CATEGORIES_SUCCESS: "DELETE_CATEGORIES_SUCCESS",
});

export const departmentActions = Object.freeze({
  FETCH_DEPARTMENTS: "FETCH_DEPARTMENTS",
  FETCH_DEPARTMENTS_SUCCESS: "FETCH_DEPARTMENTS_SUCCESS",
  FETCH_DEPARTMENTS_ERROR: "FETCH_DEPARTMENTS_ERROR",
  ADD_DEPARTMENTS: "ADD_DEPARTMENTS",
  ADD_DEPARTMENTS_SUCCESS: "ADD_DEPARTMENTS_SUCCESS",
  UPDATE_DEPARTMENTS: "UPDATE_DEPARTMENTS",
  UPDATE_DEPARTMENTS_SUCCESS: "UPDATE_DEPARTMENTS_SUCCESS",
  DELETE_DEPARTMENTS: "DELETE_DEPARTMENTS",
  DELETE_DEPARTMENTS_SUCCESS: "DELETE_DEPARTMENTS_SUCCESS",
});

export const vendorActions = Object.freeze({
  FETCH_VENDORS: "FETCH_VENDORS",
  FETCH_VENDORS_SUCCESS: "FETCH_VENDORS_SUCCESS",
  FETCH_VENDORS_ERROR: "FETCH_VENDORS_ERROR",
  ADD_VENDORS: "ADD_VENDORS",
  ADD_VENDOR_CATEGORY: "ADD_VENDOR_CATEGORY",
  ADD_VENDORS_SUCCESS: "ADD_VENDORS_SUCCESS",
  UPDATE_VENDORS: "UPDATE_VENDORS",
  UPDATE_VENDORS_SUCCESS: "UPDATE_VENDORS_SUCCESS",
  DELETE_VENDORS: "DELETE_VENDORS",
  DELETE_VENDORS_SUCCESS: "DELETE_VENDORS_SUCCESS",
});

export const locationActions = Object.freeze({
  FETCH_LOCATION: "FETCH_LOCATION",
  FETCH_LOCATION_SUCCESS: "FETCH_LOCATION_SUCCESS",
  FETCH_LOCATION_ERROR: "FETCH_LOCATION_ERROR",
  FETCH_DEPARTMENT_LOCATION: "FETCH_DEPARTMENT_LOCATION",
  ADD_LOCATION: "ADD_LOCATION",
  ADD_LOCATION_SUCCESS: "ADD_LOCATION_SUCCESS",
  UPDATE_LOCATION: "UPDATE_LOCATION",
  UPDATE_LOCATION_SUCCESS: "UPDATE_LOCATION_SUCCESS",
  DELETE_LOCATION: "DELETE_LOCATION",
  DELETE_LOCATION_SUCCESS: "DELETE_LOCATION_SUCCESS",
});

export const inventoryActions = Object.freeze({
  FETCH_INVENTORY: "FETCH_INVENTORY",
  FETCH_INVENTORY_SUCCESS: "FETCH_INVENTORY_SUCCESS",
  FETCH_INVENTORY_ERROR: "FETCH_INVENTORY_ERROR",
  FETCH_INVENTORY_DETAILS: "FETCH_INVENTORY_DETAILS",
  FETCH_INVENTORY_ASSETS: "FETCH_INVENTORY_ASSETS",
  ADD_INVENTORY: "ADD_INVENTORY",
  ADD_INVENTORY_SUCCESS: "ADD_INVENTORY_SUCCESS",
  ADD_TO_INVENTORY: "ADD_TO_INVENTORY",
  UPDATE_INVENTORY: "UPDATE_INVENTORY",
  UPDATE_INVENTORY_SUCCESS: "UPDATE_INVENTORY_SUCCESS",
  DELETE_INVENTORY: "DELETE_INVENTORY",
  DELETE_INVENTORY_SUCCESS: "DELETE_INVENTORY_SUCCESS",
  DELETE_FROM_INVENTORY: "DELETE_FROM_INVENTORY",
});

export const requestActions = Object.freeze({
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_REQUEST_SUCCESS: "FETCH_REQUEST_SUCCESS",
  FETCH_REQUEST_ERROR: "FETCH_REQUEST_ERROR",
  FETCH_USER_REQUEST: "FETCH_USER_REQUEST",
  FETCH_DEPARTMENT_REQUEST: "FETCH_DEPARTMENT_REQUEST",
  ISSUE_REQUEST: "ISSUE_REQUEST",
  ISSUE_REQUEST_SUCCESS: "ISSUE_REQUEST_SUCCESS",
  UPDATE_REQUEST: "UPDATE_REQUEST",
  UPDATE_REQUEST_SUCCESS: "UPDATE_REQUEST_SUCCESS",
  DELETE_REQUEST: "DELETE_REQUEST",
  DELETE_REQUEST_SUCCESS: "DELETE_REQUEST_SUCCESS",
});

export const recommendationActions = Object.freeze({
  FETCH_RECOMMENDATION: "FETCH_RECOMMENDATION",
  FETCH_RECOMMENDATION_SUCCESS: "FETCH_RECOMMENDATION_SUCCESS",
  FETCH_RECOMMENDATION_ERROR: "FETCH_RECOMMENDATION_ERROR",
  FETCH_DEPARTMENT_RECOMMENDATION: "FETCH_DEPARTMENT_RECOMMENDATION",
  FETCH_USER_RECOMMENDATION: "FETCH_USER_RECOMMENDATION",
  ADD_RECOMMENDATION: "ADD_RECOMMENDATION",
  ADD_RECOMMENDATION_SUCCESS: "ADD_RECOMMENDATION_SUCCESS",
  UPDATE_RECOMMENDATION: "UPDATE_RECOMMENDATION",
  UPDATE_RECOMMENDATION_SUCCESS: "UPDATE_RECOMMENDATION_SUCCESS",
  DELETE_RECOMMENDATION: "DELETE_RECOMMENDATION",
  DELETE_RECOMMENDATION_SUCCESS: "DELETE_RECOMMENDATION_SUCCESS",
});

export const priorityActions = Object.freeze({
  FETCH_PRIORITY: "FETCH_PRIORITY",
  FETCH_PRIORITY_SUCCESS: "FETCH_PRIORITY_SUCCESS",
  FETCH_PRIORITY_ERROR: "FETCH_PRIORITY_ERROR",
});

export const roleActions = Object.freeze({
  FETCH_ROLES: "FETCH_ROLES",
  FETCH_ROLES_SUCCESS: "FETCH_ROLES_SUCCESS",
  FETCH_ROLES_ERROR: "FETCH_ROLES_ERROR",
});

export const userActions = Object.freeze({
  FETCH_USERS: "FETCH_USERS",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR: "FETCH_USERS_ERROR",
  FETCH_BY_USERID: "FETCH_BY_USERID",
  FETCH_DEPARTMENT_USERS: "FETCH_DEPARTMENT_USERS",
  ADD_USERS: "ADD_USERS",
  ADD_USERS_SUCCESS: "ADD_USERS_SUCCESS",
  BULK_INSERT: "BULK_INSERT",
  UPDATE_USERS: "UPDATE_USERS",
  UPDATE_USERS_SUCCESS: "UPDATE_USERS_SUCCESS",
  DELETE_USERS: "DELETE_USERS",
  DELETE_USERS_SUCCESS: "DELETE_USERS_SUCCESS",
});

export const countryActions = Object.freeze({
  FETCH_COUNTRY: "FETCH_COUNTRY",
  FETCH_COUNTRY_SUCCESS: "FETCH_COUNTRY_SUCCESS",
  FETCH_COUNTRY_ERROR: "FETCH_COUNTRY_ERROR",
  ADD_COUNTRY: "ADD_COUNTRY",
  ADD_COUNTRY_SUCCESS: "ADD_COUNTRY_SUCCESS",
  UPDATE_COUNTRY: "UPDATE_COUNTRY",
  UPDATE_COUNTRY_SUCCESS: "UPDATE_COUNTRY_SUCCESS",
  DELETE_COUNTRY: "DELETE_COUNTRY",
  DELETE_COUNTRY_SUCCESS: "DELETE_COUNTRY_SUCCESS",
});

export const subCountryActions = Object.freeze({
  FETCH_SUBCOUNTRY: "FETCH_SUBCOUNTRY",
  FETCH_SUBCOUNTRY_SUCCESS: "FETCH_SUBCOUNTRY_SUCCESS",
  FETCH_SUBCOUNTRY_ERROR: "FETCH_SUBCOUNTRY_ERROR",
  ADD_SUBCOUNTRY: "ADD_SUBCOUNTRY",
  ADD_SUBCOUNTRY_SUCCESS: "ADD_SUBCOUNTRY_SUCCESS",
  UPDATE_SUBCOUNTRY: "UPDATE_SUBCOUNTRY",
  UPDATE_SUBCOUNTRY_SUCCESS: "UPDATE_SUBCOUNTRY_SUCCESS",
  DELETE_SUBCOUNTRY: "DELETE_SUBCOUNTRY",
  DELETE_SUBCOUNTRY_SUCCESS: "DELETE_SUBCOUNTRY_SUCCESS",
});

export const cityActions = Object.freeze({
  FETCH_CITY: "FETCH_CITY",
  FETCH_CITY_SUCCESS: "FETCH_CITY_SUCCESS",
  FETCH_CITY_ERROR: "FETCH_CITY_ERROR",
  ADD_CITY: "ADD_CITY",
  ADD_CITY_SUCCESS: "ADD_CITY_SUCCESS",
  UPDATE_CITY: "UPDATE_CITY",
  UPDATE_CITY_SUCCESS: "UPDATE_CITY_SUCCESS",
  DELETE_CITY: "DELETE_CITY",
  DELETE_CITY_SUCCESS: "DELETE_CITY_SUCCESS",
});

export const tenantActions = Object.freeze({
  FETCH_TENANT: "FETCH_TENANT",
  FETCH_TENANT_SUCCESS: "FETCH_TENANT_SUCCESS",
  FETCH_TENANT_ERROR: "FETCH_TENANT_ERROR",
  FETCH_TENANT_CONFIG: "FETCH_TENANT_CONFIG",
  FETCH_TENANT_CONFIG_SUCCESS: "FETCH_TENANT_CONFIG_SUCCESS",
  FETCH_TENANT_CONFIG_ERROR: "FETCH_TENANT_CONFIG_ERROR",
  ADD_TENANT: "ADD_TENANT",
  ADD_TENANT_SUCCESS: "ADD_TENANT_SUCCESS",
  UPDATE_TENANT: "UPDATE_TENANT",
  UPDATE_TENANT_SUCCESS: "UPDATE_TENANT_SUCCESS",
  DELETE_TENANT: "DELETE_TENANT",
  DELETE_TENANT_SUCCESS: "DELETE_TENANT_SUCCESS",
});

export const dashboardActions = Object.freeze({
  FETCH_DASH: "FETCH_DASH",
  FETCH_DASH_SUCCESS: "FETCH_DASH_SUCCESS",
  FETCH_DASH_ERROR: "FETCH_DASH_ERROR",
});

export const reportActions = Object.freeze({
  FETCH_REPORT: "FETCH_REPORT",
  FETCH_REPORT_SUCCESS: "FETCH_REPORT_SUCCESS",
  FETCH_REPORT_ERROR: "FETCH_REPORT_ERROR",
});

export const logsActions = Object.freeze({
  FETCH_LOGS: "FETCH_LOGS",
  FETCH_LOGS_SUCCESS: "FETCH_LOGS_SUCCESS",
  FETCH_LOGS_ERROR: "FETCH_LOGS_ERROR",
});

export const transferAction = Object.freeze({
  TRANSFER_ASSET: "TRANSFER_ASSET",
  TRANSFER_ASSET_SUCCESS: "TRANSFER_ASSET_SUCCESS",
  TRANSFER_ASSET_ERROR: "TRANSFER_ASSET_ERROR",
  TRANSFER_INVENTORY: "TRANSFER_INVENTORY",
  TRANSFER_INVENTORY_SUCCESS: "TRANSFER_INVENTORY_SUCCESS",
  TRANSFER_INVENTORY_ERROR: "TRANSFER_INVENTORY_ERROR",
});
