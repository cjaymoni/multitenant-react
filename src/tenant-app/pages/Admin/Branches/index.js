import React, { Component } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "../../../../shared/components/Table/Table.css";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { createCountry } from "../../../../shared/redux/actions/countryActions";
import { createSubCountry } from "../../../../shared/redux/actions/subcountryActions";
import { createCity } from "../../../../shared/redux/actions/cityActions";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { fetchCities } from "../../../../shared/redux/actions/cityActions";
import {
  fetchLocation,
  updateLocation,
  deleteLocation,
  createLocation,
  fetchLocDepartments,
  disableLocation,
} from "../../../../shared/redux/actions/locationActions";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import Can from "../../../../shared/casl/can";
import { LocationSchema } from "../../../../shared/utils/validation";
import TableUI from "../../../../shared/components/Table/Table";
import { dateBodyTemplate, depDateTemplate } from "./const";
import { AutoComplete } from "primereact/autocomplete";
import { InputMask } from "primereact/inputmask";
class Branches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      toggler1: false,
      toggler2: false,
      toggler3: false,
      toggler4: false,
      openinfo: false,
      info: [],
      digital_address: "",
      title: "",
      description: "",
      postal_address: "",
      street_address: "",
      url: "",
      phone: "",
      email: "",
      selectedStatus: "",
      globalFilter: "",
      modalFilter: "",
    };
    this.toggle = this.toggle.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLocInfoOpen = this.handleLocInfoOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {}

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
  async handleLocInfoOpen(rowData) {
    await localStorage.setItem("loc_id", rowData.id);
    //  this.props.fetchLocationDepartments(rowData.id);
    return this.setState({ openinfo: true, info: rowData });
  }

  addLocationFooter = (
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

  editLocationDialogFooter = (
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

  deleteLocationDialogFooter = (
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
  update() {
    const id = this.state.info.id;
    const updateData = {
      title: this.state.title || this.state.info.title,
      digital_address:
        this.state.digital_address || this.state.info.digital_address,
      postal_address:
        this.state.postal_address || this.state.info.postal_address,
      street_address:
        this.state.street_address || this.state.info.street_address,
      url: this.state.url || this.state.info.url,
      phone: this.state.phone || this.state.info.phone,
      email: this.state.email || this.state.info.email,
      description: this.state.description || this.state.info.description,
    };
    this.props.updateLocation(id, updateData);
  }

  deleteLocation() {
    const id = this.state.info.id;
    this.props.deleteLocation(id);
  }

  disableLocation() {
    const id = this.state.info.id;
    const payLoad = {
      status: "false",
    };
    this.props.disableLocation(id, payLoad);
  }

  render() {
    const initialValues = {
      title: "",
      digital_address: "",
      phone: "",
      email: "",
      description: "",
      postal_address: "",
      street_address: "",
      url: "",
    };

    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Can do="info" on="Branches">
            <Button
              icon="pi pi-info"
              className="p-button-rounded p-button-info p-mr-2"
              onClick={() => this.handleLocInfoOpen(rowData)}
              tooltip="More Info"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="edit" on="Branches">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning p-mr-2"
              onClick={() => this.toggle("toggler2", rowData)}
              tooltip="Edit"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="disable" on="Branches">
            <Button
              icon="pi pi-ban"
              className="p-button-rounded p-button-danger p-mr-2"
              onClick={() => this.toggle("toggler4", rowData)}
              tooltip="Delete"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="delete" on="Branches">
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
    const locationColumns = [
      { field: "title", header: "Branch Name" },
      { field: "phone", header: "Branch Contact" },

      {
        field: "street_address",
        header: "Street Address",
      },
      {
        field: "digital_address",
        header: "Digital Address",
      },
      { header: "Action(s)", body: actionBodyTemplate },
    ];

    const departmentColumns = [
      { field: "title", header: "Department Name" },
      { field: "created_at", header: "Date Created", body: depDateTemplate },
    ];

    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Branches info
        </h2>
        <br></br>
        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Total locations"
              icon="pi pi-shopping-cart"
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
              content={this.props.booksize}
            ></CardDemo>
          </div>
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Active locations"
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
              tableHeader="Manage Branches"
              columns={locationColumns}
              fetchFunction={this.props.fetchLocation}
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
          header="Add New Branch"
          modal
          className="p-fluid"
          footer={this.addLocationFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={LocationSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              // var head = 'htpp://'
              const postData = {
                title: values.title,
                phone: values.phone,
                email: values.email,
                description: values.description,
                postal_address: values.postal_address,
                street_address: values.street_address,
                url: values.url,
                digital_address: values.digital_address,
              };
              this.props.createLocation(postData);
              this.handleClose();
            }}
          >
            {(props) => {
              const { handleChange, values, errors, handleSubmit } = props;

              return (
                <>
                  <Form id="postform">
                    <div className="formgrid grid">
                      {/* <div className="field col-6">
                        <label htmlFor="currency" className="block font-normal">
                          City Name{" "}
                        </label>
                        <AutoComplete
                          className="w-full"
                          dropdown
                          suggestions={this.state.filteredCities}
                          completeMethod={this.searchCity}
                          field="title"
                          placeholder="Search City"
                          value={props.values.city_id}
                          onChange={(selectedOption) => {
                            let event = {
                              target: {
                                name: "city_id",
                                value: selectedOption.target.value,
                              },
                            };
                            handleChange(event);
                          }}
                        />

                        <div className="error-message">{errors.city_id}</div>
                      </div> */}
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Branch Name
                        </label>
                        <InputText
                          id="title"
                          type="text"
                          name="title"
                          placeholder="Branch Name"
                          onChange={(event) => handleChange(event, "title")}
                          value={values.title}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Name of Branch"
                        />
                        <small>eg:AITI Accra</small>
                        <div className="error-message">{errors.title}</div>
                      </div>
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Branch Contact Number
                        </label>
                        <InputText
                          id="phone"
                          type="text"
                          name="phone"
                          maxlength={10}
                          placeholder="Branch Contact Number"
                          onChange={(event) => handleChange(event, "phone")}
                          value={values.phone}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Branch's Phone Number"
                        />
                        <small>eg: 02011002200</small>

                        <div className="error-message">{errors.phone}</div>
                      </div>
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Branch Email Address
                        </label>
                        <InputText
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Branch Email Address"
                          onChange={(event) => handleChange(event, "email")}
                          value={values.email}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Branch's email address"
                        />
                        <small>eg: example@mail.com</small>
                        <div className="error-message">{errors.email}</div>
                      </div>
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Postal Address
                        </label>
                        <InputText
                          id="postal_address"
                          type="text"
                          name="postal_address"
                          placeholder="Postal Address"
                          onChange={(event) =>
                            handleChange(event, "postal_address")
                          }
                          value={values.postal_address}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Branch's postal address"
                        />
                        <small>eg: 204 Miniistries</small>
                        <div className="error-message">
                          {errors.postal_address}
                        </div>
                      </div>
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Street Address
                        </label>
                        <InputText
                          id="street_address"
                          type="text"
                          name="street_address"
                          placeholder="Street Address"
                          onChange={(event) =>
                            handleChange(event, "street_address")
                          }
                          value={values.street_address}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Branch's street address"
                        />
                        <small>eg: Ridge Gardens</small>
                        <div className="error-message">
                          {errors.street_address}
                        </div>
                        <div className="error-message">
                          {errors.street_address}
                        </div>
                      </div>
                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Digital Address
                        </label>
                        <InputMask
                          id="digital_address"
                          name="digital_address"
                          mask="aa-999-9999"
                          placeholder="AA-001-1010"
                          value={values.digital_address}
                          onChange={(event) =>
                            handleChange(event, "digital_address")
                          }
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Location's digital address"
                        ></InputMask>
                        <small>eg: GR-845-6784</small>
                        <div className="error-message">
                          {errors.digital_address}
                        </div>
                      </div>

                      <div className="field col-6">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Branch Website
                        </label>
                        <InputText
                          id="url"
                          type="text"
                          name="url"
                          placeholder="Branch Website"
                          onChange={(event) => handleChange(event, "url")}
                          value={values.url}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Branch's website address"
                        />
                        <small>eg: https://www.aiti-accra.com</small>
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
                          placeholder="Branch's Description"
                          onChange={(event) =>
                            handleChange(event, "description")
                          }
                          value={values.description}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Branch's Description"
                        />
                        <small>eg: sub branch of aiti accra</small>
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
          header="Edit Branch Details"
          modal
          className="p-fluid"
          footer={this.editLocationDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="namefItem" className="block font-normal">
                Branch name
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
                Branch Contact
              </label>
              <InputText
                id="phone"
                type="text"
                name="phone"
                maxlength={10}
                placeholder="Branch Contact Number"
                onChange={(event) => this.handleChange(event, "phone")}
                defaultValue={this.state.info.phone}
              />
            </div>

            <div className="field col-6">
              <label htmlFor="firstname6" className="block font-normal">
                Branch Email Address
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
                Postal Address
              </label>
              <InputText
                id="postal_address"
                type="text"
                name="postal_address"
                placeholder="Postal Address"
                onChange={(event) => this.handleChange(event, "postal_address")}
                defaultValue={this.state.info.postal_address}
              />
            </div>

            <div className="field col-6">
              <label htmlFor="firstname6" className="block font-normal">
                Street Address
              </label>
              <InputText
                id="street_address"
                type="text"
                name="street_address"
                placeholder="Street Address"
                onChange={(event) => this.handleChange(event, "street_address")}
                defaultValue={this.state.info.street_address}
              />
            </div>
            <div className="field col-6">
              <label htmlFor="currency" className="block font-normal">
                Digital Address
              </label>
              <InputMask
                id="ghana_post"
                name="ghana_post"
                mask="aa-999-9999"
                placeholder={this.state.info.digital_address}
                defaultValue={this.state.info.digital_address}
                onChange={(event) =>
                  this.handleChange(event, "digital_address")
                }
              ></InputMask>
            </div>

            <div className="field col-6">
              <label htmlFor="firstname6" className="block font-normal">
                Branch Website
              </label>
              <InputText
                id="url"
                type="text"
                name="url"
                placeholder="Branch Website"
                defaultValue={this.state.info.url}
                onChange={(event) => this.handleChange(event, "url")}
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
                placeholder="Branch's Description"
                onChange={(event) => this.handleChange(event, "description")}
                defaultValue={this.state.info.description}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state.openinfo}
          style={{ width: "50vw" }}
          header="Branch Info"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="namefItem">Branch name</label>
              <InputText value={this.state.info.title} disabled />
            </div>
            <div className="field col-6">
              <label htmlFor="namefItem">Branch Contact</label>
              <InputText value={this.state.info.phone} disabled />
            </div>
          </div>
          <div className="formgrid grid">
            <TableUI
              tableHeader="Departments in Branch"
              columns={departmentColumns}
              fetchFunction={this.props.fetchLocDepartments}
              style={{
                width: "47vw",
                marginLeft: "5px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
              figment={{
                position: "absolute",
                top: "4%",
                left: "50%",
                height: "35px",
                width: "40%",
              }}
            />
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["toggler4"]}
          style={{ width: "30vw" }}
          header="Confirm Delete"
          modal
          footer={this.deleteLocationDialogFooter}
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

Branches.propTypes = {
  createCountry: PropTypes.func.isRequired,
  createSubCountry: PropTypes.func.isRequired,
  createCity: PropTypes.func.isRequired,
  createLocation: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  fetchLocDepartments: PropTypes.func.isRequired,
  departmentlocations: PropTypes.array.isRequired,
  deleteLocation: PropTypes.func.isRequired,
  fetchCities: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  disableLocation: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  locations: state.locations.locations,
  departmentlocations: state.locations.departmentlocations,
  cities: state.cities.cities,
  booksize: state.locations.booksize,
  pagesize: state.locations.pagesize,
});
export default connect(mapStateToProps, {
  fetchLocation,
  fetchCities,
  updateLocation,
  deleteLocation,
  fetchLocDepartments,
  disableLocation,
  createLocation,
  createCity,
  createCountry,
  createSubCountry,
})(Branches);
