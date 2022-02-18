import React, { Component } from "react";
import { Toolbar } from "primereact/toolbar";
import { SplitButton } from "primereact/splitbutton";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { connect } from "react-redux";
import {
  logOut,
  requestReset,
  verifyEmail,
} from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import { client } from "../../services/socket";
// import Notifications from 'react-notifications-menu';
// import Can from '../../casl/can';
// import { Formik, Form } from 'formik';
// import {UserSchema} from '../shared/utils/validation'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDialog: false,
      passwordDialog: false,
      userData: this.props.user,
      messages: [],
      formattedMessages: [],
      showPanel: false,
      anchorEl: null,
      code: "",
      new_password: "",
      current_password: "",
    };

    this.connect = this.connect.bind(this);
    // this.itemTemplate = this.itemTemplate.bind(this);
    // this.ds =this.ds.bind(this)
    this.SendConfirmation = this.SendConfirmation.bind(this);
  }
  logout = () => {
    this.props.logOut();
  };

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
  openDialog = () => {
    this.setState({ profileDialog: true });
  };

  resetPassword() {
    const id = this.state.info.id;
    const resetData = {
      password: this.state.new_password,
      code: this.state.code,
      current_password: this.state.current_password,
    };
    this.props.resetPassword(id, resetData);
  }

  openPassDialog = () => {
    this.setState({ passwordDialog: true });
  };
  closePassDialog = () => {
    this.setState({ passwordDialog: false });
  };
  closeDialog = () => {
    this.setState({ profileDialog: false });
  };

  DialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={this.closeDialog}
      />
    </React.Fragment>
  );

  PassDialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={this.closePassDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={this.closePassDialog}
      />
    </React.Fragment>
  );

  componentDidMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = async (message) => {
      await this.setState({ messages: JSON.parse(message.data) });

      switch (this.state.messages.key) {
        case "proposal":
          return (
            this.state.formattedMessages.push({
              key: this.state.messages.key,
              message: (
                <p>
                  <span style={{ color: "#7ac2fa" }}>
                    Proposal of {this.state.messages.title} was created by{" "}
                    {this.state.messages.author.first_name}{" "}
                  </span>
                </p>
              ),
              image:
                "https://i.fbcd.co/products/resized/resized-750-500/903ac15317c4132beafa9480e780aa9ddcb91d2a6f64e3a198baf9f4232eedab.jpg",
              detailPage: "/recommendation",
            }),
            this.toast.show({
              severity: "info",
              summary: "Notification",
              detail: "Proposal received",
              life: 3000,
            })
          );
        case "request":
          return (
            this.state.formattedMessages.push({
              key: this.state.messages.key,
              message: (
                <p>
                  <span style={{ color: "#7ac2fa" }}>
                    Request for item: {this.state.messages.title} with code:{" "}
                    {this.state.messages.code}
                  </span>
                </p>
              ),
              image:
                "https://i.fbcd.co/products/resized/resized-750-500/903ac15317c4132beafa9480e780aa9ddcb91d2a6f64e3a198baf9f4232eedab.jpg",
            }),
            this.toast.show({
              severity: "info",
              summary: "Notification",
              detail: "Item Request received",
              life: 3000,
            })
          );
        case "servicing":
          return (
            this.state.formattedMessages.push({
              key: this.state.messages.key,
              message: (
                <p>
                  <span style={{ color: "#7ac2fa" }}>
                    Servicing Deadline for item: {this.state.messages.title} is:{" "}
                    {this.state.messages.service_date}{" "}
                  </span>
                </p>
              ),
              image:
                "https://i.fbcd.co/products/resized/resized-750-500/903ac15317c4132beafa9480e780aa9ddcb91d2a6f64e3a198baf9f4232eedab.jpg",
            }),
            this.toast.show({
              severity: "info",
              summary: "Notification",
              detail: "Servicing Deadline Approaching",
              life: 3000,
            })
          );
        default:
          return (
            this.state.formattedMessages.push({
              key: this.state.messages.key,
              message: (
                <p>
                  <span style={{ color: "#7ac2fa" }}>
                    Message of {this.state.messages.title} received.{" "}
                  </span>
                </p>
              ),
              image:
                "https://i.fbcd.co/products/resized/resized-750-500/903ac15317c4132beafa9480e780aa9ddcb91d2a6f64e3a198baf9f4232eedab.jpg",
              author: this.state.messages.author.first_name,
            }),
            console.log(this.state.formattedMessages)
          );
      }
      // return console.log(this.state.formattedMessages)
    };

    this.interval = setInterval(this.connect, 1000);
  }

  connect() {
    if (this.ws === undefined || (this.ws && this.ws.readyState === 3)) {
      this.ws = new WebSocket(
        `ws://196.43.196.108:3345/ws/${localStorage.user_id}`
      );
    }
  }

  componentDidUpdate() {
    // Typical usage (don't forget to compare props):
    client.onmessage = async (message) => {
      await this.setState({ messages: JSON.parse(message.data) });
      switch (this.state.messages.key) {
        case "proposal":
          return (
            this.state.formattedMessages.push({
              key: this.state.messages.key,
              message: (
                <p>
                  <span style={{ color: "#7ac2fa" }}>
                    Proposal of {this.state.messages.title} was created by{" "}
                    {this.state.messages.author.first_name}{" "}
                  </span>
                </p>
              ),
              image:
                "https://i.fbcd.co/products/resized/resized-750-500/903ac15317c4132beafa9480e780aa9ddcb91d2a6f64e3a198baf9f4232eedab.jpg",
              detailPage: "/recommendation",
            }),
            this.toast.show({
              severity: "info",
              summary: "Notification",
              detail: "Proposal received",
              life: 3000,
            })
          );
        case "request":
          return (
            this.state.formattedMessages.push({
              key: this.state.messages.key,
              message: (
                <p>
                  <span style={{ color: "#7ac2fa" }}>
                    Request for item {this.state.messages.title} with code:{" "}
                    {this.state.messages.code}{" "}
                  </span>
                </p>
              ),
              image:
                "https://i.fbcd.co/products/resized/resized-750-500/903ac15317c4132beafa9480e780aa9ddcb91d2a6f64e3a198baf9f4232eedab.jpg",
            }),
            this.toast.show({
              severity: "info",
              summary: "Notification",
              detail: "Item Request received",
              life: 3000,
            })
          );
        case "servicing":
          return (
            this.state.formattedMessages.push({
              key: this.state.messages.key,
              message: (
                <p>
                  <span style={{ color: "#7ac2fa" }}>
                    Servicing Deadline for item: {this.state.messages.title} is:{" "}
                    {this.state.messages.service_date}{" "}
                  </span>
                </p>
              ),
              image:
                "https://i.fbcd.co/products/resized/resized-750-500/903ac15317c4132beafa9480e780aa9ddcb91d2a6f64e3a198baf9f4232eedab.jpg",
            }),
            this.toast.show({
              severity: "info",
              summary: "Notification",
              detail: "Servicing Deadline Approaching",
              life: 3000,
            })
          );
        default:
          return (
            this.state.formattedMessages.push({
              key: this.state.messages.key,
              message: (
                <p>
                  <span style={{ color: "#7ac2fa" }}>
                    Message of {this.state.messages.title} received.{" "}
                  </span>
                </p>
              ),
              image:
                "https://i.fbcd.co/products/resized/resized-750-500/903ac15317c4132beafa9480e780aa9ddcb91d2a6f64e3a198baf9f4232eedab.jpg",
              author: this.state.messages.author.first_name,
            }),
            console.log(this.state.formattedMessages)
          );
      }
    };
  }

  ResetDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.closePassDialog()}
      />
      <Button
        label="Request"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          this.SendConfirmation();
          this.closePassDialog();
        }}
      />
    </React.Fragment>
  );
  async SendConfirmation() {
    const email = this.state.userData.email;
    await this.props.verifyEmail(email);
    if (this.props.testingdata !== null) {
      return this.props.requestReset(this.props.verifieddata.email);
    }
  }
  render() {
    const data = this.state.formattedMessages;
    const { password, error, isLoading, updated } = this.state;
    const initialValues = {
      code: "",
      password: "",
      current_password: "",
      confirm_password: "",
    };

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
          label={this.props.user.info.first_name}
          model={this.icons}
          className="p-button-info"
        ></SplitButton>
      </React.Fragment>
    );
    return (
      <div>
        <Toast ref={(el) => (this.toast = el)} position="top-right" />
        <Toolbar
          // className={"layout-topbar"}

          style={{ width: "82vw", height: "9vh" }}
          right={rightContents}
        />

        <Dialog
          visible={this.state.profileDialog}
          header="User Profile"
          modal
          className="p-fluid"
          footer={this.DialogFooter}
          style={{ width: "50vw" }}
          onHide={this.closeDialog}
        >
          <div className="formgrid grid">
            <div className="field col-4">
              <label htmlFor="zip">Email </label>
              <InputText
                id="email"
                defaultValue={this.state.userData.email}
                disabled
              />
            </div>
            <div className="field col-4">
              <label htmlFor="state">Usertype</label>
              <InputText
                id="usertype"
                defaultValue={this.state.userData.role.title}
                disabled
              />
            </div>
            <div className="field col-4">
              <label htmlFor="zip">Contact </label>
              <InputText
                id="email"
                defaultValue={this.state.userData.info.phone}
                disabled
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-4">
              <label htmlFor="state">Last name</label>
              <InputText
                id="staff_id"
                defaultValue={this.state.userData.info.last_name}
                disabled
              />
            </div>
            <div className="field col-4">
              <label htmlFor="state">Middle name</label>
              <InputText
                id="staff_id"
                defaultValue={this.state.userData.info.middle_name}
                disabled
              />
            </div>
            <div className="field col-4">
              <label htmlFor="state">First name</label>
              <InputText
                id="staff_id"
                defaultValue={this.state.userData.info.first_name}
                disabled
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          visible={this.state.passwordDialog}
          header="Request Password Reset"
          modal
          className="p-fluid"
          footer={this.ResetDialogFooter}
          style={{ width: "30vw" }}
          onHide={this.closePassDialog}
        >
          <div className="confirmation-content">
            <i className="pi pi-envelope mr-3" style={{ fontSize: "1.2rem" }} />

            <span>Email Address</span>
            <InputText
              id="useremail"
              name="useremail"
              disabled
              value={this.state.userData.email}
            />
          </div>
        </Dialog>
        {/* 
      <Dialog
        visible={this.state.passwordDialog}
        header="Reset Password"
        modal
        className="p-fluid"
        // footer={this.PassDialogFooter}
        style={{ width: "50vw"}}
        onHide={this.closePassDialog}
       >
  <Formik validationSchema={UserSchema} validateOnChange={true} initialValues={initialValues}
   
   onSubmit={(values) => {
   const passwordReset={
   code:values.code,
   password:values.password,
   current_password:values.password,
   confirm_password:values.confirm_password,
 };
   this.props.createLocation(passwordReset);
   this.handleClose();
   }}  >
     {props =>{
       const{ handleChange, values, errors} = props;


       return(
         
        <>
        {/* <Button label="Send password reset code" onClick={handleChange}  style={{ width: "30vw"}} /> */}

        {/* <Form id="postform">
          
            <div className="p-formgrid p-grid">
           
              <div className="p-field p-col-12">
              <br></br>

              <InputText 
              id="code" 
              type="password" 
              name="password" 
              placeholder="Current password"
              onChange={(event)=>handleChange(event,"current_password")}
              value={values.current_password} 
              className={errors.title ? "p-invalid p-d-block" : "p-d-flex"}/>
            </div>
            
            <div className="p-field p-col-12">
              <InputText 
              id="new_password" 
              type="password" 
              placeholder="New password"
              name="password" 
              onChange={(event)=>handleChange(event,"password")}
              value={values.password} 
              />
            </div>
            <div className="p-field p-col-12">
              <InputText 
              id="password_confirm" 
              type="password" 
              placeholder=" Confirm New password"
              name="password" 
              onChange={(event)=>handleChange(event,"confirm_password")}
              value={values.confirm_password} 
              />
            </div>
            <Button
                  type="submit"
                  variant="raised"
                  color="primary"
                  // disabled={Boolean(!isValid || isSubmitting)}
                  
                >
                  {'Reset Password'}
                </Button>
          </div>

          </Form>
          </>
          );
     }}

  </Formik>
      </Dialog> */}
      </div>
    );
  }
}

Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
  verifyEmail: PropTypes.func.isRequired,
  requestReset: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  verifieddata: state.auth.verifieddata,
});
export default connect(mapStateToProps, { logOut, verifyEmail, requestReset })(
  Navbar
);
