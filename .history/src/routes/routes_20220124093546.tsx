import About from "../pages/about";
import Home from "../pages/home";
import MarketPlace from "../pages/marketplace";
import Layout from "../layout";
import type { RouteObject } from "react-router-dom";
import NoMatch from "../pages/404";

let routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { index: true, element: <MarketPlace /> },
      { index: true, element: <About /> },

      //   {
      //     path: "/courses",
      //     element: <Courses />,
      //     children: [
      //       { index: true, element: <CoursesIndex /> },
      //       { path: "/courses/:id", element: <Course /> },
      //     ],
      //   },
      { path: "*", element: <NoMatch /> },
    ],
  },
];
export default routes;

// export const routes = [
//   {
//     element: Home,
//     path: "/home",
//     exact: true,
//     layout: Layout,
//     name: "Home",
//   },

//   {
//     element: About,
//     path: "/about",
//     exact: true,
//     layout: Layout,
//     name: "About",
//   },
//   {
//     element: MarketPlace,
//     path: "/market",
//     exact: true,
//     layout: Layout,
//     name: "Market",
//   },
// ];
