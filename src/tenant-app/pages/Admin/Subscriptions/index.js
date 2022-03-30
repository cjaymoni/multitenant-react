import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { Dialog } from "primereact/dialog";
import Can from "../../../../shared/casl/can";
import {
  SubPackageSchema,
  jsonToFormData,
} from "../../../../shared/utils/validation";
import TableUI from "../../../../shared/components/Table/Table";
import {
  fetchSubscriptionPackages,
  createSubscriptionPackage,
  updateSubscriptionPackage,
} from "../../../../shared/redux/actions/subPackageActions";

class Subscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      toggler1: false,
      toggler2: false,
      toggler3: false,
      info: [],
    };
    this.toggle = this.toggle.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
  }

  toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
      info: rowData,
    });
  }

  handleOpen(toggler) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
    });
  }
  handleClose() {
    this.setState({ toggler: false });
    this.setState({ toggler1: false });
    this.setState({ toggler2: false });
    this.setState({ toggler3: false });
    this.setState({ toggler4: false });
    this.setState({ openinfo: false });
  }

  addSubPackageFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        form="postform"
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        type="submit"
        // onClick={() => this.handleClose()}
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

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  editSubPackageDialogFooter = (
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
          this.updateSubPackage();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  deleteSubPackageDialogFooter = (
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
          this.deleteSubPackage();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  updateSubPackage() {}

  deleteSubPackage() {}

  disableSubPackage() {}
  render() {
    const initialValues = {
      title: "",
      service_owner_phone: "",
      service_owner_email: "",
      description: "",
      service_owner_url: "",
      logo: "",
    };
    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Can do="info" on="Manufacturers">
            <Button
              icon="pi pi-info"
              className="p-button-rounded p-button-info p-mr-2"
              onClick={() => this.toggle("toggler1", rowData)}
              tooltip="More Info"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="edit" on="Manufacturers">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning p-mr-2"
              onClick={() => this.toggle("toggler2", rowData)}
              tooltip="Edit"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="disable" on="Manufacturers">
            <Button
              icon="pi pi-ban"
              className="p-button-rounded p-button-danger p-mr-2"
              onClick={() => this.toggle("toggler2", rowData)}
              tooltip="Delete"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="delete" on="Manufacturers">
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger p-mr-2"
              // onClick={() => this.toggle("toggler4", rowData)}
              tooltip="Delete"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
        </React.Fragment>
      );
    };

    const packageColumns = [
      { field: "title", header: "Manufacturer Name" },
      { field: "service_owner_email", header: "Email Address" },
      { field: "service_owner_url", header: "Website" },
      { field: "service_owner_phone", header: "Contact" },
      { field: "description", header: "Description" },
      { header: "Action(s)", body: actionBodyTemplate },
    ];
    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Subscription packages
        </h2>
        <br></br>

        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Total packages"
              icon="pi pi-shopping-cart"
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
              content={this.props.booksize}
            ></CardDemo>
          </div>
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Active packages"
              icon="pi pi-shopping-cart"
              color="#e7cbec"
              iconColor="#9c27b0"
              content={this.props.pagesize}
            ></CardDemo>
          </div>
        </div>
        <br></br>

        <div className="datatable-responsive-demo">
          <div>
            <TableUI
              tableHeader="Subscription Packages"
              columns={packageColumns}
              fetchFunction={this.props.fetchSubscriptionPackages}
              clickFunction={() => this.handleOpen("toggler")}
              style={{
                width: "76vw",
                marginLeft: "15px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
            />
          </div>
        </div>

        <Dialog
          draggable={false}
          visible={this.state["toggler"]}
          style={{ width: "35vw" }}
          header="Add New Package"
          modal
          className="p-fluid"
          footer={this.addSubPackageFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={SubPackageSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              // var head = 'htpp://'
              const postData = {
                title: values.title,
                description: values.description,
                service_owner_phone: values.service_owner_phone,
                service_owner_email: values.service_owner_email,
                service_owner_url: values.service_owner_url,
                logo: values.logo,
              };
              this.props.createSubscriptionPackage(jsonToFormData(postData));
              this.handleClose();
            }}
          >
            {(props) => {
              const { handleChange, values, errors, handleSubmit } = props;

              return (
                <>
                  <Form id="postform">
                    <div className="formgrid grid">
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Package Name
                        </label>
                        <InputText
                          id="title"
                          type="text"
                          name="title"
                          placeholder="Package Name"
                          onChange={(event) => handleChange(event, "title")}
                          value={values.title}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Name of Pacakage"
                        />
                        <small>eg: AITI Internet</small>
                        <div className="error-message">{errors.title}</div>
                      </div>
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Service Provider Contact
                        </label>
                        <InputText
                          id="service_owner_phone"
                          type="text"
                          name="service_owner_phone"
                          maxlength={10}
                          placeholder="Service Provider Contact "
                          onChange={(event) =>
                            handleChange(event, "service_owner_phone")
                          }
                          value={values.service_owner_phone}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Service Provider's Phone Number"
                        />
                        <small>eg: 02011002200</small>

                        <div className="error-message">
                          {errors.service_owner_phone}
                        </div>
                      </div>
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Service Provider Email
                        </label>
                        <InputText
                          id="service_owner_email"
                          type="service_owner_email"
                          name="service_owner_email"
                          placeholder="Service Provider Email"
                          onChange={(event) =>
                            handleChange(event, "service_owner_email")
                          }
                          value={values.service_owner_email}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Service Provider's email address"
                        />
                        <small>eg: example@mail.com</small>
                        <div className="error-message">
                          {errors.service_owner_email}
                        </div>
                      </div>

                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Service Provider Website
                        </label>
                        <InputText
                          id="service_owner_url"
                          type="text"
                          name="service_owner_url"
                          placeholder="Service Provider Website"
                          onChange={(event) =>
                            handleChange(event, "service_owner_url")
                          }
                          value={values.service_owner_url}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Service Provider's website address"
                        />
                        <small>eg: https://www.hp.com</small>
                        <div className="error-message">
                          {errors.service_owner_url}
                        </div>
                      </div>

                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Description
                        </label>
                        <InputTextarea
                          id="description"
                          type="text"
                          name="description"
                          placeholder="Package's Description"
                          onChange={(event) =>
                            handleChange(event, "description")
                          }
                          value={values.description}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Description"
                        />
                        <small>eg: Service Provider for hP laptops</small>
                        <div className="error-message">
                          {errors.description}
                        </div>
                      </div>
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Logo
                        </label>
                        <InputText
                          id="logo"
                          type="file"
                          name="logo"
                          placeholder="Service Provider's logo"
                          onChange={(event) => handleChange(event, "logo")}
                          value={values.logo}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Service Provider's logo"
                        />
                        <div className="error-message">{errors.logo}</div>
                      </div>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </Dialog>
      </div>
    );
  }
}

Subscriptions.propTypes = {
  fetchSubscriptionPackages: PropTypes.func.isRequired,
  createSubscriptionPackage: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  booksize: state.subscriptionPackages.booksize,
  pagesize: state.subscriptionPackages.pagesize,
});
export default connect(mapStateToProps, {
  fetchSubscriptionPackages,
  createSubscriptionPackage,
})(Subscriptions);
