import "./App.css";
import RouterFunction from "./shared/routes";
import React, { useEffect, useState } from "react";
import { fetchTenantInfo } from "./shared/redux/actions/tenantActions";
import PropTypes from "prop-types";
import { getConfig } from "./shared/services/config.service";
import { connect, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConfig());
  }, [dispatch]);

  return (
    <div className=" overflow-x-hidden">
      <RouterFunction />
    </div>
  );
}

// App.propTypes = {
//   fetchTenantInfo: PropTypes.func.isRequired,
// };
export default App;
