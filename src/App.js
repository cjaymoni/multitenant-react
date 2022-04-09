import "./App.css";
import RouterFunction from "./shared/routes";
import React, { useEffect } from "react";
// import { fetchTenantInfo } from "./shared/redux/actions/tenantActions";
// import PropTypes from "prop-types";
import { getConfig } from "./shared/services/config.service";
import { connect, useDispatch } from "react-redux";
// import { createStructuredSelector } from "reselect";
// import {
//   selectTenantConfig,
//   makeSelectItemsBySubDomain,
// } from "./shared/redux/selectors/tenantSelectors";
import SubDomainError from "./tenant-app/pages/main/subdomainError";
import AdminRoutes from "./shared/routes/admin";

function App(props) {
  const dispatch = useDispatch();
  const tenantInfo = props.tenantInfo;
  const host = window.location.href;

  useEffect(() => {
    dispatch(getConfig());
  }, [dispatch]);
  if (host.includes("admin")) {
    return (
      <div className=" overflow-x-hidden">
        <AdminRoutes />
      </div>
    );
  }
  //  else if (host.indexOf(".") === -1) {
  //   return (
  //     <div className=" overflow-x-hidden">
  //       <AdminRoutes />
  //     </div>
  //   );
  // }
  else if (Object.keys(tenantInfo).length === 0) {
    return <SubDomainError />;
  } else if (typeof tenantInfo === "undefined") {
    return <SubDomainError />;
  } else {
    return (
      <div className=" overflow-x-hidden">
        <RouterFunction />
      </div>
    );
  }
  // switch (tenantInfo) {
  //   case undefined:
  //     return <SubDomainError />;
  //   case Object.keys(tenantInfo).length === 0:
  //     return <SubDomainError />;
  //   case !undefined:
  //     return (
  //       <div className=" overflow-x-hidden">
  //         <RouterFunction />
  //       </div>
  //     );
  //   case !{}:
  //     return (
  //       <div className=" overflow-x-hidden">
  //         <RouterFunction />
  //       </div>
  //     );
  //   default:
  //     return <div>Default page</div>;
  // }
}

// App.propTypes = {
//   fetchTenantInfo: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => ({
  tenantInfo: state.tenants.tenantConfig,
  // tth: selectTenantConfig(),
});
export default connect(mapStateToProps, { getConfig })(App);
