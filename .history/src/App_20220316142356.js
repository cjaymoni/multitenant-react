import "./App.css";
import RouterFunction from "./shared/routes";
import React, { useEffect, useState } from "react";
import { fetchTenantInfo } from "./shared/redux/actions/tenantActions";
import PropTypes from "prop-types";
import { getConfig } from "./shared/services/config.service";
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectTenantConfig,
  makeSelectItemsBySubDomain,
} from "./shared/redux/selectors/tenantSelectors";

function App(props) {
  const dispatch = useDispatch();
  const tenantInfo = props.tenantInfo;

  useEffect(() => {
    dispatch(getConfig());
  }, console.log(props.tth)[dispatch]);

  if (tenantInfo !== []) {
    return (
      <div className=" overflow-x-hidden">
        <RouterFunction />
      </div>
    );
  } else {
    return <div>Doesnt exist</div>;
  }
}

// App.propTypes = {
//   fetchTenantInfo: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  tenantInfo: makeSelectItemsBySubDomain("aiti-kaces"),
  tth: selectTenantConfig(),
});
export default connect(mapStateToProps, { getConfig })(App);
