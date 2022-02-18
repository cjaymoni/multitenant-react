import React from "react";
import Layout from "../layout";
import NoMatch from "../pages/404";
import About from "../pages/about";
import Home from "../pages/home";
import MarketPlace from "../pages/marketplace";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "../pages/auth";
function RouterFunction() {
  const history = createBrowserHistory();
  // let element = useRoutes([
  //   // A route object has the same properties as a <Route>
  //   // element. The `children` is just an array of child routes.
  //   //  { path: "/", element: <Home /> },
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     children: [
  //       { path: "/", element: <Home /> },
  //       { path: "/users", element: <About /> },
  //       { path: "/market", element: <MarketPlace /> },
  //     ],
  //   },
  // ]);

  // return element;
  return (
    <Router history={history}>
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route exact path="/home" element={<Home />} />
          <Route path="/users" element={<About />} />

          <Route path="/market" element={<MarketPlace />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

// const AppWrapper = () => {
//   return (
//     <Router>
//       <RouterFunction />
//     </Router>
//   );
// };
export default RouterFunction;
