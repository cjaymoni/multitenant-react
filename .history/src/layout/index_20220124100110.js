import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { SidebarDemo } from "../sidebar";

function Layout(props) {
  return (
    <Fragment>
      <div>
        <div className="flex">
          <div className="flex">
            <SidebarDemo history={props.history} />
            <div style={{ maxWidth: "800px" }}>
              {/* <Topnav /> */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Layout;
