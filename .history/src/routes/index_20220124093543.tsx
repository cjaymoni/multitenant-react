import React from "react";
import Layout from "../layout";
import NoMatch from "../pages/404";
import About from "../pages/about";
import Home from "../pages/home";
import MarketPlace from "../pages/marketplace";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function RouterFunction() {
  let element = useRoutes(routes);

  return element;
  // The useRoutes() hook allows you to define your routes as JavaScript objects
  // instead of <Routes> and <Route> elements. This is really just a style
  // preference for those who prefer to not use JSX for their routes config.
  // let element = useRoutes(routes);
  //   return (
  //     <Router>
  //       <Routes>
  //         {routes.map((route, index) => (
  //           // You can render a <Route> in as many places
  //           // as you want in your app. It will render along
  //           // with any other <Route>s that also match the URL.
  //           // So, a sidebar or breadcrumbs or anything else
  //           // that requires you to render multiple things
  //           // in multiple places at the same URL is nothing
  //           // more than multiple <Route>s.
  //           <Route
  //             key={index}
  //             path={route.path}
  //             exact={route.exact}
  //             // element={route.component}
  //             render={(props) => {
  //               return (
  //                 // <route.layout {...props}>
  //                 <route.element />
  //                 // </route.layout>
  //               );
  //             }}
  //           />
  //         ))}
  //         {/* <Route exact path="/" element={<Home />} />
  //         <Route path="/about" element={<About />} />

  //         <Route path="/market" element={<MarketPlace />} /> */}

  //         <Route path="*" element={<NoMatch />} />
  //       </Routes>
  //     </Router>
  //   );
}

export default RouterFunction;
