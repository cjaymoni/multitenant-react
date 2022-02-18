import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import SidebarDemo from "../components/sidebar";
import Topnav from "../components/topnav/Topnav";

function Layout(props) {
  return (
    <Fragment>
      <div className="flex">
        <div className="flex" style={{ width: "16vw" }}>
          <SidebarDemo />
        </div>
        <div className="flex" style={{ width: "84vw" }}>
          <Topnav />
          <div className="mt-auto">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Layout;
