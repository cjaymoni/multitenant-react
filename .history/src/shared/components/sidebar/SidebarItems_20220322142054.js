const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <i className="pi pi-home" />,
  },

  {
    title: "Asset",
    path: "/asset",
    icon: <i className="pi pi-shopping-cart" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New ",
        path: "/assetform",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Asset List",
        path: "/asset",
        icon: <i className="pi pi-list" />,
      },
    ],
  },
  {
    title: "Consumables",
    path: "/consumables",
    icon: <i className="pi pi-palette" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New ",
        path: "/consum-form",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Consumables List",
        path: "/consumables",
        icon: <i className="pi pi-list" />,
      },
    ],
  },
  {
    title: "Inventory",
    path: "/inventory",
    icon: <i className="pi pi-table" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New",
        path: "/inventory",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Inventory List",
        path: "/inventory",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Requests",
    path: "/requestlist",
    icon: <i className="pi pi-ticket" />,

    subNav: [
      {
        title: "New",
        path: "/requestlist",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Requests List",
        path: "/request-list",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Request",
    path: "/request",
    icon: <i className="pi pi-tag" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New",
        path: "/request",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Request List",
        path: "/request",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Category",
    path: "/category",
    icon: <i className="pi pi-star" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New",
        path: "/category",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Categories List",
        path: "/category",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Department",
    path: "/bse-department",
    icon: <i className="pi pi-building" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "Base Departments List",
        path: "/base-department",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Branch Department List",
        path: "/branch-department",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Suppliers",
    path: "/vendor",
    icon: <i className="fa fa-truck" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New",
        path: "/vendor",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Suppliers List",
        path: "/vendor",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Branches",
    path: "/location",
    icon: <i className="pi pi-map-marker" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New",
        path: "/location",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Branches List",
        path: "/location",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Tenant",
    path: "/tenant",
    icon: <i className="pi pi-users" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New",
        path: "/tenant",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Tenant List",
        path: "/tenant",
        icon: <i className="pi pi-plus" />,
      },
    ],
  },

  {
    title: "Tenant Config",
    path: "/tenant-config",
    icon: <i className="pi pi-cog" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "Edit Configuration",
        path: "/tenant-config",
        icon: <i className="pi pi-pencil" />,
      },
      {
        title: "Tenant Aggregations",
        path: "/aggregation",
        icon: <i className="fa fa-anchor" />,
      },
      {
        title: "Logs",
        path: "/logs",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Transfer",
    path: "/transfer",
    icon: <i className="pi pi-sign-out" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New",
        path: "/transfer",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Transfer List",
        path: "/transfer",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Recommendations",
    path: "/recommendation",
    icon: <i className="pi pi-lock-open" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New",
        path: "/recommendation",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Recommendations List",
        path: "/recommendation",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Recommendation",
    path: "/requestrecommendation",
    icon: <i className="pi pi-unlock" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New",
        path: "/requestrecommendation",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Recommendation List",
        path: "/requestrecommendation",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Users",
    path: "/user",
    icon: <i className="pi pi-users" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New",
        path: "/user",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Users List",
        path: "/user",
        icon: <i className="pi pi-list" />,
      },
    ],
  },

  {
    title: "Forwarded Proposals",
    path: "/fore-proposals",
    icon: <i className="pi pi-tag" />,
    // iconClosed: <i className="pi pi-angle-down" />,
    // iconOpened: <i className="pi pi-angle-up" />,

    subNav: [
      {
        title: "New",
        path: "/fore-proposals",
        icon: <i className="pi pi-plus" />,
      },
      {
        title: "Asset List",
        path: "/fore-proposals",
        icon: <i className="pi pi-list" />,
      },
    ],
  },
];

export default SidebarData;
