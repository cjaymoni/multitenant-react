/* eslint-disable no-underscore-dangle */
import { Ability, AbilityBuilder } from "@casl/ability";
import store from "../redux/store/index";
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
  // console.log(auth);
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
      // can("edit", "Asset");
      can("assign", "Asset");
      can("disable", "Asset");
      can("info", "Category");
      can("view", "Inventory");
      can("info", "Inventory");
      can("edit", "Inventory");
      can("disable", "Inventory");
      can("add", "Inventory");
      can("view", "Department");
      can("add", "Department");
      can("edit", "Department");
      can("info", "Department");
      can("disable", "Department");
      can("info", "Location");
      can("view", "Location");
      can("edit", "Location");
      can("add", "Location");
      can("disable", "Location");
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
      can("view", "TenantConfig");
      can("view", `Tenant's Aggregation`);
      can("view", "Tenant");

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
      can("view", "Category");
      can("info", "Category");
      can("edit", "Category");
      can("disable", "Category");
      can("add", "Category");
      can("view", "Inventory");
      can("info", "Inventory");
      can("info", "Department");
      can("view", "Department");
      can("info", "Vendor");
      can("view", "Vendor");
      can("edit", "Vendor");
      can("disable", "Vendor");
      can("add", "Vendor");
      can("info", "Location");
      // can("view", "Location");
      can("edit", "Location");
      can("disable", "Location");
      can("add", "Location");
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

      break;

    case "Head of Department":
      can("view", "NotiBell");
      can("view", "PendingH");
      can("view", "Dashboard");
      can("view", "Asset");
      can("info", "Asset");
      can("info", "Department");
      can("info", "Vendor");
      can("info", "Location");
      can("info", "Request");
      can("view", "Requests");
      can("edit", "Request");
      can("verify", "Request");
      can("cancel", "Request");
      can("issue", "Request");
      can("add", "Request");
      can("view", "Transfer");
      can("info", "Transfer");
      can("view", "Recommendations");
      can("info", "Recommendation");
      can("edit", "Recommendation");
      can("cancel", "Recommendation");
      can("add", "Recommendation");
      // can("view", "User");
      can("info", "User");
      can("view", `Forwarded Proposals`);

      break;

    case "Head of Entity":
      can("view", "NotiBell");
      can("view", "Dashboard");
      can("edit", "Dashboard");
      can("view", "Asset");
      can("view", "Category");
      can("view", "Inventory");
      can("view", "Department");
      can("view", "Vendor");
      can("view", "Location");
      can("view", "Request");
      can("view", "Transfer");
      can("view", "Recommendations");
      can("view", "User");
      can("info", "User");
      can("info", "Transfer");
      can("info", "Location");
      can("info", "Request");
      can("info", "Vendor");
      can("info", "Department");
      can("info", "Asset");
      can("info", "Inventory");
      can("info", "Category");
      break;

    case "Company Admin":
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
      can("view", "Category");
      can("info", "Category");
      can("edit", "Category");
      can("delete", "Category");
      can("add", "Category");
      can("view", "Inventory");
      can("info", "Inventory");
      can("add", "Inventory");
      can("edit", "Inventory");
      can("delete", "Inventory");
      can("info", "Department");
      can("view", "Department");
      can("edit", "Department");
      can("delete", "Department");
      can("add", "Department");
      can("info", "Vendor");
      can("view", "Vendor");
      can("edit", "Vendor");
      can("delete", "Vendor");
      can("add", "Vendor");
      can("info", "Location");
      can("view", "Location");
      can("edit", "Location");
      can("delete", "Location");
      can("add", "Location");
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
      can("info", "User");
      can("add", "User");
      can("view", "User");
      can("edit", "User");
      can("delete", "User");
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
      can("info", "Location");
      can("view", "Location");
      can("edit", "Location");
      can("delete", "Location");
      can("add", "Location");
      can("info", "User");
      can("add", "User");
      can("view", "User");
      can("edit", "User");
      can("delete", "User");
      break;

    case "Procurement Officer":
      can("view", "Procurement Dashboard");
      can("view", "Asset");
      can("info", "Asset");
      can("info", `Forwarded Proposals`);
      can("view", `Forwarded Proposals`);

      break;

    default:
      can("view", "Dashboard");
  }

  return rules;
};

export default ability;
