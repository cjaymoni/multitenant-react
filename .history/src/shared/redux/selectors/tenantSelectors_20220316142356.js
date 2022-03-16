import { createSelector } from "reselect";

export const selectTenantConfig = createSelector(
  (state) => state.tenants.tenantConfig
);

export const makeSelectItemsBySubDomain = (domain) => {
  const selectItemsBySubDomain = createSelector(
    [(state) => state.tenants.tenantConfig, (state, sub_domain) => sub_domain],
    (items, sub_domain) => items.filter((item) => item.sub_domain === domain)
  );
  return selectItemsBySubDomain;
};
