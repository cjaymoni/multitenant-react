import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import SidebarDemo from "../components/sidebar";
import Topnav from "../components/topnav/Topnav";

function Layout(props) {
  return (
    <Fragment>
      <div style={{ display: "flex", width: "100vw" }}>
        <div
          className="flex-1 md:flex-none"
          style={{ display: "flex", width: "16vw" }}
        >
          <SidebarDemo />
        </div>
        <div
          className="flex-1 md:flex-none"
          style={{ display: "flex", width: "84vw" }}
        >
          <Topnav />

          <div className="mt-auto relative">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Layout;
