import React, { Component } from "react";
import PropTypes from "prop-types";

class SystemDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Dashboard
        </h2>
        <br></br>
      </div>
    );
  }
}

SystemDashboard.propTypes = {};

export default SystemDashboard;
