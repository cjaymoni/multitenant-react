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
  useRoutes,
} from "react-router-dom";

function RouterFunction() {
  //   let element = useRoutes([
  //     // A route object has the same properties as a <Route>
  //     // element. The `children` is just an array of child routes.
  //     {
  //       element: <Layout />,
  //       children: [
  //         <Route path="/" element={<Home />} />,

  //         <Route path="/about" element={<About />} />,
  //         <Route path="/market" element={<MarketPlace />} />,
  //         <Route path="*" element={<NoMatch />} />,
  //       ],
  //     },
  //   ]);

  // return element;
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

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
