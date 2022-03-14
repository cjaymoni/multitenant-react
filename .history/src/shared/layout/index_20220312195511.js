import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import SidebarDemo from "../components/sidebar";
import Topnav from "../components/topnav/Topnav";

function Layout(props) {
  return (
    <Fragment>
      <div style={{ display: "flex", width: "100vw" }}>
        <div style={{ display: "flex", width: "18vw" }}>
          <SidebarDemo />
        </div>
        <div style={{ width: "82vw" }}>
          <Topnav />

          <div className="mt-auto relative ml-8">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Layout;
