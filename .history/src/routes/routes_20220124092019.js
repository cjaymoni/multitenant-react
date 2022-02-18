import About from "../pages/about";
import Home from "../pages/home";
import MarketPlace from "../pages/marketplace";
import Layout from "../layout/index";

export const routes = [
  {
    element: Home,
    path: "/home",
    exact: true,
    layout: Layout,
    name: "Home",
  },

  {
    element: About,
    path: "/about",
    exact: true,
    layout: Layout,
    name: "About",
  },
  {
    element: MarketPlace,
    path: "/market",
    exact: true,
    layout: Layout,
    name: "Market",
  },
];
