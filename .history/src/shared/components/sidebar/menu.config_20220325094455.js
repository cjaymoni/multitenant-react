import { PrimeIcons } from "primereact/api";

export const sideMenu = [
  {
    label: "Dashboard",
    Icon: <i className="pi pi-home" />,
    to: "/dashboard",
  },
  {
    label: "Asset",
    to: "/asset",
    Icon: <i className="pi pi-shopping-cart" />,
    children: [
      {
        label: "New ",
        to: "/assetform",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Asset List",
        to: "/asset",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Consumables",
    to: "/consumables",
    Icon: <i className="pi pi-palette" />,

    children: [
      {
        label: "New ",
        to: "/consum-form",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Consumables List",
        to: "/consumables",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },
  {
    label: "Inventory",
    to: "/inventory",
    Icon: <i className="pi pi-table" />,

    children: [
      {
        label: "New",
        to: "/inventory",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Inventory List",
        to: "/inventory",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Requests",
    to: "/requestlist",
    Icon: <i className="pi pi-ticket" />,

    children: [
      {
        label: "New",
        to: "/requestlist",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Requests List",
        to: "/request-list",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Request",
    to: "/request",
    Icon: <i className="pi pi-tag" />,

    children: [
      {
        label: "New",
        to: "/request",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Request List",
        to: "/request",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Category",
    to: "/category",
    Icon: <i className="pi pi-star" />,

    children: [
      {
        label: "New",
        to: "/category",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Categories List",
        to: "/category",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Department",
    to: "/base-department",
    Icon: <i className="pi pi-building" />,

    children: [
      {
        label: "Base Departments List",
        to: "/base-department",
        Icon: <i className="pi pi-list" />,
      },
      {
        label: "Branch Department List",
        to: "/branch-department",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Suppliers",
    to: "/vendor",
    Icon: <i className="fa fa-truck" />,

    children: [
      {
        label: "New",
        to: "/vendor",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Suppliers List",
        to: "/vendor",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Manufacturers",
    to: "/manufacturers",
    Icon: <i className="fa fa-truck" />,

    children: [
      {
        label: "New",
        to: "/manufacturers",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Manufacturers List",
        to: "/manufacturers",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },
  {
    label: "Branches",
    to: "/location",
    Icon: <i className="pi pi-map-marker" />,

    children: [
      {
        label: "New",
        to: "/location",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Branches List",
        to: "/location",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Tenant",
    to: "/tenant",
    Icon: <i className="pi pi-users" />,

    children: [
      {
        label: "New",
        to: "/tenant",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Tenant List",
        to: "/tenant",
        Icon: <i className="pi pi-plus" />,
      },
    ],
  },

  {
    label: "Tenant Config",
    to: "/tenant-config",
    Icon: <i className="pi pi-cog" />,

    children: [
      {
        label: "Edit Configuration",
        to: "/tenant-config",
        Icon: <i className="pi pi-pencil" />,
      },
      {
        label: "Tenant Aggregations",
        to: "/aggregation",
        Icon: <i className="fa fa-anchor" />,
      },
      {
        label: "Logs",
        to: "/logs",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Transfer",
    to: "/transfer",
    Icon: <i className="pi pi-sign-out" />,

    children: [
      {
        label: "New",
        to: "/transfer",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Transfer List",
        to: "/transfer",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Recommendations",
    to: "/recommendation",
    Icon: <i className="pi pi-lock-open" />,

    children: [
      {
        label: "New",
        to: "/recommendation",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Recommendations List",
        to: "/recommendation",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Recommendation",
    to: "/requestrecommendation",
    Icon: <i className="pi pi-unlock" />,

    children: [
      {
        label: "New",
        to: "/requestrecommendation",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Recommendation List",
        to: "/requestrecommendation",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Users",
    to: "/user",
    Icon: <i className="pi pi-users" />,

    children: [
      {
        label: "New",
        to: "/user",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Users List",
        to: "/user",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    label: "Forwarded Proposals",
    to: "/fore-proposals",
    Icon: <i className="pi pi-tag" />,

    children: [
      {
        label: "New",
        to: "/fore-proposals",
        Icon: <i className="pi pi-plus" />,
      },
      {
        label: "Asset List",
        to: "/fore-proposals",
        Icon: <i className="pi pi-list" />,
      },
    ],
  },
];
