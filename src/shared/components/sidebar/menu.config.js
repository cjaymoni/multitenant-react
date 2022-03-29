export const sideMenu = [
  {
    label: "Dashboard",
    Icon: <i className="pi pi-home text-xl mr-3 text-white" />,
    to: "/dashboard",
  },
  {
    label: "Asset",
    to: "/asset",
    Icon: <i className="pi pi-shopping-cart text-xl mr-3 text-white" />,
    children: [
      {
        name: "AssetForm",
        label: "New ",
        to: "/assetform",
        Icon: <i className="pi pi-plus text-xl mr-3 text-white" />,
      },
      {
        name: "Asset",
        label: "Asset List",
        to: "/asset",
        Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
      },
    ],
  },

  {
    label: "Consumables",
    to: "/consumables",
    Icon: <i className="pi pi-palette text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Consumables List",
    //     to: "/consumables",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },
  {
    label: "Inventory",
    to: "/inventory",
    Icon: <i className="pi pi-table text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Inventory List",
    //     to: "/inventory",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },

  {
    label: "Requests",
    to: "/requestlist",
    Icon: <i className="pi pi-ticket text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Requests List",
    //     to: "/request-list",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },

  {
    label: "Request",
    to: "/request",
    Icon: <i className="pi pi-tag text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Request List",
    //     to: "/request",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },

  {
    label: "Category",
    to: "/category",
    Icon: <i className="pi pi-star text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Categories List",
    //     to: "/category",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },

  {
    label: "Department",
    to: "/base-department",
    Icon: <i className="pi pi-building text-xl mr-3 text-white" />,

    children: [
      {
        name: "Department",
        label: "Departments List",
        to: "/base-department",
        Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
      },
      {
        name: "Department",
        label: "Assigned Departments List",
        to: "/branch-department",
        Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
      },
    ],
  },

  {
    label: "Suppliers",
    to: "/vendor",
    Icon: <i className="fa fa-truck text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Suppliers List",
    //     to: "/vendor",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },

  {
    label: "Manufacturers",
    to: "/manufacturers",
    Icon: <i className="pi pi-cog text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Manufacturers List",
    //     to: "/manufacturers",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },
  {
    label: "Branches",
    to: "/location",
    Icon: <i className="pi pi-map-marker text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Branches List",
    //     to: "/location",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },

  {
    label: "Tenant",
    to: "/tenant",
    Icon: <i className="pi pi-users text-xl mr-3 text-white" />,

    children: [
      {
        name: "Tenant",
        label: "New",
        to: "/tenant",
        Icon: <i className="pi pi-plus text-xl mr-3 text-white" />,
      },
      {
        name: "Tenant",
        label: "Tenant List",
        to: "/tenant",
        Icon: <i className="pi pi-plus text-xl mr-3 text-white" />,
      },
    ],
  },

  {
    label: "Tenant Config",
    to: "/tenant-config",
    Icon: <i className="pi pi-cog text-xl mr-3 text-white" />,

    children: [
      {
        name: "Tenant Config",
        label: "Edit Configuration",
        to: "/tenant-config",
        Icon: <i className="pi pi-pencil text-xl mr-3 text-white" />,
      },
      {
        name: "Tenant Config",
        label: "Tenant Aggregations",
        to: "/aggregation",
        Icon: <i className="fa fa-anchor text-xl mr-3 text-white" />,
      },
      {
        name: "Tenant Config",
        label: "Logs",
        to: "/logs",
        Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
      },
    ],
  },

  {
    label: "Transfer",
    to: "/transfer",
    Icon: <i className="pi pi-sign-out text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Transfer List",
    //     to: "/transfer",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },

  {
    label: "Recommendations",
    to: "/recommendation",
    Icon: <i className="pi pi-lock-open text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Recommendations List",
    //     to: "/recommendation",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },

  {
    label: "Recommendation",
    to: "/requestrecommendation",
    Icon: <i className="pi pi-unlock text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Recommendation List",
    //     to: "/requestrecommendation",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },

  {
    label: "Users",
    to: "/user",
    Icon: <i className="pi pi-users text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Users List",
    //     to: "/user",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },

  {
    label: "Forwarded Proposals",
    to: "/fore-proposals",
    Icon: <i className="pi pi-tag text-xl mr-3 text-white" />,

    // children: [
    //   {
    //     label: "Proposal List",
    //     to: "/fore-proposals",
    //     Icon: <i className="pi pi-list text-xl mr-3 text-white" />,
    //   },
    // ],
  },
];
