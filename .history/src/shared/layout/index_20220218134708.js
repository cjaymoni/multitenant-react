import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import SidebarDemo from "../components/sidebar";
import Topnav from "../components/topnav/Topnav";

function Layout(props) {
  return (
    <Fragment>
      <div className="flex w-screen">
        <div className="flex w-2">
          <SidebarDemo />
        </div>
        <div className="flex w-10">
          <Outlet></Outlet>
        </div>
      </div>
    </Fragment>
  );
}

export default Layout;
