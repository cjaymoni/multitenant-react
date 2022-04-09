import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { connect } from "react-redux";
import DataTableDynamicDemo from "../../../../shared/components/Table/AdTable";
import {
  CardData,
  dateBodyTemplate,
  infoColumns,
  titleTemplate,
} from "../Tenant/const";

import {
  fetchAdmins,
  createAdmin,
} from "../../../../shared/redux/actions/userActions";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { AdminSchema } from "../../../../shared/utils/validation";

class AdministratorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      updateToggler: false,
      toggler2: false,
      infoToggler: false,
      fileToggler: false,
      info: [],
      details: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInfoOpen = this.handleInfoOpen.bind(this);
  }

  componentDidMount() {}

  updateUser() {
    const id = this.state.info.id;
    const userPayload = {
      role_id: this.state.role_id.id || this.state.usero.id,
      first_name: this.state.first_name || this.state.info.first_name,
      middle_name: this.state.middle_name || this.state.info.middle_name,
      last_name: this.state.last_name || this.state.info.last_name,
      phone: this.state.phone || this.state.info.phone,
    };
    this.props.editUser(userPayload, id);
  }

  deleteUser() {
    const id = this.state.info.id;
    this.props.deleteUser(id);
  }

  disableUser() {
    const id = this.state.info.id;
    const payLoad = {
      status: "false",
    };
    this.props.disableUser(payLoad, id);
  }
  handleOpen(toggler) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
    });
  }

  handleClose() {
    this.setState({ toggler: false });
    this.setState({ updateToggler: false });
    this.setState({ toggler2: false });
    this.setState({ infoToggler: false });
    this.setState({ fileToggler: false });
  }

  async toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    await this.setState({
      info: rowData,
      usero: rowData.role,
    });
    return this.setState({
      [toggler]: !togglerStatus,
    });
  }

  async handleInfoOpen(rowData) {
    await this.props.fetchByUserId(rowData.id);
    return this.setState({ updateToggler: true, userd: this.props.userdetail });
  }

  handleChange(evt, field) {
    // check it out: we get the evt.target.title (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same title, using bracket syntax
    this.setState({ [field]: evt.target.value });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  adduserDialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        form="postform"
      />
    </React.Fragment>
  );

  infoDialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
    </React.Fragment>
  );

  deleteuserDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          this.disableUser();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  edituserDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          this.updateUser();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );
  headerData = (
    <React.Fragment>
      <Button
        label="Admin"
        icon="pi pi-plus"
        className="p-button-raised p-button-outlined h-3rem"
        tooltipOptions={{ position: "bottom" }}
        tooltip="Create New Administrator"
        onClick={() => this.handleOpen("toggler")}
      />
    </React.Fragment>
  );

  render() {
    const initialValues = {
      email: "",
      password: "",
    };

    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Button
            onClick={() => this.toggle("infoToggler", rowData)}
            icon="pi pi-info"
            className="p-button-rounded p-button-info mr-2"
            tooltip="More Info"
            tooltipOptions={{ position: "bottom" }}
          ></Button>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-warning mr-2"
            onClick={() => this.toggle("updateToggler", rowData)}
            tooltip="Edit User"
            tooltipOptions={{ position: "bottom" }}
          />
          <Button
            icon="pi pi-ban"
            className="p-button-rounded p-button-danger"
            onClick={() => this.toggle("toggler2", rowData)}
            tooltip="Delete User"
            tooltipOptions={{ position: "bottom" }}
          />
        </React.Fragment>
      );
    };

    const userColumns = [
      { field: "email", header: "Email" },
      { field: "is_active", header: "Active" },
      { field: "created_at", header: "Date Created", body: dateBodyTemplate },
      { header: "Action(s)", body: actionBodyTemplate },
    ];

    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Administrators info
        </h2>
        <br></br>
        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Total admins"
              icon="pi pi-shopping-cart"
              content={this.props.booksize}
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
            ></CardDemo>
          </div>
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Disabled admins"
              icon="pi pi-shopping-cart"
              color="#e7cbec"
              iconColor="#9c27b0"
              update="1"
              content={this.props.booksize - this.props.pagesize}
            ></CardDemo>
          </div>
        </div>
        <br></br>
        <div className="datatable-responsive-demo">
          <div>
            <DataTableDynamicDemo
              columns={userColumns}
              fetchFunction={this.props.fetchAdmins}
              tableHeader="Manage Admins"
              headData={this.headerData}
            />
          </div>
        </div>

        <Dialog
          draggable={false}
          visible={this.state["toggler"]}
          header="Add New Adminsinistrator"
          modal
          className="p-fluid w-5"
          footer={this.adduserDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={AdminSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              const postData = {
                email: values.email,
                password: values.password,
              };
              // console.log(postData);
              this.handleClose();
              this.props.createAdmin(postData);
            }}
          >
            {(props) => {
              const { handleChange, values, errors } = props;

              return (
                <>
                  <Form id="postform">
                    <div className="formgrid grid w-full">
                      <div className="field col-12">
                        <label htmlFor="staff_id" className="block font-normal">
                          Email
                        </label>
                        <InputText
                          id="email"
                          type="text"
                          name="email"
                          value={values.email}
                          placeholder="Email"
                          onChange={handleChange("email")}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="User's email address"
                        />
                        <small>eg: john@mail.com</small>
                      </div>

                      <div className="field col-12">
                        <label htmlFor="state" className="block font-normal">
                          Password
                        </label>
                        <InputText
                          id="password"
                          type="text"
                          name="password"
                          value={values.password}
                          placeholder="Password"
                          onChange={handleChange("password")}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="User's password"
                        />
                      </div>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </Dialog>

        {/* <Dialog
          draggable={false}
          visible={this.state["fileToggler"]}
          style={{ width: "600px" }}
          header="Upload Users File"
          modal
          className="p-fluid"
          onHide={this.handleClose}
        ></Dialog>

        <Dialog
          draggable={false}
          visible={this.state["updateToggler"]}
          style={{ width: "40vw" }}
          header="Edit User"
          modal
          className="p-fluid"
          footer={this.edituserDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="state" className="block font-normal">
                User Type
              </label>
              <AutoComplete
                className="w-full"
                dropdown
                suggestions={this.state.filteredRoles}
                completeMethod={this.searchRole}
                field="title"
                value={this.state.role_id}
                placeholder={this.state.usero.title}
                defaultValue={this.state.usero.id}
                onChange={(selectedOption) => {
                  this.setState({ role_id: selectedOption.target.value });
                }}
              />
            </div>
            <div className="field col-6">
              <label htmlFor="last_name" className="block font-normal">
                Last Name
              </label>
              <InputText
                id="last_name"
                name="last_name"
                type="text"
                defaultValue={this.state.info.last_name}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="first_name" className="block font-normal">
                First name
              </label>
              <InputText
                id="first_name"
                name="first_name"
                type="text"
                defaultValue={this.state.info.first_name}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="field col-6">
              <label htmlFor="middle_name" className="block font-normal">
                Middle Name
              </label>
              <InputText
                id="middle_name"
                name="middle_name"
                type="text"
                defaultValue={this.state.info.middle_name}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="phone" className="block font-normal">
                Phone
              </label>
              <InputText
                id="phone"
                name="phone"
                placeholder="(233) 000-0000"
                defaultValue={this.state.info.phone}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["toggler2"]}
          style={{ width: "30vw" }}
          header="Delete User"
          modal
          className="p-fluid"
          footer={this.deleteuserDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-2"
              style={{ fontSize: "2rem" }}
            />
            {this.state.info && (
              <span>
                Are you sure you want to delete &nbsp;&nbsp;
                <b>
                  {this.state.info.first_name} {this.state.info.last_name}
                </b>
                ?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["infoToggler"]}
          style={{ width: "32vw" }}
          header="User Details"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Usertype
              </label>
              <InputText value={this.state.usero.title} disabled />
            </div>
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Email
              </label>
              <InputText value={this.state.info.email} disabled />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                First Name
              </label>
              <InputText value={this.state.info.first_name} disabled />
            </div>
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Last Name
              </label>
              <InputText value={this.state.info.last_name} disabled />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Middle Name
              </label>
              <InputText value={this.state.info.middle_name} disabled />
            </div>
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Phone
              </label>
              <InputText value={this.state.info.phone} disabled />
            </div>
          </div>
        </Dialog> */}
      </div>
    );
  }
}

AdministratorsList.propTypes = {
  fetchAdmins: PropTypes.func.isRequired,
  createAdmin: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  booksize: state.users.booksize,
  pagesize: state.users.pagesize,
});

export default connect(mapStateToProps, {
  fetchAdmins,
  createAdmin,
})(AdministratorsList);
