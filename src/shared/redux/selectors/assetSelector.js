import { createSelector } from "reselect";

export const selectAsset = (state) => state.assets.assetList;

const selectModel = (state) => state.assets.assetList.model;
const selectMake = (state) => state.assets.assetList.make;

export const selectPod = createSelector(
  selectMake,
  selectModel,
  (make, model) => `${make} ${model}`
);

export const getUpcomingAppointments = createSelector(
  (state) => state.assets.assetList,
  (assetList) => {
    return assetList;
  }
  // assetList.map(asset => {
  //   return `asset :${asset.title}  make : ${asset.make}`;
  // })
);

export const selectItemIds = (state) => {
  return state.assets.assetList.map((item) => item.id);
};
export const makeSelectItemsByCategory = (catName) => {
  const selectItemsByCategory = createSelector(
    [(state) => state.assets.assetList, (state, category) => category],
    (items, category) => items.filter((item) => item.title === catName)
  );
  return selectItemsByCategory;
};
