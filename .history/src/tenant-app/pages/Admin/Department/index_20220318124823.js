import React, { Component } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "../../../../shared/components/Table/Table.css";
import { connect } from "react-redux";
import {
  fetchDepartments,
  editDepartment,
  deleteDepartment,
  createDepartment,
  disableDepartment,
} from "../../../../shared/redux/actions/departmentActions";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import Can from "../../../../shared/casl/can";
import { Form, Formik } from "formik";
import { DepartmentSchema } from "../../../../shared/utils/validation";
import { fetchLocation } from "../../../../shared/redux/actions/locationActions";
import { fetchUsers } from "../../../../shared/redux/actions/userActions";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { headBodyTemplate, dateBodyTemplate } from "./const";
import TableUI from "../../../../shared/components/Table/Table";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      deleteToggler: false,
      createToggler: false,
      toggler2: false,
      info: [],
      infohead: [],
      title: "",
      location_id: "",
      manager_id: "",
      selectedDepartment: null,
      selectedLocation: null,
      globalFilter: "",
      portalPlacement: "bottom",
      locationoptions: [],
      usersoptions: [],
      userLoading: false,

      isLoading: false,
      usersLoaded: false,
      loactionLoaded: false,
      loading: false,
      filteredLocations: null,
      selectedHead: null,
      filteredHeads: null,
    };
    this.searchLocation = this.searchLocation.bind(this);
    this.searchHead = this.searchHead.bind(this);

    this.reset = this.reset.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount() {
    // this.props.fetchDepartments();
    this.props.fetchLocation();
    this.props.fetchUsers();
  }
  searchLocation(event) {
    setTimeout(() => {
      let filteredLocations;
      if (!event.query.trim().length) {
        filteredLocations = [...this.props.locations];
      } else {
        filteredLocations = this.props.locations.filter((option) => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredLocations });
      // console.log(filteredOptions);
    }, 250);
  }
  searchHead(event) {
    setTimeout(() => {
      let filteredHeads;
      if (!event.query.trim().length) {
        filteredHeads = [...this.props.users];
      } else {
        filteredHeads = this.props.users
          .filter((i) => i.role.title === "Head of Department")
          .filter((option) => {
            return (
              option.email.toLowerCase().startsWith(event.query.toLowerCase()),
              option.info.last_name,
              option.info.first_name,
              option.info.middle_name
            );
          });
      }

      this.setState({ filteredHeads });
      // console.log(filteredOptions);
    }, 250);
  }
  headTemplate(item) {
    return (
      <>
        <div className="flex">
          <div className="font-bold flex mr-1">Name:</div>
          <div className="flex">
            {"  ".concat(
              item.last_name,
              " ",
              item.middle_name,
              " ",
              item.first_name
            )}
          </div>
        </div>
        <div className="flex mt-1">
          <div className="font-bold flex mr-1">Email: </div>
          <div className="flex"> {item.email}</div>
        </div>
      </>
    );
  }
  handleChange(evt, field) {
    // check it out: we get the evt.target.title (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same title, using bracket syntax
    this.setState({ [field]: evt.target.value });
  }

  toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    var rowd = rowData;
    this.setState({
      [toggler]: !togglerStatus,
      info: rowData,
      infohead: rowData.head_of_department,
      rowd,
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
    this.setState({ toggler2: false });
    this.setState({ deleteToggler: false });
    this.setState({ createToggler: false });
    this.setState({ showlists: false });
  }

  handleInputChange(e) {
    this.setState({ [e.target.title]: e.target.value });
  }

  handleLocationChange(e) {
    this.setState({ selectedLocation: e.value });
  }

  updateDepartment() {
    const id = this.state.info.id;
    const departmentPayload = {
      title: this.state.title || this.state.info.title,
      location_id: this.state.location_id.id || this.state.info.location_id,
      manager_id: this.state.manager_id.id || this.state.info.manager_id,
    };

    this.props.editDepartment(id, departmentPayload);
  }

  deleteDepartment() {
    const id = this.state.info.id;
    this.props.deleteDepartment(id);
  }
  disableDepartment() {
    const id = this.state.info.id;
    const updateData = {
      status: false,
    };
    this.props.disableDepartment(id, updateData);
  }

  editDepartmentDialogFooter = (
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
          this.updateDepartment();
          this.handleClose();
        }}
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

  deleteDepartmentDialogFooter = (
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
          this.disableDepartment();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  createDepartmentDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
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

  reset() {
    this.setState({ globalFilter: "" });
    this.dt.reset();
  }

  render() {
    const initialValues = {
      title: "",
      location_id: "",
      manager_id: "",
    };

    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Can do="info" on="Department">
            <Button
              icon="pi pi-info"
              className="p-button-rounded p-button-info mr-2"
              onClick={() => this.toggle("toggler2", rowData)}
              tooltip="Info"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          <Can do="edit" on="Department">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning mr-2"
              onClick={() => this.toggle("toggler", rowData)}
              tooltip="Edit"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          <Can do="edit" on="Department">
            <Button
              icon="pi pi-plus"
              className="p-button-rounded p-button-success mr-2"
              onClick={() => this.toggle("toggler", rowData)}
              tooltip="Add To Branch"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          <Can do="disable" on="Department">
            <Button
              icon="pi pi-ban"
              className="p-button-rounded p-button-danger mr-2"
              onClick={() => this.toggle("deleteToggler", rowData)}
              tooltip="Delete"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          <Can do="delete" on="Department">
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger mr-auto"
              // onClick={() => this.toggle("deleteToggler", rowData)}
              tooltip="Delete"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
        </React.Fragment>
      );
    };

    const departmentColumns = [
      { field: "info.title", header: "Department Name" },
      { header: "Department Head", body: headBodyTemplate },
      { field: "created_at", header: "Branch", body: dateBodyTemplate },
      { header: "Action(s)", body: actionBodyTemplate },
    ];
    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Department info
        </h2>
        <br></br>
        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-lg-6 ">
            <CardDemo
              title="Total departments"
              icon="pi pi-shopping-cart"
              content={this.props.booksize}
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
            ></CardDemo>
          </div>

          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Active departments"
              icon="pi pi-folder-open"
              content={this.props.pagesize}
              color="#e7cbec"
              iconColor="#9c27b0"
              update="1"
            ></CardDemo>
          </div>
        </div>
        <br></br>

        <div className="datatable-responsive-demo">
          <div>
            <TableUI
              columns={departmentColumns}
              fetchFunction={this.props.fetchDepartments}
              tableHeader="Manage Departments"
              clickFunction={() => this.handleOpen("createToggler")}
              style={{
                width: "76vw",
                marginLeft: "15px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
              figment={{
                position: "absolute",
                top: "4%",
                left: "32%",
                height: "35px",
                width: "40%",
              }}
            />
          </div>
        </div>

        <Dialog
          draggable={false}
          visible={this.state["createToggler"]}
          style={{ width: "40vw" }}
          header="Create Department "
          modal
          className="p-fluid"
          footer={this.createDepartmentDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={DepartmentSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              const postData = {
                info: {
                  title: values.title,
                  description: values.description,
                },
                head_of_department_id: values.head_of_department_id.id,
              };
              this.props.createDepartment(postData);
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
                        <label htmlFor="name" className="block font-normal">
                          Department Name
                        </label>
                        <InputText
                          id="title"
                          placeholder="Department name"
                          name="title"
                          value={values.title}
                          onChange={(event) => handleChange(event, "title")}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Name of Department"
                        />
                        <small>eg: R&I Department </small>

                        <div className="error-message mt-1">{errors.title}</div>
                      </div>

                      <div className="field col-12">
                        <label htmlFor="email" className="block font-normal">
                          Department Head
                        </label>
                        <AutoComplete
                          name="head_of_department_id"
                          id="head_of_department_id"
                          className="w-full"
                          dropdown
                          suggestions={this.state.filteredHeads}
                          completeMethod={this.searchHead}
                          field="email"
                          itemTemplate={this.headTemplate}
                          placeholder="Select Head Of Department"
                          value={props.values.head_of_department_id}
                          onChange={(selectedOption) => {
                            let event = {
                              target: {
                                name: "head_of_department_id",
                                value: selectedOption.target.value,
                              },
                            };
                            handleChange(event);
                          }}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Head of Department"
                        />
                        <small>eg: Kofi Amoah</small>

                        <div className="error-message mt-1">
                          {errors.head_of_department_id}
                        </div>
                      </div>

                      <div className="field col-12">
                        <label htmlFor="name" className="block font-normal">
                          Department Description
                        </label>
                        <InputTextarea
                          id="description"
                          placeholder="Description"
                          name="description"
                          value={values.description}
                          onChange={(event) =>
                            handleChange(event, "description")
                          }
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Brief Description"
                        />
                        <small>eg: Department for Innovation</small>

                        <div className="error-message mt-1">
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
          visible={this.state["toggler"]}
          style={{ width: "40vw" }}
          header="Edit Department Details"
          modal
          className="p-fluid"
          footer={this.editDepartmentDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="departmentName" className="block font-normal">
                Department title
              </label>
              <InputText
                id="title"
                title="title"
                defaultValue={this.state.info.title}
                onChange={(event) => this.handleChange(event, "title")}
              />
            </div>
            <div className="field col-12">
              <label htmlFor="departmentName" className="block font-normal">
                Department location
              </label>

              <AutoComplete
                className="w-full"
                dropdown
                id="location_id"
                name="location_id"
                suggestions={this.state.filteredLocations}
                completeMethod={this.searchLocation}
                field="title"
                value={this.state.location_id}
                placeholder="Select Branches"
                defaultValue={this.state.info.location_id}
                onChange={(selectedOption) => {
                  this.setState({ location_id: selectedOption.target.value });
                }}
              />
            </div>

            <div className="field col-12">
              <label htmlFor="departmentName" className="block font-normal">
                Department Head
              </label>
              <AutoComplete
                className="w-full"
                dropdown
                id="manager_id"
                name="manager_id"
                suggestions={this.state.filteredHeads}
                completeMethod={this.searchHead}
                field="email"
                itemTemplate={this.headTemplate}
                value={this.state.manager_id}
                placeholder="Select Department Head"
                defaultValue={this.state.info.manager_id}
                onChange={(selectedOption) => {
                  this.setState({ manager_id: selectedOption.target.value });
                }}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["deleteToggler"]}
          style={{ width: "30vw" }}
          header="Confirm Delete"
          modal
          footer={this.deleteDepartmentDialogFooter}
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

        <Dialog
          draggable={false}
          visible={this.state["toggler2"]}
          style={{ width: "25vw" }}
          header="Department Info"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="namefItem" className="block font-normal">
                Department Name
              </label>
              <InputText value={this.state.info.title} disabled />
            </div>

            <div className="field col-12">
              <label htmlFor="namefItem" className="block font-normal">
                Department head"
              </label>
              <InputText
                value={"".concat(
                  this.state.infohead.last_name,
                  " ",
                  this.state.infohead.first_name
                )}
                disabled
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

Department.propTypes = {
  fetchDepartments: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
  editDepartment: PropTypes.func.isRequired,
  deleteDepartment: PropTypes.func.isRequired,
  createDepartment: PropTypes.func.isRequired,
  fetchLocation: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  fetchUsers: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  disableDepartment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  departments: state.departments.departments,
  locations: state.locations.locations,
  users: state.users.users,
  booksize: state.departments.booksize,
  pagesize: state.departments.pagesize,
});

export default connect(mapStateToProps, {
  fetchDepartments,
  editDepartment,
  deleteDepartment,
  createDepartment,
  fetchUsers,
  fetchLocation,
  disableDepartment,
})(Department);
