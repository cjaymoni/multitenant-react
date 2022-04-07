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

  componentDidMount() {}

  render() {
    const rightContents = (
      <React.Fragment>
        {/* <Can do="view" on="NotiBell">
          <Notifications
            // style={{fontSize:'10px',fontFamily:'serif',fontWeight:'bold', backgroundColor:'aliceblue',border: 'none'}}
            // notificationCard="card-style"
            // icon={classNames(<i className="pi pi-bell" />)}
            cardOption={data =>
              window.location.assign([data].map(m => m.detailPage))
            }
            data={data}
          />
        </Can> */}
        &nbsp;
        <SplitButton
          icon="pi pi-fw pi-user"
          onClick={this.openDialog}
          // label={this.props.user.first_name}
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
