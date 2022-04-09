export const adminMenu = [
  {
    label: "Dashboard",
    Icon: <i className="pi pi-home text-xl mr-3 text-white" />,
    to: "/admin/dashboard",
  },

  {
    label: "Environment Configuration",
    to: "/admin/env-config",
    Icon: <i className="pi pi-ticket text-xl mr-3 text-white" />,
  },

  {
    label: "Tenant",
    to: "/admin/tenant",
    Icon: <i className="pi pi-users text-xl mr-3 text-white" />,

    children: [
      {
        name: "Tenant",
        label: "New",
        to: "/admin/tenant-form",
        Icon: <i className="pi pi-plus text-xl mr-3 text-white" />,
      },
      {
        name: "Tenant",
        label: "Tenant List",
        to: "/admin/tenant",
        Icon: <i className="pi pi-plus text-xl mr-3 text-white" />,
      },
    ],
  },

  {
    label: "Logs",
    to: "/admin/logs",
    Icon: <i className="pi pi-ticket text-xl mr-3 text-white" />,
  },

  {
    label: "Administrators",
    to: "/administrators",
    Icon: <i className="pi pi-users text-xl mr-3 text-white" />,
  },
];
