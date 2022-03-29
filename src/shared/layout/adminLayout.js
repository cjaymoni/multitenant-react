import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topnav from "../components/topnav/Topnav";

function AdminLayout(props) {
  return (
    <Fragment>
      <div className="flex w-screen ">
        <div className="flex" style={{ width: "16vw" }}>
          <Sidebar />
        </div>
        <div style={{ width: "84vw" }}>
          {/* <Topnav /> */}

          <div className="mt-auto relative">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminLayout;
