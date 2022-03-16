import { createSelector } from "reselect";

export const selectTenantConfig = (state) => state.tenants.tenantConfig;

export const makeSelectItemsBySubDomain = (domain) => {
  const selectItemsBySubDomain = createSelector(
    [(state) => state.enants.tenantConfig, (state, sub_domain) => sub_domain],
    (items, sub_domain) => items.filter((item) => item.sub_domain === domain)
  );
  return selectItemsBySubDomain;
};
