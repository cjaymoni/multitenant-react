import React, { Component } from "react";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { connect } from "react-redux";
import {
  fetchAssets,
  fetchAvailableAssets,
  editAsset,
  deleteAsset,
  createAsset,
  decommissionAsset,
} from "../../../../shared/redux/actions/assetActions";
import PropTypes from "prop-types";
import moment from "moment";
import { Calendar } from "primereact/calendar";
import Can from "../../../../shared/casl/can";

import { Form, Formik } from "formik";
import { fetchLocation } from "../../../../shared/redux/actions/locationActions";
import { fetchDepartments } from "../../../../shared/redux/actions/departmentActions";
import { fetchCategories } from "../../../../shared/redux/actions/categoryActions";
import { fetchVendors } from "../../../../shared/redux/actions/vendorActions";
import { fetchInventories } from "../../../../shared/redux/actions/inventoryActions";
import { RequestSchema } from "../../../../shared/utils/validation";
import { fetchPriorities } from "../../../../shared/redux/actions/recommendationActions";
import {
  editRequest,
  issueHeadRequest,
} from "../../../../shared/redux/actions/requestActions";
import {
  codeBodyTemplate,
  makeBodyTemplate,
  modelBodyTemplate,
  serialBodyTemplate,
  titleBodyTemplate,
} from "./const";
import TableUI from "../../../../shared/components/Table/Table";
import { AutoComplete } from "primereact/autocomplete";
import { InputNumber } from "primereact/inputnumber";
import withRouter from "../../../../shared/routes/withRouter";

