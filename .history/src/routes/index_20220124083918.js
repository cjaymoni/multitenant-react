import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NoMatch from "../pages/404";
import About from "../pages/about";
import Home from "../pages/home";
import MarketPlace from "../pages/marketplace";

function routerFunction() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/market">
          <MarketPlace />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default routerFunction;
