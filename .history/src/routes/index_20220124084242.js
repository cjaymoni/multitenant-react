import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import NoMatch from "../pages/404";
import About from "../pages/about";
import Home from "../pages/home";
import MarketPlace from "../pages/marketplace";

function routerFunction() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/market" element={<MarketPlace />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default routerFunction;
