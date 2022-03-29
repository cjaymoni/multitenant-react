/* eslint-disable no-underscore-dangle */
import { Ability, AbilityBuilder } from "@casl/ability";
import store from "../redux/store";

// Defines how to detect object's type
function subjectName(item) {
  if (!item || typeof item === "string") {
    return item;
  }
  return item.__type;
}

const ability = new Ability([], { subjectName });

store.subscribe(() => {
  let auth = store.getState().auth;
  ability.update(defineRulesFor(auth));
});

const defineRulesFor = (auth) => {
  const permissions = auth.role;
  const { can, rules } = new AbilityBuilder();
  switch (permissions) {
    case "Facility Manager":
      can("view", "NotiBell");
      can("view", "Dashboard");
      can("edit", "Dashboard");
      can("view", "Asset");
      can("info", "Asset");
      can("assign", "Asset");
      can("view", "AssetInfo");
      can("info", "AssetInfo");

      can("disable", "Asset");
      can("info", "Categories");
      can("view", "Inventories");
      can("info", "Inventories");
      can("edit", "Inventories");
      can("disable", "Inventories");
      can("add", "Inventories");
      can("view", "Department");
      can("add", "Department");
      can("edit", "Department");
      can("info", "Department");
      can("disable", "Department");
      can("info", "Branches");
      can("view", "Branches");
      can("edit", "Branches");
      can("add", "Branches");
      can("disable", "Branches");
      can("info", "Request");
      can("view", "Transfer");
      can("edit", "Transfer");
      can("disable", "Transfer");
      can("info", "Transfer");
      can("add", "Transfer");
      can("edit", "User");
      can("disable", "User");
      can("add", "User");
      can("view", "User");
      can("view", "Consumables");
      can("info", "Consumables");
      can("assign", "Consumables");

      break;

    case "Staff":
      can("view", "Overview");
      can("view", "Request");
      can("edit", "Request");
      can("cancel", "Request");
      can("add", "Request");
      can("view", "Recommendation");
      can("edit", "Recommendation");
      can("cancel", "Recommendation");
      can("add", "Recommendation");
      can("view", "AssetInfo");
      can("info", "Asset");
      can("info", "AssetInfo");

      break;

    case "Store Manager":
      can("view", "NotiBell");
      can("view", "PendingS");
      can("view", "Dashboard");
      can("edit", "Dashboard");
      can("view", "Asset");
      can("info", "Asset");
      can("edit", "Asset");
      can("assign", "Asset");
      can("add", "Asset");
      can("view", "AssetForm");

      can("view", "Categories");
      can("info", "Categories");
      can("edit", "Categories");
      can("disable", "Categories");
      can("add", "Categories");
      can("view", "Inventories");
      can("info", "Inventories");
      can("info", "Department");
      can("view", "Department");
      can("info", "Suppliers");
      can("view", "Suppliers");
      can("edit", "Suppliers");
      can("disable", "Suppliers");
      can("add", "Suppliers");
      can("info", "Branches");
      // can("view", "Branches");
      can("edit", "Branches");
      can("disable", "Branches");
      can("add", "Branches");
      can("info", "Request");
      can("view", "Requests");
      can("edit", "Request");
      can("ready", "Request");
      can("end", "Request");
      can("disable", "Request");
      can("add", "Request");
      can("view", "Transfer");
      can("info", "Transfer");
      can("info", "Recommendation");
      can("view", "Recommendations");
      can("disable", "Recommendation");
      can("deliver", "Recommendation");
      // can("view", "Logs");
      // can("view", "Tenant");
      // can("add", "Tenant");
      can("view", "AssetInfo");
      can("info", "AssetInfo");
      can("sub", "Request");
      can("sub", "Recommendation");
      can("view", "Consumables");
      can("info", "Consumables");
      can("edit", "Consumables");
      can("assign", "Consumables");
      can("add", "Consumables");
      break;

    case "Head of Department":
      can("view", "NotiBell");
      can("view", "PendingH");
      can("view", "Dashboard");
      can("view", "Asset");
      can("info", "Asset");
      can("info", "Department");
      can("info", "Suppliers");
      can("info", "Branches");
      can("info", "Request");
      can("view", "Requests");
      can("edit", "Request");
      can("verify", "Request");
      can("cancel", "Request");
      can("issue", "Request");
      can("add", "Request");

      can("view", "Recommendations");
      can("info", "Recommendation");
      can("edit", "Recommendation");
      can("cancel", "Recommendation");
      can("add", "Recommendation");
      // can("view", "User");
      can("info", "User");
      can("view", "AssetInfo");
      can("info", "AssetInfo");
      can("view", "Consumables");
      can("info", "Consumables");

      break;

    case "Head of Entity":
      can("view", "NotiBell");
      can("view", "Dashboard");
      can("edit", "Dashboard");
      can("view", "Asset");
      can("view", "Categories");
      can("view", "Inventories");
      can("view", "Department");
      can("view", "Suppliers");
      can("view", "Branches");
      can("view", "Request");
      can("view", "Transfer");
      can("view", "Recommendations");
      can("view", "User");
      can("info", "User");
      can("info", "Transfer");
      can("info", "Branches");
      can("info", "Request");
      can("info", "Suppliers");
      can("info", "Department");
      can("info", "Asset");
      can("info", "Inventories");
      can("info", "Categories");
      can("view", "AssetInfo");
      can("info", "AssetInfo");
      can("view", "Consumables");
      can("info", "Consumables");

      break;

    case "Tenant Administrator":
      can("view", "NotiBell");
      can("view", "Dashboard");
      can("edit", "Dashboard");
      can("info", "Dashboard");
      can("delete", "Dashboard");
      can("add", "Dashboard");
      can("view", "Asset");
      can("info", "Asset");
      can("edit", "Asset");
      can("delete", "Asset");
      can("assign", "Asset");
      can("add", "Asset");
      can("add", "Inventory");
      can("view", "AssetForm");

      can("view", "Inventory");
      can("info", "Inventory");
      can("edit", "Inventory");
      can("delete", "Inventory");
      can("assign", "Inventory");
      can("view", "Category");
      can("info", "Category");
      can("edit", "Category");
      can("delete", "Category");
      can("add", "Categories");
      can("view", "Inventories");
      can("info", "Inventories");
      can("add", "Inventories");
      can("edit", "Inventories");
      can("delete", "Inventories");
      can("info", "Department");
      can("view", "Department");
      can("edit", "Department");
      can("delete", "Department");
      can("add", "Department");
      can("info", "Suppliers");
      can("view", "Suppliers");
      can("edit", "Suppliers");
      can("delete", "Suppliers");
      can("add", "Suppliers");
      can("info", "Branches");
      can("view", "Branches");
      can("edit", "Branches");
      can("delete", "Branches");
      can("add", "Branches");
      can("info", "Request");
      can("view", "Requests");
      can("edit", "Request");
      can("delete", "Request");
      can("add", "Request");
      can("view", "Transfer");
      can("info", "Transfer");
      can("add", "Transfer");
      can("edit", "Transfer");
      can("delete", "Transfer");
      can("info", "Recommendation");
      can("view", "Recommendations");
      can("edit", "Recommendation");
      can("delete", "Recommendation");
      can("add", "Recommendation");
      can("info", "Users");
      can("add", "Users");
      can("view", "Users");
      can("edit", "Users");
      can("delete", "Users");
      can("view", "Consumables");
      can("info", "Consumables");
      can("edit", "Consumables");
      can("assign", "Consumables");
      can("add", "Consumables");
      can("view", "Tenant Config");
      can("info", "Tenant Config");
      can("edit", "Tenant Config");
      can("assign", "Tenant Config");
      can("add", "Tenant Config");
      can("view", "Forwarded Proposals");
      can("info", "Forwarded Proposals");
      can("edit", "Forwarded Proposals");
      can("assign", "Forwarded Proposals");
      can("add", "Forwarded Proposals");
      can("view", "Manufacturers");
      can("info", "Manufacturers");
      can("edit", "Manufacturers");
      can("assign", "Manufacturers");
      can("add", "Manufacturers");
      break;

    case "Systems":
      can("view", "Overview");
      can("view", "Logs");
      break;

    case "Tenant Manager":
      can("view", "NotiBell");
      can("view", "Dashboard");
      can("edit", "Dashboard");
      can("info", "Dashboard");
      can("delete", "Dashboard");
      can("add", "Dashboard");
      can("view", "Configuration");
      can("edit", "Configuration");
      can("delete", "Configuration");
      can("add", "Configuration");
      can("info", "Branches");
      can("view", "Branches");
      can("edit", "Branches");
      can("delete", "Branches");
      can("add", "Branches");
      can("info", "User");
      can("add", "User");
      can("view", "User");
      can("edit", "User");
      can("delete", "User");
      // can('view', `Forwarded Proposals`);
      can("view", "Logs");
      // can("view", "Tenant");
      can("add", "Tenant");
      can("view", "TenantConfig");
      can("view", `Tenant's Aggregation`);
      can("view", "Tenant");

      break;

    case "Procurement Officer":
      can("view", "Procurement Dashboard");
      can("view", "Dashboard");
      can("view", "Asset");
      can("info", "Asset");
      can("info", `Forwarded Proposals`);
      can("view", `Forwarded Proposals`);
      can("info", "Recommendation");
      can("edit", "Recommendation");
      can("buy", "Recommendation");
      can("disable", "Recommendation");
      can("view", "AssetInfo");
      can("info", "AssetInfo");

      break;

    default:
      can("view", "Dashboard");
  }

  return rules;
};

export default ability;
