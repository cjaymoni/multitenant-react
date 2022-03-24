import React, { Component } from "react";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "../../../../shared/components/Table/Table.css";
import { connect } from "react-redux";
import {
  fetchInventories,
  fetchInventoryAssets,
  createInventory,
  editInventory,
  disableInventory,
} from "../../../../shared/redux/actions/inventoryActions";
import { fetchUsers } from "../../../../shared/redux/actions/userActions";
import { fetchDepartments } from "../../../../shared/redux/actions/departmentActions";
import PropTypes from "prop-types";
import Can from "../../../../shared/casl/can";
import { Form, Formik } from "formik";
import { InventorySchema } from "../../../../shared/utils/validation";
import {
  CardData,
  managerBodyTemplate,
  descriptionBodyTemplate,
  titleBodyTemplate,
} from "./const";
import TableUI from "../../../../shared/components/Table/Table";
import { AutoComplete } from "primereact/autocomplete";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      toggler1: false,
      toggler2: false,
      disableToggler: false,
      info: [],
      title: "",
      department_name: "",
      owner_name: "",
      showlists: false,
      globalFilter: "",
      location_id: "",
      manager_id: "",
      description: "",
      portalPlacement: "bottom",
      usersoptions: [],
      usersLoading: false,
      departmentoptions: [],
      departmentsLoading: false,
      locationoptions: [],
      locationLoading: false,
      isLoading: false,
      usersLoaded: false,
      locationLoaded: false,
      departmentLoaded: false,
      filteredDepartments: null,
      selectedHead: null,
      filteredHeads: null,
      selectedDepartment: null,

      loading: false,
    };
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openInventoryDetails = this.openInventoryDetails.bind(this);
    this.reset = this.reset.bind(this);
    this.searchDepartment = this.searchDepartment.bind(this);
    this.searchHead = this.searchHead.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchDepartments();
  }
  searchDepartment(event) {
    setTimeout(() => {
      let filteredDepartments;
      if (!event.query.trim().length) {
        filteredDepartments = [...this.props.departments];
      } else {
        filteredDepartments = this.props.departments.filter((option) => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredDepartments });
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
              item.info.last_name,
              " ",
              item.info.middle_name,
              " ",
              item.info.first_name
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
  async hideComponent() {
    await this.setState({ showlists: !this.state.showlists });
    this.loadinventory();
  }

  toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    var rowd = rowData;
    this.setState({
      [toggler]: !togglerStatus,
      info: rowData,
      rowd,
    });
  }
  handleOpen(toggler) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
    });
  }

  reset() {
    this.setState({ globalFilter: "" });
    this.dt.reset();
  }

  updateInventory() {
    const id = this.state.info.id;
    const inventoryPayload = {
      title: this.state.title || this.state.info.title,
      manager_id: this.state.manager_id.id || this.state.info.manager_id,
      description: this.state.description || this.state.info.description,
      location_id: this.state.location_id.id || this.state.info.location_id,
    };

    this.props.editInventory(id, inventoryPayload);
    console.log(id, inventoryPayload);
  }

  deleteInventory() {
    const deleteInventory = {
      id: this.state.info.id,
    };
    this.props.deleteInventory(deleteInventory);
  }
  disableInventory() {
    const id = this.state.info.id;
    const updateData = {
      status: "false",
    };
    this.props.disableInventory(id, updateData);
  }

  handleChange(evt, field) {
    // check it out: we get the evt.target.title (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same title, using bracket syntax
    this.setState({ [field]: evt.target.value });
  }

  handleClose() {
    this.setState({ toggler: false });
    this.setState({ toggler1: false });
    this.setState({ toggler2: false });
    this.setState({ disableToggler: false });
    this.setState({ showlists: false });
  }

  newInventoryDialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
    </React.Fragment>
  );
  async openInventoryDetails(rowData) {
    const row = rowData;
    await localStorage.setItem("inv_id", row.id);
    return window.location.assign("/inventoryinfo");
  }

  itemDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        // onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        // onClick={saveInventory}
      />
    </React.Fragment>
  );
  editInventoryDialogFooter = (
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
          this.updateInventory();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );
  InventoryDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        form="upform"
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
    </React.Fragment>
  );

  deleteInventoriesDialogFooter = (
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
          this.disableInventory();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  managerBody(rowData) {
    return (
      rowData.manager.info.last_name + " " + rowData.manager.info.first_name
    );
  }

  render() {
    const initialValues = {
      title: "",
      description: "",
      manager_id: "",
      department_id: "",
    };

    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Can do="info" on="Inventories">
            <Button
              icon="pi pi-info"
              className="p-button-rounded p-button-info p-mr-2"
              tooltip="More info"
              onClick={() => this.openInventoryDetails(rowData)}
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="edit" on="Inventories">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning p-mr-2"
              onClick={() => this.toggle("toggler", rowData)}
              tooltip="Edit"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="disable" on="Inventories">
            <Button
              icon="pi pi-ban"
              className="p-button-rounded p-button-danger"
              onClick={() => this.toggle("disableToggler", rowData)}
              tooltip="Delete"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="delete" on="Inventories">
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger"
              // onClick={() => confirmDeleteInventory(rowData)}
              tooltip="Delete"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
        </React.Fragment>
      );
    };

    const inventoryColumns = [
      { field: "title", header: "Inventory Name" },
      {
        field: "description",
        header: "Description",
      },
      { header: "Manager", body: managerBodyTemplate },
      { header: "Action(s)", body: actionBodyTemplate },
    ];
    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Inventory info
        </h2>
        <br></br>

        <div className="p-grid cardFstyle ">
          <div className="p-col-12 p-md-6 p-lg-3">
            <CardDemo
              title="Total inventory"
              icon="pi pi-bookmark"
              color="#cae6fc"
              iconColor="#2196f3"
              content={this.props.booksize}
              update="1"
            ></CardDemo>
          </div>
          <div className="p-col-12 p-md-6 p-lg-3">
            <CardDemo
              title="Total active"
              icon="pi pi-user-plus"
              color="#e7cbec"
              iconColor="#9c27b0"
              content={this.props.pagesize}
              update="1"
            ></CardDemo>
          </div>
          <div className="p-col-12 p-md-6 p-lg-3">
            <CardDemo
              title="Total active"
              icon="pi pi-user-plus"
              color="#fde0c2"
              iconColor="#f57c00"
              content={this.props.pagesize}
              update="1"
            ></CardDemo>
          </div>
        </div>

        <br></br>

        <div className="datatable-responsive-demo">
          <TableUI
            columns={inventoryColumns}
            fetchFunction={this.props.fetchInventories}
            tableHeader="Manage Inventories"
            clickFunction={() => this.handleOpen("toggler2")}
            style={{
              width: "76vw",
              marginLeft: "15px",
              marginBottom: "0px",
              marginTop: "0px",
            }}
            figment={{
              position: "absolute",
              top: "4%",
              left: "30%",
              height: "35px",
              width: "40%",
            }}
          />
        </div>

        <Dialog
          draggable={false}
          visible={this.state["toggler2"]}
          style={{ width: "40vw" }}
          header="Create New Inventory"
          modal
          className="p-fluid"
          footer={this.InventoryDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={InventorySchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              const postData = {
                title: values.title,
                manager_id: values.manager_id.id,
                department_id: values.department_id.value,
                description: values.description,
              };
              this.props.createInventory(postData);
              console.log(postData);
            }}
          >
            {(props) => {
              const { handleChange, values, errors } = props;
              return (
                <>
                  <Form id="upform">
                    <div className="formgrid grid">
                      <div className="field col-12">
                        <label
                          htmlFor="namefItem"
                          className="block font-normal"
                        >
                          Inventory name
                        </label>
                        <InputText
                          id="title"
                          name="title"
                          placeholder="Inventory name"
                          value={values.title}
                          onChange={(event) => handleChange(event, "title")}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Name of Inventory"
                        />
                        <small>eg: Research Inventory</small>

                        <div className="error-message mt-1">{errors.title}</div>
                      </div>

                      <div className="field col-12">
                        <label
                          htmlFor="namefItem"
                          className="block font-normal"
                        >
                          Inventory Manager
                        </label>
                        <AutoComplete
                          name="manager_id"
                          id="manager_id"
                          className="w-full"
                          dropdown
                          suggestions={this.state.filteredHeads}
                          completeMethod={this.searchHead}
                          field="email"
                          itemTemplate={this.headTemplate}
                          placeholder="Select Inventory Owner"
                          value={props.values.manager_id}
                          onChange={(selectedOption) => {
                            let event = {
                              target: {
                                name: "manager_id",
                                value: selectedOption.target.value,
                              },
                            };
                            handleChange(event);
                          }}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Name of Inventory Owner"
                        />
                        <small>eg: Kofi Amoah</small>

                        <div className="error-message">{errors.manager_id}</div>
                      </div>

                      <div className="field col-12">
                        <label
                          htmlFor="namefItem"
                          className="block font-normal"
                        >
                          Department
                        </label>
                        <AutoComplete
                          name="department_id"
                          id="department_id"
                          className="w-full"
                          dropdown
                          suggestions={this.state.filteredDepartments}
                          completeMethod={this.searchDepartment}
                          field="title"
                          placeholder="Select Department"
                          value={props.values.department_id}
                          onChange={(selectedOption) => {
                            let event = {
                              target: {
                                name: "department_id",
                                value: selectedOption.target.value,
                              },
                            };
                            handleChange(event);
                          }}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Name of Inventory Owner"
                        />
                        <small>eg: R&I Department</small>

                        <div className="error-message">
                          {errors.department_id}
                        </div>
                      </div>

                      <div className="field col-12">
                        <label
                          htmlFor="namefItem"
                          className="block font-normal"
                        >
                          Description
                        </label>
                        <InputTextarea
                          id="description"
                          placeholder="Description"
                          name="description"
                          value={values.description}
                          onChange={handleChange("description")}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Description"
                        />
                        <small>eg: Department's Inventory</small>

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
          visible={this.state["toggler"]}
          style={{ width: "40vw" }}
          header="Edit Inventory Details"
          modal
          className="p-fluid"
          footer={this.editInventoryDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="departmentName" className="block font-normal">
                Inventory title
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
                Inventory owner
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
            <div className="field col-12">
              <label htmlFor="departmentName" className="block font-normal">
                Inventory description
              </label>

              <InputTextarea
                id="description"
                title="description"
                defaultValue={this.state.info.description}
                onChange={(event) => this.handleChange(event, "description")}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["disableToggler"]}
          style={{ width: "30vw" }}
          header="Confirm Delete"
          modal
          footer={this.deleteInventoriesDialogFooter}
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

Inventory.propTypes = {
  fetchInventories: PropTypes.func.isRequired,
  fetchInventoryAssets: PropTypes.func.isRequired,
  inventories: PropTypes.array.isRequired,
  inventoryasset: PropTypes.array.isRequired,
  createInventory: PropTypes.func.isRequired,
  editInventory: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
  disableInventory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  inventories: state.inventories.inventories,
  inventoryasset: state.inventories.invassets,
  users: state.users.users,
  departments: state.departments.departments,
  booksize: state.inventories.booksize,
  pagesize: state.inventories.pagesize,
});

export default connect(mapStateToProps, {
  fetchInventories,
  disableInventory,
  fetchUsers,
  fetchInventoryAssets,
  createInventory,
  editInventory,
  fetchDepartments,
})(Inventory);
