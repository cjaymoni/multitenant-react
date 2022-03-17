import React, { Component } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "../../../../shared/components/Table/Table.css";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { fetchCurrencies } from "../../../../shared/redux/actions/currencyActions";
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
      currency: "",
      country: "",
      ghana_post: "",
      title: "",
      city: "",
      portalPlacement: "bottom",
      selectedStatus: "",
      cityoptions: [],
      isLoading: false,
      cityLoaded: false,
      globalFilter: "",
      modalFilter: "",
      loading: false,
      selectedCity: null,
      filteredCities: null,
    };
    this.toggle = this.toggle.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.handleLocInfoOpen = this.handleLocInfoOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchCity = this.searchCity.bind(this);

    this.status = [
      { label: "Active", value: "AU" },
      { label: "InActive", value: "BR" },
    ];
  }

  componentDidMount() {
    this.props.fetchCities().then((data) => {
      this.setState({ cityoptions: data.payload.data });
    });
  }
  searchCity(event) {
    setTimeout(() => {
      let filteredCities;
      if (!event.query.trim().length) {
        filteredCities = [...this.state.cityoptions];
      } else {
        filteredCities = this.state.cityoptions.filter((option) => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredCities });
      // console.log(filteredOptions);
    }, 250);
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
    return this.setState({ openinfo: true });
  }

  onStatusChange(e) {
    this.setState({ selectedStatus: e.value });
  }

  onCityChange = (city) => {
    this.setState({ city });
  };

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
        onClick={() => this.handleClose()}
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
      ghana_post: this.state.ghana_post || this.state.info.ghana_post,
      // city_id: this.state.city_id || this.state.info.city_id,
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
      city_id: "",
      ghana_post: "",
    };

    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Can do="info" on=Branches>
            <Button
              icon="pi pi-info"
              className="p-button-rounded p-button-info p-mr-2"
              onClick={() => this.handleLocInfoOpen(rowData)}
              tooltip="More Info"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="edit" on=Branches>
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning p-mr-2"
              onClick={() => this.toggle("toggler2", rowData)}
              tooltip="Edit"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="disable" on=Branches>
            <Button
              icon="pi pi-ban"
              className="p-button-rounded p-button-danger p-mr-2"
              onClick={() => this.toggle("toggler4", rowData)}
              tooltip="Delete"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="delete" on=Branches>
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
      { field: "title", header: "Location Name" },
      {
        field: "ghana_post",
        header: "Digital Address",
      },
      { field: "created_at", header: "Date Created", body: dateBodyTemplate },
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
          Location info
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
              tableHeader="Manage Locations"
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
          header="Add New Location"
          modal
          className="p-fluid"
          footer={this.addLocationFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={LocationSchema}
            validateOnChange={false}
            initialValues={initialValues}
            onSubmit={(values) => {
              const postData = {
                title: values.title,
                city_id: values.city_id.id,
                ghana_post: values.ghana_post,
              };
              this.props.createLocation(postData);
              this.handleClose();
            }}
          >
            {(props) => {
              const { handleChange, values, errors } = props;

              return (
                <>
                  <Form id="postform">
                    <div className="formgrid grid">
                      <div className="field col-12">
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
                      </div>
                      <div className="field col-12">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Location name
                        </label>
                        <InputText
                          id="title"
                          type="text"
                          name="title"
                          placeholder="Location name"
                          onChange={(event) => handleChange(event, "title")}
                          value={values.title}
                          className={
                            errors.title ? "p-invalid p-d-block" : "p-d-block"
                          }
                        />
                      </div>
                      <div className="field col-12">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Digital Address
                        </label>
                        <InputMask
                          id="ghana_post"
                          name="ghana_post"
                          mask="aa-999-9999"
                          placeholder="AA-001-1010"
                          value={values.ghana_post}
                          onChange={(event) =>
                            handleChange(event, "ghana_post")
                          }
                        ></InputMask>
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
          style={{ width: "30vw" }}
          header="Edit Location Details"
          modal
          className="p-fluid"
          footer={this.editLocationDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Location name
              </label>
              <InputText
                id="title"
                name="title"
                defaultValue={this.state.info.title}
                onChange={(event) => this.handleChange(event, "title")}
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="currency" className="block font-normal">
                Digital Address{" "}
              </label>
              <InputMask
                id="ghana_post"
                name="ghana_post"
                mask="aa-999-9999"
                placeholder={this.state.info.ghana_post}
                defaultValue={this.state.info.ghana_post}
                onChange={(event) => this.handleChange(event, "ghana_post")}
              ></InputMask>
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state.openinfo}
          style={{ width: "50vw" }}
          header="Location Info"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <TableUI
              tableHeader="Departments in location"
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

Location.propTypes = {
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
})(Location);