class Asset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.emptyItem,
      decommission: this.emptyItem,
      selectedItems: null,
      submitted: false,
      globalFilter: "",
      toggler: false,
      toggler1: false,
      toggler2: false,
      toggler3: false,
      toggler4: false,
      toggler5: false,
      justiToggler: false,
      requestToggler: false,
      acceptToggler: false,
      showquality: true,
      showReturndate: true,
      showQuantity: true,
      info: [],
      title: "",
      code: "",
      description: "",
      category: "",
      amount: "",
      serial_number: "",
      model: "",
      make: "",
      vendor_name: "",
      location: "",
      sub_location: "",
      department_name: "",
      purchase_date: "",
      created_at: "",
      warranty_deadline: "",
      service_date: "",
      depreciation_algorithm: "",
      assigned_to: "",
      lifespan: "",
      dep_factor: "",
      salvage_amount: "",
      inventory_name: "",
      condition: "",
      author_name: "",
      portalPlacement: "bottom",
      decom_justif: "",
      categoryoptions: [],
      priorityoptions: [],
      departmentoptions: [],
      locationoptions: [],
      vendoroptions: [],
      inventoryoptions: [],
      isLoading: false,
      categoryLoading: false,
      priorityLoading: false,
      locationLoading: false,
      vendorLoading: false,
      departmentLoading: false,
      inventoryLoading: false,
      categoryLoaded: false,
      locationLoaded: false,
      vendorLoaded: false,
      departmentLoaded: false,
      inventoryLoaded: false,
      priorityLoaded: false,
      pdate: "",
      wdate: "",
      sdate: "",
      infoinv: [],
      infoven: [],
      loading: false,
      selectedPriority: null,
      filteredPriorities: null,
    };
    this.fetchAssetDetails = this.fetchAssetDetails.bind(this);
    this.searchPriority = this.searchPriority.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.reset = this.reset.bind(this);
    this.quantitySelectChange = this.quantitySelectChange.bind(this);
    this.returnDateView = this.returnDateView.bind(this);
    this.returnQuantityView = this.returnQuantityView.bind(this);
    this.monthNavigatorTemplate = this.monthNavigatorTemplate.bind(this);
    this.yearNavigatorTemplate = this.yearNavigatorTemplate.bind(this);
  }
  searchPriority(event) {
    setTimeout(() => {
      let filteredPriorities;
      if (!event.query.trim().length) {
        filteredPriorities = [...this.props.priorities];
      } else {
        filteredPriorities = this.props.priorities.filter((option) => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredPriorities });
      // console.log(filteredOptions);
    }, 250);
  }
  depreciationType = [
    {
      label: "Straight Line Depreciation",
      value: "straight_line_depreciation",
    },
    {
      label: "Declining Balance Depreciation",
      value: "declining_balance_depreciation",
    },
  ];

  returnabilty = [
    { label: "Returnable", value: "true" },
    { label: "Non-Returnable", value: "false" },
  ];
  numerability = [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ];

  returnDateView(rowData) {
    switch (rowData.returnable) {
      case true:
        this.setState({ showReturndate: true });
        break;
      case false:
        this.setState({ showReturndate: false });
        break;
      default:
        this.setState({ showReturndate: true });
    }
  }
  returnQuantityView(rowData) {
    switch (rowData.numerable) {
      case true:
        this.setState({ showQuantity: true });
        break;
      case false:
        this.setState({ showQuantity: false });
        break;
      default:
        this.setState({ showQuantity: true });
    }
  }

  quantitySelectChange(selectedOption) {
    switch (selectedOption.value) {
      case "true":
        this.setState({ showquality: true });
        break;
      case "false":
        this.setState({ showquality: false });
        break;
      default:
        this.setState({ showquality: true });
    }
  }

  reset() {
    this.setState({ globalFilter: "" });

    this.dt.reset();
  }
  toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
      info: rowData,
      infoven: rowData.vendor,
      infoinv: rowData.inventory,
      pdate: moment(rowData.purchase_date).format("YYYY-MM-DD"),
      wdate: moment(rowData.warranty_deadline).format("YYYY-MM-DD"),
      sdate: moment(rowData.service_date).format("YYYY-MM-DD"),
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
    this.setState({ toggler5: false });
    this.setState({ requestToggler: false });
    this.setState({ justiToggler: false });
  }

  componentDidMount() {
    // console.log(JSON.parse(localStorage.user));
    this.props.fetchLocation();
    this.props.fetchVendors();
    this.props.fetchInventories();
    this.props.fetchDepartments();
    this.props.fetchCategories();
    this.props.fetchPriorities();
  }

  formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  priceBodyTemplate = (rowData) => {
    return this.formatCurrency(rowData.amount);
  };

  statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`item-badge status-${rowData.assigned_to.toLowerCase()}`}
      >
        {rowData.assigned_to}
      </span>
    );
  };

  monthNavigatorTemplate(e) {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        style={{ lineHeight: 1 }}
      />
    );
  }

  yearNavigatorTemplate(e) {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        className="p-ml-2"
        style={{ lineHeight: 1 }}
      />
    );
  }
  handleChange(evt, field) {
    // check it out: we get the evt.target.name (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({ [field]: evt.target.value });
  }
  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  log() {
    console.log(this.state.info);
  }

  decommission() {
    const id = this.state.info.id;
    const postData = {
      decommission: true,
      decommission_justification: this.state.decom_justif,
    };
    this.props.decommissionAsset(id, postData);
  }

  decommissionItemDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        label="Proceed"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => this.handleOpen("justiToggler")}
      />
    </React.Fragment>
  );
  decommissionJustiDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        label="Decommission"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          this.handleClose();
          this.decommission();
        }}
      />
    </React.Fragment>
  );

  assignItemDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button label="Save" icon="pi pi-check" className="p-button-text" />
    </React.Fragment>
  );

  acceptDialogFooter = (
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
          this.handleClose();
          this.verifyRequest();
        }}
      />
    </React.Fragment>
  );

  async fetchAssetDetails(rowData) {
    await localStorage.setItem("assetid", rowData.id);

    return this.props.history.push("/assetinfo");
  }

  async createNewAsset() {
    return this.props.history.push("/assetform");
  }
  requestDialogFooter = (
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
        form="upform"
        onClick={() => this.handleClose()}
      />
    </React.Fragment>
  );
  verifyRequest() {
    const id = localStorage.request_id;
    const updateData = {
      action: "accepted",
    };
    // console.log(id,updateData)
    this.handleClose();
    this.setState({
      requestToggler: false,
      acceptToggler: false,
    });
    this.props.editRequest(updateData, id);
  }
  render() {
    const requestValues = {
      priority_id: "",
      start_date: "",
      end_date: "",
      quantity: "",
    };

    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <div className="p-d-flex">
            <Can do="info" on="Asset">
              <Button
                icon="pi pi-info"
                className="p-button-rounded p-button-info p-mr-2"
                // onClick={() => this.toggle("toggler5", rowData)}
                tooltip="More Info"
                onClick={() => this.fetchAssetDetails(rowData)}
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
            &nbsp;
            <Can do="edit" on="Asset">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-warning p-mr-2"
                onClick={() => this.fetchAssetDetails(rowData)}
                tooltip="Edit"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
            &nbsp;
            <Can do="disable" on="Asset">
              <Button
                icon="pi pi-ban"
                className="p-button-rounded p-button-danger  "
                onClick={() => this.toggle("toggler2", rowData)}
                tooltip="Decommission"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
            &nbsp;
            <Can do="delete" on="Asset">
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger  "
                // onClick={() => this.toggle("toggler2", rowData)}
                tooltip="Decommission"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
            <Can do="issue" on="Request">
              <Button
                icon="pi pi-external-link"
                tooltip="Request Item"
                tooltipOptions={{ position: "bottom" }}
                className="p-button-rounded p-button-success"
                onClick={() => {
                  this.toggle("requestToggler", rowData);
                  this.returnDateView(rowData);
                  this.returnQuantityView(rowData);
                }}
              ></Button>
            </Can>
          </div>
        </React.Fragment>
      );
    };

    const assetColumns = [
      { field: "title", header: "Asset Name", body: titleBodyTemplate },
      { field: "code", header: "Asset Code", body: codeBodyTemplate },
      {
        field: "serial_number",
        header: "Serial No.",
        body: serialBodyTemplate,
      },
      { field: "make", header: "Asset Make", body: makeBodyTemplate },
      { field: "model", header: "Asset Model", body: modelBodyTemplate },
      { header: "Action(s)", body: actionBodyTemplate },
    ];

    return (
      <div>
        <div>
          <h2
            className="p-mb-3 p-text-bold"
            style={{ marginLeft: "20px", color: "#495057" }}
          >
            Asset info
          </h2>
          <br></br>
          <div className="grid justify-between cardFstyle">
            <div className="p-col-12 p-md-6 p-lg-3">
              <CardDemo
                title="Total items"
                icon="pi pi-shopping-cart"
                color="#cae6fc"
                iconColor="#2196f3"
                update="1"
                content={this.props.booksize}
              ></CardDemo>
            </div>
            <div className="p-col-12 p-md-6 p-lg-3 ">
              <CardDemo
                title="Available items"
                icon="pi pi-users"
                color="#e7cbec"
                iconColor="#9c27b0"
                update="1"
                content={this.props.pagesize}
              ></CardDemo>
            </div>
            <div className="p-col-12 p-md-6 p-lg-3 ">
              <CardDemo
                title="Decommisioned items"
                icon="pi pi-user-minus"
                update="1"
                color="#fde0c2"
                iconColor="#f57c00"
                content={this.props.booksize - this.props.pagesize}
              ></CardDemo>
            </div>
          </div>

          <div className="datatable-responsive-demo">
            <TableUI
              columns={assetColumns}
              fetchFunction={this.props.fetchAvailableAssets}
              tableHeader="Assets List"
              addOn="AvailableAsset"
              clickFunction={() => this.createNewAsset()}
              style={{
                width: "76vw",
                marginLeft: "15px",
                marginBottom: "0px",
                marginTop: "30px",
              }}
              figment={{
                position: "absolute",
                top: "4%",
                left: "30%",
                height: "35px",
                width: "40%",
              }}
            />
            <div></div>
          </div>

          <Dialog
            draggable={false}
            visible={this.state["requestToggler"]}
            style={{ width: "40vw" }}
            header="Issue Request"
            modal
            className="p-fluid"
            footer={this.requestDialogFooter}
            onHide={this.handleClose}
          >
            <Formik
              validationSchema={RequestSchema}
              validateOnChange={false}
              initialValues={requestValues}
              onSubmit={async (values) => {
                const postData = {
                  item_id: this.state.info.id,
                  author_id: this.props.user.id,
                  priority_id: values.priority_id.id,
                  department_id: this.props.user.department_id,
                  start_date: moment(values.start_date).unix(),
                  end_date: moment(values.end_date).unix(),
                  action: "accepted",
                  inventory_id: this.state.infoinv.id,
                  quantity: values.quantity,
                };
                await this.props.issueHeadRequest(postData);
                return this.setState({
                  requestToggler: false,
                  acceptToggler: true,
                });
              }}
            >
              {(props) => {
                const { handleChange, values, errors } = props;
                return (
                  <>
                    <Form id="upform">
                      <div className="formgrid grid">
                        <div className="field col-6">
                          <label htmlFor="state" className="block font-normal">
                            Asset name
                          </label>
                          <InputText
                            id="asset_name"
                            value={this.state.info.title}
                            disabled
                          />
                        </div>
                        <div className="field col-6">
                          <label htmlFor="zip" className="block font-normal">
                            Asset code
                          </label>
                          <InputText
                            id="asset_code"
                            value={this.state.info.code}
                            disabled
                          />
                        </div>

                        <div className="field col-6">
                          <label
                            htmlFor="pickdate"
                            className="block font-normal"
                          >
                            PickUp Date
                          </label>
                          <Calendar
                            minDate={moment().toDate()}
                            id="start_date"
                            name="start_date"
                            placeholder="Pickup Date"
                            dateFormat="dd/mm/yy"
                            value={values.start_date}
                            onChange={(event) =>
                              handleChange(event, "start_date")
                            }
                            monthNavigator
                            yearNavigator
                            showIcon
                            yearRange="2021:2050"
                            className={
                              errors.start_date ? "p-invalid" : "p-flex"
                            }
                          />
                          <div className="error-message mt-1">
                            {errors.start_date}
                          </div>
                        </div>

                        {this.state.showReturndate && (
                          <div className="field col-6">
                            <label
                              htmlFor="returndate"
                              className="block font-normal"
                            >
                              Return Date
                            </label>
                            <Calendar
                              minDate={values.start_date}
                              id="end_date"
                              name="end_date"
                              placeholder="Return Date"
                              dateFormat="dd/mm/yy"
                              value={values.end_date}
                              onChange={(event) =>
                                handleChange(event, "end_date")
                              }
                              showIcon
                              monthNavigator
                              yearNavigator
                              yearRange="2021:2050"
                              className={
                                errors.end_date ? "p-invalid" : "p-flex"
                              }
                            />
                            <div className="error-message mt-1">
                              {errors.end_date}
                            </div>
                          </div>
                        )}

                        <div className="field col-6">
                          <label
                            htmlFor="lastname6"
                            className="block font-normal"
                          >
                            Select Urgency of item
                          </label>
                          <AutoComplete
                            name="priority_id"
                            id="priority_id"
                            className="w-full"
                            dropdown
                            suggestions={this.state.filteredPriorities}
                            completeMethod={this.searchPriority}
                            field="title"
                            placeholder="Select urgency level"
                            value={props.values.priority_id}
                            onChange={(selectedOption) => {
                              let event = {
                                target: {
                                  name: "priority_id",
                                  value: selectedOption.target.value,
                                },
                              };
                              handleChange(event);
                            }}
                          />

                          <div className="error-message">
                            {errors.priority_id}
                          </div>
                        </div>
                        {this.state.showQuantity && (
                          <div className="field col-6">
                            <label
                              htmlFor="namefItem"
                              className="block font-normal"
                            >
                              Quantity
                            </label>
                            <InputNumber
                              min={1}
                              id="quantity"
                              name="quantity"
                              showButtons
                              placeholder="Request quantity"
                              value={values.quantity}
                              onValueChange={(event) =>
                                handleChange(event, "quantity")
                              }
                            />
                          </div>
                        )}
                      </div>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </Dialog>

          <Dialog
            visible={this.state["acceptToggler"]}
            style={{ width: "35vw" }}
            header="Forward Request"
            modal
            draggable={false}
            className="p-fluid"
            footer={this.acceptDialogFooter}
            onHide={this.handleClose}
          >
            <div className="confirmation-content">
              <i className="pi pi-check mr-2" style={{ fontSize: "2rem" }} />

              <span>Forward Request To Store</span>
            </div>
          </Dialog>

          <Dialog
            visible={this.state["toggler2"]}
            style={{ width: "45vw" }}
            header="Decommission Details"
            modal
            draggable={false}
            className="p-fluid"
            footer={this.decommissionItemDialogFooter}
            onHide={this.handleClose}
          >
            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="namefItem" className="block font-normal">
                  Asset name
                </label>
                <InputText
                  id="title"
                  name="title"
                  value={this.state.info.title}
                  disabled
                />
              </div>
              <div className="field col">
                <label htmlFor="namefItem" className="block font-normal">
                  Asset code
                </label>
                <InputText
                  id="code"
                  name="code"
                  value={this.state.info.code}
                  disabled
                />
              </div>
              <div className="field col">
                <label htmlFor="namefItem" className="block font-normal">
                  Serial number
                </label>
                <InputText
                  id="serial_number"
                  name="serial_number"
                  value={this.state.info.serial_number}
                  disabled
                />
              </div>
            </div>
            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="namefItem" className="block font-normal">
                  Price
                </label>
                <InputText
                  id="amount"
                  name="amount"
                  value={this.state.info.amount}
                  disabled
                />
              </div>
              <div className="field col">
                <label htmlFor="namefItem" className="block font-normal">
                  Purchase Date
                </label>
                <InputText
                  id="purchase_date"
                  name="purchase_date"
                  value={moment(this.state.info.purchase_date).format(
                    "DD-MM-YYYY"
                  )}
                  disabled
                />
              </div>
              <div className="field col">
                <label htmlFor="namefItem" className="block font-normal">
                  Warranty Deadline
                </label>
                <InputText
                  id="ocation"
                  name="location"
                  value={moment(this.state.info.warranty_deadline).format(
                    "DD-MM-YYYY"
                  )}
                  disabled
                />
              </div>
            </div>
            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="namefItem" className="block font-normal">
                  Salvage Amount
                </label>
                <InputText
                  id="ocation"
                  name="location"
                  value={this.state.info.salvage_amount}
                  disabled
                />
              </div>
              <div className="field col">
                <label htmlFor="namefItem" className="block font-normal">
                  Depreciation Type
                </label>
                <InputText
                  id="ocation"
                  name="location"
                  value={this.state.info.depreciation_algorithm}
                  disabled
                />
              </div>
              <div className="field col">
                <label htmlFor="namefItem" className="block font-normal">
                  Depreciation %
                </label>
                <InputText
                  id="ocation"
                  name="location"
                  value={this.state.info.dep_factor}
                  disabled
                />
              </div>
            </div>
          </Dialog>

          <Dialog
            visible={this.state["justiToggler"]}
            style={{ width: "35vw" }}
            header="Decommission Justification"
            modal
            draggable={false}
            className="p-fluid"
            footer={this.decommissionJustiDialogFooter}
            onHide={this.handleClose}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-2"
                style={{ fontSize: "1.5rem" }}
              />

              <span>Enter Justification</span>
              <InputTextarea
                id="decom_justif"
                name="decom_justif"
                onChange={(event) => this.handleChange(event, "decom_justif")}
                value={this.state.decom_justif}
              />
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}
Asset.propTypes = {
  fetchAssets: PropTypes.func.isRequired,
  editAsset: PropTypes.func.isRequired,
  deleteAsset: PropTypes.func.isRequired,
  createAsset: PropTypes.func.isRequired,
  assets: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  vendors: PropTypes.array.isRequired,
  departments: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  inventories: PropTypes.array.isRequired,
  user: PropTypes.array.isRequired,
  decommissionAsset: PropTypes.func.isRequired,
  fetchPriorities: PropTypes.func.isRequired,
  priorities: PropTypes.array.isRequired,
  issueHeadRequest: PropTypes.func.isRequired,
  editRequest: PropTypes.func.isRequired,
  fetchAvailableAssets: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  assets: state.assets.items,
  booksize: state.assets.booksize,
  pagesize: state.assets.pagesize,
  user: state.auth.user,
  departments: state.departments.departments,
  locations: state.locations.locations,
  vendors: state.vendors.vendors,
  categories: state.categories.categories,
  inventories: state.inventories.inventories,
  priorities: state.recommendations.priorities,
});

export default withRouter(
  connect(mapStateToProps, {
    fetchAssets,
    fetchAvailableAssets,
    editAsset,
    deleteAsset,
    createAsset,
    decommissionAsset,
    fetchCategories,
    fetchDepartments,
    fetchInventories,
    fetchLocation,
    fetchVendors,
    fetchPriorities,
    issueHeadRequest,
    editRequest,
  })(Asset)
);
