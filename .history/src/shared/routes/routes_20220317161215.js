import About from "../../tenant-app/pages/about";
import Home from "../../tenant-app/pages/home";
import MarketPlace from "../../tenant-app/pages/marketplace";
import Layout from "../layout";
import Asset from "../../tenant-app/pages/Admin/Asset";
import Dashboard from "../../tenant-app/pages/Admin/Dashboard";
import Inventory from "../../tenant-app/pages/Admin/Inventory";
import Recommendation from "../../tenant-app/pages/Admin/Recommendation";
import RequestList from "../../tenant-app/pages/Admin/RequestList";
import Transfer from "../../tenant-app/pages/Admin/Transfer";
import User from "../../tenant-app/pages/Admin/User";
import Category from "../../tenant-app/pages/Admin/Category";
import RequestRecommendation from "../../tenant-app/pages/Staff/RequestRecommendation";
import Request from "../../tenant-app/pages/Staff/Request";
import Department from "../../tenant-app/pages/Admin/Department";
import Vendor from "../../tenant-app/pages/Admin/Vendor";
import Branches from "../../tenant-app/pages/Admin/Branches";
import InventoryInfo from "../../tenant-app/pages/Admin/InventoryInfo";
import StaffDashboard from "../../tenant-app/pages/Staff/Dasboard/index";
import AssetInfo from "../../tenant-app/pages/Admin/AssetInfo";
import AssetForm from "../../tenant-app/pages/Admin/AssetForm";
import Logs from "../../tenant-app/pages/System/SysLogs";
import Tenant from "../../tenant-app/pages/System/Tenant";
import TenantConfig from "../../tenant-app/pages/TenantManager/TenantConfig";
import Aggregation from "../../tenant-app/pages/TenantManager/Aggregation";
import TenantForm from "../../tenant-app/pages/System/TenantForm";
import ForwardedProposals from "../../tenant-app/pages/Procurement/Forwardedproposals";

const routes = [
  {
    element: <Home />,
    path: "/home",
    exact: true,
    layout: Layout,
    name: "Dashboard",
  },

  {
    element: <About />,
    path: "/about",
    exact: true,
    layout: Layout,
    name: "Asset",
  },
  {
    element: <MarketPlace />,
    path: "/market",
    exact: true,
    layout: Layout,
    name: "Market",
  },
  {
    element: <Dashboard />,
    path: "/dashboard",
    exact: true,
    layout: Layout,
    name: "Dashboard",
  },
  {
    element: <StaffDashboard />,
    path: "/staffdashboard",
    exact: true,
    layout: Layout,
    name: "Overview",
  },
  {
    element: <ForwardedProposals />,
    path: "/fore-proposals",
    exact: true,
    layout: Layout,
    name: "Forwarded Proposals",
  },
  {
    element: <Asset />,
    path: "/asset",
    exact: true,
    layout: Layout,
    name: "Asset",
  },
  {
    element: <AssetInfo />,
    path: "/assetinfo",
    exact: true,
    layout: Layout,
    name: "Asset",
  },
  {
    element: <AssetForm />,
    path: "/assetform",
    exact: true,
    layout: Layout,
    name: "Asset",
  },
  {
    element: <TenantForm />,
    path: "/tenantform",
    exact: true,
    layout: Layout,
    name: "Tenant",
  },
  {
    element: <Inventory />,
    path: "/inventory",
    exact: true,
    layout: Layout,
    name: "Inventory",
  },
  {
    element: <Recommendation />,
    path: "/recommendation",
    exact: true,
    layout: Layout,
    name: "Recommendations",
  },
  {
    element: <RequestList />,
    path: "/requestlist",
    exact: true,
    layout: Layout,
    name: "Requests",
  },
  {
    element: <Transfer />,
    path: "/transfer",
    exact: true,
    layout: Layout,
    name: "Transfer",
  },
  {
    element: <InventoryInfo />,
    path: "/inventoryinfo",
    exact: true,
    layout: Layout,
    name: "Inventory",
  },
  {
    element: <Branches />,
    path: "/location",
    exact: true,
    layout: Layout,
    name: Branches,
  },
  {
    element: <Vendor />,
    path: "/vendor",
    exact: true,
    layout: Layout,
    name: "Vendor",
  },
  {
    element: <Department />,
    path: "/department",
    exact: true,
    layout: Layout,
    name: "Department",
  },
  {
    element: <Category />,
    path: "/category",
    exact: true,
    layout: Layout,
    name: "Category",
  },
  {
    element: <Request />,
    path: "/request",
    exact: true,
    layout: Layout,
    name: "Request",
  },
  {
    element: <RequestRecommendation />,
    path: "/requestrecommendation",
    exact: true,
    layout: Layout,
    name: "Recommendation",
  },

  {
    element: <User />,
    path: "/user",
    exact: true,
    layout: Layout,
    name: "User",
  },
  {
    element: <Logs />,
    path: "/logs",
    exact: true,
    layout: Layout,
    name: "Logs",
  },
  {
    element: <Tenant />,
    path: "/tenant",
    exact: true,
    layout: Layout,
    name: "Tenant",
  },
  {
    element: <TenantConfig />,
    path: "/tenant-config",
    exact: true,
    layout: Layout,
    name: "TenantConfig",
  },
  {
    element: <Aggregation />,
    path: "/aggregation",
    exact: true,
    layout: Layout,
    name: `Tenant's Aggregation`,
  },
];

export default routes;
