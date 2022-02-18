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
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "../pages/auth";
import ability from "../casl/ability";
function RouterFunction({ children, ...rest }) {
  const history = createBrowserHistory();

  const routes = [
    {
      element: <Home />,
      path: "/home",
      exact: true,
      layout: Layout,
      name: "Home",
    },

    {
      element: <About />,
      path: "/about",
      exact: true,
      layout: Layout,
      name: "About",
    },
    {
      element: <MarketPlace />,
      path: "/market",
      exact: true,
      layout: Layout,
      name: "Market",
    },
  ];
  return (
    <Router history={history}>
      <Routes>
        <Route exact path="/" element={<Login />} />

        {routes.map((route, index) => {
          return (
            // <Route element={<RequireAuth />}>
            <Route
              key={index}
              exact={route.exact}
              element={route.element}
              path={route.path}
            />
            // </Route>
          );
        })}
        {/* <Route exact path="/home" element={<Home />} />
          <Route path="/users" element={<About />} />
          <Route path="/market" element={<MarketPlace />} /> */}

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

function RequireAuth() {
  let auth = localStorage.getItem("user");
  let location = useLocation();

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} />;
  } else if (auth) {
    return <Layout />;
  }
}

export default RouterFunction;
