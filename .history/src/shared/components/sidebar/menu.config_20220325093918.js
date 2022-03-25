import { PrimeIcons } from "primereact/api";

export const sideMenu = [
  {
    label: "Home",
    Icon: <i className="pi pi-home " />,
    to: "/dashboard",
  },
  {
    label: "Profile",
    Icon: <i className="pi pi-users" />,
    to: "/profile",
  },
  {
    label: "Settings",
    Icon: <i className="pi pi-users" />,
    to: "/settings",
    children: [
      {
        label: "Account",
        Icon: <i className="pi pi-users" />,
        to: "account",
      },
      {
        label: "Security",
        Icon: <i className="pi pi-users" />,
        to: "security",
        children: [
          {
            label: "Credentials",
            Icon: <i className="pi pi-users" />,
            to: "credentials",
          },
          {
            label: "2-FA",
            Icon: <i className="pi pi-phone" />,
            to: "2fa",
          },
        ],
      },
    ],
  },
];
