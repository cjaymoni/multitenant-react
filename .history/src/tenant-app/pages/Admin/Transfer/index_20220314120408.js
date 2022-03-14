import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "../../../../shared/components/Table/Table.css";
import classNames from "classnames";
import { connect } from "react-redux";
import { fetchInventories } from "../../../../shared/redux/actions/inventoryActions";
import {
  fetchAssets,
  fetchAvailableAssets,
} from "../../../../shared/redux/actions/assetActions";
import {
  fetchLocation,
  fetchLocationDepartments,
} from "../../../../shared/redux/actions/locationActions";
import {
  transferAsset,
  transferInventory,
} from "../../../../shared/redux/actions/transferActions";
import PropTypes from "prop-types";
import Can from "../../../../shared/casl/can";
import moment from "moment";
import { fetchDepartments } from "../../../../shared/redux/actions/departmentActions";
import { invManagerTemplate } from "./const";
import TableUI from "../../../../shared/components/Table/Table";
import { AutoComplete } from "primereact/autocomplete";

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showasset: true,
      showinventory: false,
      showlocation: true,
      showreceiver: true,
      toggler: false,
      toggler1: false,
      toggler2: false,
      toggler3: false,
      portalPlacement: "bottom",
      info: [],
      transfertype: "External",
      globalFilter: "",
      modalFilter: "",
      departmentoptions: [],
      inventoryoptions: [],
      locationoptions: [],
      isLoading: false,
      departmentLoading: false,
      inventoryLoading: false,
      inventoryLoaded: false,
      departmentLoaded: false,
      locationLoaded: false,
      department_id: null,
      inventory_id: "",
      location_id: "",
      filteredDepartments: null,
      selectedDepartment: null,
      filteredLocations: null,
      selectedLocation: null,
      filteredInventories: null,
      selectedInventory: null,
      selectedTransfertype: null,
      lazyParams: {
        first: 0,
        rows: 1,
        page: 2,
      },
    };
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.hideComponent = this.hideComponent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hideFields = this.hideFields.bind(this);
    this.searchDepartment = this.searchDepartment.bind(this);
    this.searchLocation = this.searchLocation.bind(this);
    this.searchInventory = this.searchInventory.bind(this);
  }

  componentDidMount() {
    // this.props.fetchAssets();
    this.props.fetchDepartments();
    this.props.fetchInventories();
    this.props.fetchLocation();
  }

  toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
      info: rowData,
      transfertype: "Internal",
    });
  }

  handleClose() {
    this.setState({ toggler: false });
    this.setState({ toggler1: false });
    this.setState({ toggler2: false });
    this.setState({ toggler3: false });
    this.setState({ showlocation: false });
    this.setState({ showreceiver: false });
  }
  reset() {
    this.setState({ globalFilter: "", modalFilter: "" });
    // this.lt.reset();
    this.dt.reset();
  }

  hideComponent(name) {
    switch (name) {
      case "showasset":
        this.setState({ showasset: !this.state.showasset });
        this.setState({ showinventory: false });
        break;
      case "showinventory":
        this.setState({ showinventory: !this.state.showinventory });
        this.setState({ showasset: false });
        break;
      default:
        this.setState({ showasset: false, showinventory: false });
    }
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

  searchInventory(event) {
    setTimeout(() => {
      let filteredInventories;
      if (!event.query.trim().length) {
        filteredInventories = [...this.props.inventories];
      } else {
        filteredInventories = this.props.inventories.filter((option) => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredInventories });
      // console.log(filteredOptions);
    }, 250);
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
  hideFields = (e) => {
    this.setState({ transfertype: e.value });
    console.log(this.state.transfertype);
    if (this.state.transfertype === "External") {
      this.setState({
        showreceiver: true,
      });
    } else {
      this.setState({
        showreceiver: true,
        showlocation: true,
      });
    }
  };
  historyDialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
    </React.Fragment>
  );

  assetDialogFooter = (
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
        onClick={() => {
          this.transferAsset();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );
  inventoryDialogFooter = (
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
        onClick={() => {
          this.transferInventory();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange(evt, field) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [field]: evt.target.value });
  }

  ttype = [
    { label: "Internal", value: "Internal" },
    { label: "External", value: "External" },
  ];

  transferAsset() {
    const id = this.state.info.id;
    const updateData = {
      department_id: this.state.department_id,
      inventory_id: this.state.inventory_id,
    };
    this.props.transferAsset(updateData, id);
  }

  transferInventory() {
    const id = this.state.info.id;
    const updateData = {
      department_id: this.state.department_id,
      location_id: this.state.location_id,
    };
    this.props.transferInventory(updateData, id);
  }

  render() {
    const { showasset, showinventory } = this.state;

    const inventoryAction = (rowData) => {
      return (
        <React.Fragment>
          <div className="p-d-flex">
            <Can do="add" on="Transfer">
              <Button
                icon="pi pi-external-link"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => this.toggle("toggler2", rowData)}
                tooltip="Transfer"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
            &nbsp;&nbsp;
            <Can do="info" on="Transfer">
              <Button
                icon="pi pi-clock"
                className="p-button-rounded p-button-info"
                onClick={() => this.toggle("toggler3", rowData)}
                tooltip="History"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
          </div>
        </React.Fragment>
      );
    };

    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <div className="p-d-flex">
            <Can do="add" on="Transfer">
              <Button
                icon="pi pi-external-link"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => this.toggle("toggler", rowData)}
                tooltip="Transfer"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
            &nbsp;&nbsp;
            <Can do="info" on="Transfer">
              <Button
                icon="pi pi-clock"
                className="p-button-rounded p-button-info"
                onClick={() => this.toggle("toggler1", rowData)}
                tooltip="History"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
            &nbsp;
          </div>
        </React.Fragment>
      );
    };

    const assetColumns = [
      { field: "title", header: "Asset Name" },
      { field: "code", header: "Asset Code" },
      {
        field: "serial_number",
        header: "Serial Number",
      },
      { header: "Action(s)", body: actionBodyTemplate },
    ];
    const inventoryColumns = [
      { field: "title", header: "Inventory Name" },
      { header: "Inventory Manager", body: invManagerTemplate },
      {
        field: "description",
        header: "Description",
      },
      { header: "Action(s)", body: inventoryAction },
    ];
    const totAssets = this.props.assetSize;
    const totInventory = this.props.invSize;
    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Transfer info
        </h2>
        <br></br>
        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Total Assets"
              icon="pi pi-sort-alt"
              content={totAssets}
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
            ></CardDemo>
          </div>
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Total Inventory"
              icon="pi pi-sort-alt"
              content={totInventory}
              color="#e7cbec"
              iconColor="#9c27b0"
              update="1"
            ></CardDemo>
          </div>
        </div>
        <br></br>

        <div style={{ marginLeft: "20px" }}>
          <Button
            icon="pi pi-shopping-cart"
            label="Transfer Asset"
            onClick={() => this.hideComponent("showasset")}
          ></Button>
          &nbsp; &nbsp;
          <Button
            icon="pi pi-table"
            label="Transfer Inventory"
            onClick={() => this.hideComponent("showinventory")}
          ></Button>
        </div>
        <br></br>
        <div className="datatable-responsive-demo">
          {showasset && (
            <div>
              <TableUI
                tableHeader="Transfer Asset"
                columns={assetColumns}
                fetchFunction={this.props.fetchAvailableAssets}
                style={{
                  width: "76vw",
                  marginLeft: "15px",
                  marginBottom: "0px",
                  marginTop: "0px",
                }}
              />
            </div>
          )}

          {showinventory && (
            <div className="datatable-responsive-demo">
              <TableUI
                tableHeader="Transfer Inventory"
                columns={inventoryColumns}
                fetchFunction={this.props.fetchInventories}
                style={{
                  width: "76vw",
                  marginLeft: "15px",
                  marginBottom: "0px",
                  marginTop: "0px",
                }}
              />
            </div>
          )}
        </div>

        <Dialog
          draggable={false}
          visible={this.state["toggler"]}
          style={{ width: "40vw" }}
          header="Transfer Asset"
          modal
          className="p-fluid"
          footer={this.assetDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="namefItem" className="block font-normal">
                Asset name
              </label>
              <InputText value={this.state.info.title} disabled />
            </div>
            <div className="field col-6">
              <label htmlFor="namefItem" className="block font-normal">
                Asset code
              </label>
              <InputText value={this.state.info.code} disabled />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="namefItem" className="block font-normal">
                Serial Number
              </label>
              <InputText value={this.state.info.serial_number} disabled />
            </div>
            <div className="field col-6">
              <label htmlFor="namefItem" className="block font-normal">
                Location
              </label>
              <AutoComplete
                name="location_id"
                id="location_id"
                className="w-full"
                dropdown
                suggestions={this.state.filteredLocations}
                completeMethod={this.searchLocation}
                field="title"
                placeholder="Select location"
                value={this.state.location_id}
                onChange={(selectedOption) => {
                  this.setState({
                    location_id: selectedOption.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="namefItem" className="block font-normal">
                Department
              </label>
              <AutoComplete
                className="w-full"
                dropdown
                name="department_id"
                id="department_id"
                suggestions={this.state.filteredDepartments}
                completeMethod={this.searchDepartment}
                field="title"
                placeholder="Select department"
                value={this.state.department_id}
                onChange={(selectedOption) => {
                  this.setState({
                    department_id: selectedOption.target.value,
                  });
                }}
              />
            </div>

            <div className="field col-6">
              <label htmlFor="namefItem" className="block font-normal">
                Inventory
              </label>
              <AutoComplete
                name="inventory_id"
                id="inventory_id"
                className="w-full"
                dropdown
                suggestions={this.state.filteredInventories}
                completeMethod={this.searchInventory}
                field="title"
                placeholder="Select  Inventory"
                value={this.state.inventory_id}
                onChange={(selectedOption) => {
                  this.setState({ inventory_id: selectedOption.target.value });
                }}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["toggler1"]}
          style={{ width: "50vw" }}
          header="Asset Transfer History"
          modal
          className="p-fluid"
          footer={this.historyDialogFooter}
          onHide={this.handleClose}
        >
          <DataTable
            className={classNames("p-shadow-3", "p-datatable-gridlines")}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            style={{ width: "47vw" }}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          >
            <Column header="Transferred From"></Column>
            <Column header="Transferred To"></Column>
            <Column header="Date Transferred"></Column>
          </DataTable>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["toggler2"]}
          style={{ width: "40vw" }}
          header="Transfer Inventory"
          modal
          className="p-fluid"
          footer={this.inventoryDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="namefItem" className="block font-normal">
                Inventory name
              </label>
              <InputText value={this.state.info.title} disabled />
            </div>
            <div className="field col-6">
              <label htmlFor="namefItem" className="block font-normal">
                Date Created
              </label>
              <InputText
                value={moment(this.state.info.created_at).format("YYYY/MM/DD")}
                disabled
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="namefItem" className="block font-normal">
                Location
              </label>
              <AutoComplete
                name="location_id"
                id="location_id"
                className="w-full"
                dropdown
                suggestions={this.state.filteredLocations}
                completeMethod={this.searchLocation}
                field="title"
                placeholder="Select location"
                value={this.state.location_id}
                onChange={(selectedOption) => {
                  this.setState({
                    location_id: selectedOption.target.value,
                  });
                }}
              />
            </div>
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Department
              </label>
              <AutoComplete
                className="w-full"
                dropdown
                name="department_id"
                id="department_id"
                suggestions={this.state.filteredDepartments}
                completeMethod={this.searchDepartment}
                field="title"
                placeholder="Select department"
                value={this.state.department_id}
                onChange={(selectedOption) => {
                  this.setState({
                    department_id: selectedOption.target.value,
                  });
                }}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["toggler3"]}
          style={{ width: "50vw" }}
          header="Inventory Transfer History"
          modal
          className="p-fluid"
          footer={this.historyDialogFooter}
          onHide={this.handleClose}
        >
          <DataTable
            className={classNames("p-shadow-3", "p-datatable-gridlines")}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            style={{ width: "47vw" }}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          >
            <Column header="Transferred From"></Column>
            <Column header="Transferred To"></Column>
            <Column header="Date Transferred"></Column>
          </DataTable>
        </Dialog>
      </div>
    );
  }
}
Transfer.propTypes = {
  inventories: PropTypes.array.isRequired,
  fetchInventories: PropTypes.func.isRequired,
  fetchAssets: PropTypes.func.isRequired,
  assets: PropTypes.array.isRequired,
  transferAsset: PropTypes.func.isRequired,
  transferInventory: PropTypes.func.isRequired,
  departmentlocations: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  // fetchDepartments: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
  fetchAvailableAssets: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  inventories: state.inventories.inventories,
  assets: state.assets.items,
  departmentlocations: state.locations.departmentlocations,
  locations: state.locations.locations,
  departments: state.departments.departments,
  assetSize: state.assets.pagesize,
  invSize: state.inventories.pagesize,
});

export default connect(mapStateToProps, {
  fetchAssets,
  fetchAvailableAssets,
  fetchLocation,
  fetchLocationDepartments,
  fetchInventories,
  transferAsset,
  transferInventory,
  fetchDepartments,
})(Transfer);
