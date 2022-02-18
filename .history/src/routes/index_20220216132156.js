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
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "../pages/auth";
function RouterFunction({ children, ...rest }) {
  const history = createBrowserHistory();

  const loggedInUser = localStorage.getItem("user");
  return (
    <Router history={history}>
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route element={loggedInUser ? <Layout /> : <Navigate to="/login" />}>
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
