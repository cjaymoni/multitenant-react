import { PrimeIcons } from "primereact/api";

export const sideMenu = [
  {
    label: "Home",
    Icon: "pi pi-home",
    to: "/dashboard",
  },
  {
    label: "Profile",
    Icon: PrimeIcons.USERS,
    to: "/profile",
  },
  {
    label: "Settings",
    Icon: PrimeIcons.COG,
    to: "/settings",
    children: [
      {
        label: "Account",
        Icon: PrimeIcons.USER_PLUS,
        to: "account",
      },
      {
        label: "Security",
        Icon: PrimeIcons.SHIELD,
        to: "security",
        children: [
          {
            label: "Credentials",
            Icon: PrimeIcons.CHEVRON_CIRCLE_UP,
            to: "credentials",
          },
          {
            label: "2-FA",
            Icon: PrimeIcons.PHONE,
            to: "2fa",
          },
        ],
      },
    ],
  },
];
