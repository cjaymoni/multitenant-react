import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/adminSide/adminSidebar.js";
import AdminNavBar from "../components/adminNav/index.js";

function AdminLayout(props) {
  return (
    <Fragment>
      <div className="flex w-screen ">
        <div className="flex" style={{ width: "16vw" }}>
          <AdminSidebar />
        </div>
        <div style={{ width: "84vw" }}>
          <AdminNavBar />

          <div className="mt-auto relative">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminLayout;
