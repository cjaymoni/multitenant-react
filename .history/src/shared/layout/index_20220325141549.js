import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topnav from "../components/topnav/Topnav";

function Layout(props) {
  return (
    <Fragment>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <div
          className="flex-1 md:flex-none"
          style={{ display: "flex", width: "16vw", height: "100vh" }}
        >
          <Sidebar />
        </div>
        <div style={{ width: "84vw", height: "100vh" }}>
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
