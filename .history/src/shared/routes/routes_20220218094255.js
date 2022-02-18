import About from "../../tenant-app/pages/about";
import Home from "../../tenant-app/pages/home";
import MarketPlace from "../../tenant-app/pages/marketplace";
import Layout from "../layout";
import NoMatch from "../../tenant-app/pages/404";

const routes = [
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
