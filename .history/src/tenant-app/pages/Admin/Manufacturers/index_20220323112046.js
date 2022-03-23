import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import CardDemo from "../../../../shared/components/card/CardDemo";
import {
  createManufacturer,
  updateManufacturer,
  fetchManufacturers,
  deleteManufacturer,
  disableManufacturer,
} from "../../../../shared/redux/actions/manufacturerActions";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { Dialog } from "primereact/dialog";
import Can from "../../../../shared/casl/can";
import { ManufacturerSchema } from "../../../../shared/utils/validation";
import TableUI from "../../../../shared/components/Table/Table";

class Manufacturers extends Component {
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

  addManufacturerFooter = (
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

  editManufacturerDialogFooter = (
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
          this.update();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  deleteManufacturerDialogFooter = (
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
          this.disableLocation();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  update() {}

  deleteManufacturer() {}

  disableManufacturer() {}

  render() {
    const initialValues = {
      title: "",
      website: "",
      contact: "",
      description: "",
      email: "",
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
    const manufacturerColumns = [
      { field: "title", header: "Manufacturer Name" },
      { field: "email", header: "Email Address" },
      { field: "website", header: "Website" },

      { field: "contact", header: "Contact" },

      { header: "Action(s)", body: actionBodyTemplate },
    ];
    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Manufacturers info
        </h2>
        <br></br>
        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Total manufacturers"
              icon="pi pi-shopping-cart"
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
              content={this.props.booksize}
            ></CardDemo>
          </div>
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Active manufacturers"
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
              tableHeader="Manage Manufacturers"
              columns={manufacturerColumns}
              fetchFunction={this.props.fetchManufacturers}
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
          header="Add New Manufacturer"
          modal
          className="p-fluid"
          footer={this.addManufacturerFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={ManufacturerSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              // var head = 'htpp://'
              const postData = {
                title: values.title,
                scheme: this.props.tenantInfo.scheme,
                description: values.description,
                email: values.email,
                website: values.website,
                contact: values.contact,
              };
              this.props.createManufacturer(postData);
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
                          Manufacturer Name
                        </label>
                        <InputText
                          id="title"
                          type="text"
                          name="title"
                          placeholder="Manufacturer Name"
                          onChange={(event) => handleChange(event, "title")}
                          value={values.title}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Name of Manufacturer"
                        />
                        <small>eg:HP</small>
                        <div className="error-message">{errors.title}</div>
                      </div>
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Manufacturer Contact
                        </label>
                        <InputText
                          id="contact"
                          type="text"
                          name="contact"
                          maxlength={10}
                          placeholder="Manufacturer Contact "
                          onChange={(event) => handleChange(event, "contact")}
                          value={values.contact}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Manufacturer's Phone Number"
                        />
                        <small>eg: 02011002200</small>

                        <div className="error-message">{errors.phone}</div>
                      </div>
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Manufacturer Email Address
                        </label>
                        <InputText
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Manufacturer Email Address"
                          onChange={(event) => handleChange(event, "email")}
                          value={values.email}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Manufacturer's email address"
                        />
                        <small>eg: example@mail.com</small>
                        <div className="error-message">{errors.email}</div>
                      </div>

                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Manufacturer Website
                        </label>
                        <InputText
                          id="website"
                          type="text"
                          name="website"
                          placeholder="Manufacturer Website"
                          onChange={(event) => handleChange(event, "website")}
                          value={values.website}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Manufacturer's website address"
                        />
                        <small>eg: https://www.hp.com</small>
                        <div className="error-message">{errors.url}</div>
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
                          placeholder="Manufacturer's Description"
                          onChange={(event) =>
                            handleChange(event, "description")
                          }
                          value={values.description}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Description"
                        />
                        <small>eg: manufacture for hP laptops</small>
                        <div className="error-message">
                          {errors.description}
                        </div>
                      </div>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["toggler2"]}
          style={{ width: "35vw" }}
          header="Edit Manufacturer Details"
          modal
          className="p-fluid"
          footer={this.editManufacturerDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="namefItem" className="block font-normal">
                Manufacturer name
              </label>
              <InputText
                id="title"
                name="title"
                defaultValue={this.state.info.title}
                onChange={(event) => this.handleChange(event, "title")}
              />
            </div>

            <div className="field col-6">
              <label htmlFor="firstname6" className="block font-normal">
                Manufacturer Contact
              </label>
              <InputText
                id="contact"
                type="text"
                name="contact"
                maxlength={10}
                placeholder="Branch Contact"
                onChange={(event) => this.handleChange(event, "contact")}
                defaultValue={this.state.info.contact}
              />
            </div>

            <div className="field col-6">
              <label htmlFor="firstname6" className="block font-normal">
                Manufacturer Email Address
              </label>
              <InputText
                id="email"
                type="email"
                name="email"
                placeholder="Branch Email Address"
                onChange={(event) => this.handleChange(event, "email")}
                defaultValue={this.state.info.email}
              />
            </div>

            <div className="field col-6">
              <label htmlFor="firstname6" className="block font-normal">
                Manufacturer Website
              </label>
              <InputText
                id="website"
                type="text"
                name="website"
                placeholder="Manufacturer Website"
                defaultValue={this.state.info.website}
                onChange={(event) => this.handleChange(event, "website")}
              />
            </div>
            <div className="field col-6">
              <label htmlFor="firstname6" className="block font-normal">
                Description
              </label>
              <InputTextarea
                id="description"
                type="text"
                name="description"
                placeholder="Manufacturer's Description"
                onChange={(event) => this.handleChange(event, "description")}
                defaultValue={this.state.info.description}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["toggler1"]}
          style={{ width: "35vw" }}
          header="Manufacturer Info"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="namefItem">Manufacturer name</label>
              <InputText value={this.state.info.title} disabled />
            </div>
            <div className="field col-6">
              <label htmlFor="namefItem">Manufacturer Contact</label>
              <InputText value={this.state.info.contact} disabled />
            </div>
            <div className="field col-6">
              <label htmlFor="namefItem">Email Address</label>
              <InputText value={this.state.info.email} disabled />
            </div>{" "}
            <div className="field col-6">
              <label htmlFor="namefItem">Manufacturer Website</label>
              <InputText value={this.state.info.website} disabled />
            </div>
            <div className="field col-6">
              <label htmlFor="namefItem">Description</label>
              <InputTextarea value={this.state.info.description} disabled />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["toggler3"]}
          style={{ width: "30vw" }}
          header="Confirm Delete"
          modal
          footer={this.deleteManufacturerDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-2"
              style={{ fontSize: "2rem" }}
            />
            {this.state.info && (
              <span>
                Are you sure you want to delete <b>{this.state.info.title}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}

Manufacturers.propTypes = {
  createManufacturer: PropTypes.func.isRequired,
  deleteManufacturer: PropTypes.func.isRequired,
  disableManufacturer: PropTypes.func.isRequired,
  fetchManufacturers: PropTypes.func.isRequired,
  updateManufacturer: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  tenantInfo: state.tenants.tenantConfig,
  booksize: state.manufacturers.booksize,
  pagesize: state.manufacturers.pagesize,
});
export default connect(mapStateToProps, {
  fetchManufacturers,
  createManufacturer,
  updateManufacturer,
  disableManufacturer,
  deleteManufacturer,
})(Manufacturers);
