import React, { Component } from "react";
import PropTypes from "prop-types";
import { Toolbar } from "primereact/toolbar";
import { SplitButton } from "primereact/splitbutton";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { connect } from "react-redux";
class AdminNavBar extends Component {
  constructor(props) {
    super(props);
  }
  icons = [
    {
      label: "Reset password",
      icon: "pi pi-fw pi-user-edit",
      command: () => {
        this.openPassDialog();
      },
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        this.logout();
      },
    },
  ];
  componentDidMount() {}

  render() {
    const rightContents = (
      <React.Fragment>
        <SplitButton
          icon="pi pi-fw pi-user"
          onClick={this.openDialog}
          label="System Admin"
          model={this.icons}
          className="p-button-info"
        ></SplitButton>
      </React.Fragment>
    );
    return (
      <Toolbar
        // className={"layout-topbar"}

        style={{ width: "100%", height: "9vh" }}
        right={rightContents}
      />
    );
  }
}

AdminNavBar.propTypes = {};

export default AdminNavBar;
