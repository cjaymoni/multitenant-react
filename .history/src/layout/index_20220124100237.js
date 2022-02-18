import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { SidebarDemo } from "../sidebar";

function Layout(props) {
  return (
    <Fragment>
      <div>
        <div className="flex">
          <div className="flex w-3">
            <SidebarDemo history={props.history} />
            <div className="w-9">
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
