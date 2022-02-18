import { Fragment } from "react";
import { SidebarDemo } from "../sidebar";
import { withRouter } from "react-router-dom";

function Layout(props) {
  if (
    props.location.pathname !== "/signin" &&
    props.location.pathname !== "/"
  ) {
    return (
      <Fragment>
        <div>
          <div className="flex">
            <div className="flex">
              <SidebarDemo history={props.history} />
              <div style={{ maxWidth: "800px" }}>
                {/* <Topnav /> */}
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div>{props.children}</div>
      </Fragment>
    );
  }
}

export default withRouter(Layout);
