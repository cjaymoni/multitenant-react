import React, { Component } from "react";
import PropTypes from "prop-types";
import TableUI from "../../../../shared/components/Table/Table";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import Can from "../../../../shared/casl/can";
import { Dialog } from "primereact/dialog";
import {
  ConsumableSchema,
  jsonToFormData,
} from "../../../../shared/utils/validation";
import {
  fetchConsumables,
  createConsumable,
  editConsumable,
  deleteConsumable,
} from "../../../../shared/redux/actions/consumableActions";
import { fetchInventories } from "../../../../shared/redux/actions/inventoryActions";
import { InputNumber } from "primereact/inputnumber";
import { AutoComplete } from "primereact/autocomplete";
import { priceBodyTemplate } from "./const";

class Consumables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      deleteToggler: false,
      createToggler: false,
      disableToggler: false,
      infoToggler: false,
      updateToggler: false,
      toggler2: false,
      info: [],
      selectedInventory: null,
      filteredInventory: null,
      title: "",
      quantity: "",
      unit_price: "",
      description: "",
      inventory_id: "",
    };
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchInventory = this.searchInventory.bind(this);
    this.updateConsumable = this.updateConsumable.bind(this);
  }

  componentDidMount() {
    this.props.fetchInventories();
  }
  searchInventory(event) {
    setTimeout(() => {
      let filteredInventory;
      if (!event.query.trim().length) {
        filteredInventory = [...this.props.inventories];
      } else {
        filteredInventory = this.props.inventories.filter((option) => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredInventory });
      // console.log(filteredOptions);
    }, 250);
  }
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
  }
  handleOpen(toggler) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
    });
  }
  toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
      info: rowData,
    });
  }
  handleClose() {
    this.setState({ toggler: false });
    this.setState({ infoToggler: false });
    this.setState({ updateToggler: false });

    this.setState({ deleteToggler: false });
    this.setState({ disableToggler: false });
    this.setState({ createToggler: false });
    this.setState({ showlists: false });
  }

  updateConsumable() {
    const id = this.state.info.id;
    const payload = {
      title: this.state.title || this.state.info.title,
      inventory_id: this.state.inventory_id.id || this.state.info.inventory_id,
      description: this.state.description || this.state.info.description,
      quantity: this.state.quantity || this.state.info.quantity,
      unit_price: this.state.unit_price || this.state.info.unit_price,
    };

    this.props.editConsumable(id, payload);
    this.handleClose();
  }

  createDialogFooter = (
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

  updateDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        label="Update"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => this.updateConsumable()}
      />
    </React.Fragment>
  );

  render() {
    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Can do="info" on="Consumables">
            <Button
              icon="pi pi-info"
              className="p-button-rounded p-button-info p-mr-2"
              onClick={() => this.toggle("infoToggler", rowData)}
              tooltip="More Info"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="edit" on="Consumables">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning p-mr-2"
              onClick={() => this.toggle("updateToggler", rowData)}
              tooltip="Edit"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="disable" on="Consumables">
            <Button
              icon="pi pi-ban"
              className="p-button-rounded p-button-danger  p-mr-2"
              onClick={() => this.toggle("disableToggler", rowData)}
              tooltip="Delete"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="delete" on="Consumables">
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger  p-mr-2"
              // onClick={() => this.toggle("deleteToggler", rowData)}
              tooltip="Delete"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
        </React.Fragment>
      );
    };

    const consumableColumns = [
      { field: "title", header: "Item Name" },
      {
        field: "unit_price",
        header: "Unit Price",
        body: priceBodyTemplate,
      },
      {
        field: "quantity",
        header: "Quantity",
      },
      { header: "Action(s)", body: actionBodyTemplate },
    ];

    const initialValues = {
      title: "",
      inventory_id: "",
      quantity: "",
      description: "",
      unit_price: "",
    };

    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Consumables info
        </h2>
        <br></br>

        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Total"
              icon="pi pi-shopping-cart"
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
              content={this.props.booksize}
            ></CardDemo>
          </div>

          {/* <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Active categories"
              icon="pi pi-folder-open"
              content={this.props.pagesize}
              color="#fde0c2"
              iconColor="#f57c00"
              update="1"
            ></CardDemo>
          </div> */}
        </div>

        <br></br>
        <div className="datatable-responsive-demo">
          <div>
            <TableUI
              tableHeader="Manage Consumables"
              columns={consumableColumns}
              fetchFunction={this.props.fetchConsumables}
              clickFunction={() => this.handleOpen("createToggler")}
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
          visible={this.state["createToggler"]}
          style={{ width: "35vw" }}
          header="Create Consumable"
          modal
          className="p-fluid"
          footer={this.createDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={ConsumableSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              const postData = {
                title: values.title,
                description: values.description,
                inventory_id: values.inventory_id.id,
                quantity: values.quantity,
                unit_price: values.unit_price,
              };
              this.props.createConsumable(jsonToFormData(postData));
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
                        <label htmlFor="namefItem">Item name</label>
                        <InputText
                          id="title"
                          type="text"
                          name="title"
                          placeholder="Item Name"
                          onChange={(event) => handleChange(event, "title")}
                          value={values.title}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Name of Item"
                        />
                        <small>eg:A4 Sheet</small>
                        <div className="error-message">{errors.title}</div>
                      </div>

                      <div className="field col-12">
                        <label htmlFor="" className="block font-normal mb-2">
                          Unit Price
                        </label>

                        <InputNumber
                          showButtons
                          name="unit_price"
                          mode="currency"
                          currency="GHS"
                          locale="en-GH"
                          min={1}
                          inputId="stacked"
                          value={values.unit_price}
                          tooltip="Amount asset was bought"
                          className="w-full"
                          inputClassName="w-full"
                          onValueChange={(event) => {
                            let change = {
                              target: {
                                name: "unit_price",
                                value: event.value,
                              },
                            };
                            handleChange(change);
                          }}
                          tooltipOptions={{ position: "bottom" }}
                        />
                        <small id="username1-help" className="block">
                          eg: 50
                        </small>
                      </div>
                      <div className="field col-12">
                        <label htmlFor="" className="block font-normal mb-2">
                          Quantity
                        </label>
                        <InputNumber
                          min={1}
                          id="quantity"
                          name="quantity"
                          inputId="stacked"
                          value={values.quantity}
                          onValueChange={(event) => {
                            let change = {
                              target: {
                                name: "quantity",
                                value: event.value,
                              },
                            };
                            handleChange(change);
                          }}
                          tooltipOptions={{ position: "bottom" }}
                          showButtons
                          inputClassName="w-full"
                          className="w-full"
                          tooltip="Total number of items"
                        />
                        <small id="username1-help" className="block">
                          eg: 100
                        </small>
                        <div className="error-message">{errors.quantity}</div>
                      </div>

                      <div className="field col-12">
                        <label htmlFor="email" className="block font-normal">
                          Inventory
                        </label>
                        <AutoComplete
                          name="inventory_id"
                          id="inventory_id"
                          className="w-full"
                          dropdown
                          suggestions={this.state.filteredInventory}
                          completeMethod={this.searchInventory}
                          field="title"
                          placeholder="Select Inventory"
                          value={props.values.inventory_id}
                          onChange={(selectedOption) => {
                            let event = {
                              target: {
                                name: "inventory_id",
                                value: selectedOption.target.value,
                              },
                            };
                            handleChange(event);
                          }}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Item's Inventory"
                        />
                        <small>eg: Store Inventory</small>

                        <div className="error-message mt-1">
                          {errors.inventory_id}
                        </div>
                      </div>

                      <div className="field col-12">
                        <label>Description</label>
                        <InputTextarea
                          id="description"
                          type="text"
                          name="description"
                          placeholder="Description"
                          onChange={(event) =>
                            handleChange(event, "description")
                          }
                          value={values.description}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Item's Description"
                        />
                        <small>eg: description of item</small>
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
          visible={this.state["infoToggler"]}
          style={{ width: "35vw" }}
          header="Consumable Info"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="namefItem">Item name</label>
              <InputText value={this.state.info.title} disabled />
            </div>

            <div className="field col-12">
              <label htmlFor="" className="block font-normal mb-2">
                Unit Price
              </label>

              <InputNumber
                name="unit_price"
                mode="currency"
                currency="GHS"
                locale="en-GH"
                min={1}
                inputId="stacked"
                value={this.state.info.unit_price}
                disabled
                className="w-full"
                inputClassName="w-full"
              />
            </div>
            <div className="field col-12">
              <label htmlFor="" className="block font-normal mb-2">
                Quantity
              </label>
              <InputText value={this.state.info.quantity} disabled />
            </div>

            <div className="field col-12">
              <label>Description</label>
              <InputTextarea
                id="description"
                type="text"
                name="description"
                placeholder="Description"
                disabled
                value={this.state.info.description}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["updateToggler"]}
          style={{ width: "35vw" }}
          header="Edit Consumable"
          modal
          className="p-fluid"
          footer={this.updateDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="namefItem">Item name</label>
              <InputText
                id="title"
                type="text"
                name="title"
                placeholder="Item Name"
                onChange={(event) => this.handleChange(event, "title")}
                defaultValue={this.state.info.title}
              />
            </div>

            <div className="field col-12">
              <label htmlFor="" className="block font-normal mb-2">
                Unit Price
              </label>

              <InputNumber
                showButtons
                name="unit_price"
                mode="currency"
                currency="GHS"
                locale="en-GH"
                min={1}
                inputId="stacked"
                defaultValue={this.state.info.unit_price}
                placeholder={this.state.info.unit_price}
                value={this.state.unit_price}
                className="w-full"
                inputClassName="w-full"
                onValueChange={(event) => {
                  let change = {
                    target: {
                      name: "unit_price",
                      value: event.value,
                    },
                  };
                  this.handleChange(change);
                }}
              />
            </div>
            <div className="field col-12">
              <label htmlFor="" className="block font-normal mb-2">
                Quantity
              </label>
              <InputNumber
                min={1}
                id="quantity"
                name="quantity"
                inputId="stacked"
                defaultValue={this.state.info.quantity}
                value={this.state.quantity}
                placeholder={this.state.info.quantity}
                onValueChange={(event) => {
                  let change = {
                    target: {
                      name: "quantity",
                      value: event.value,
                    },
                  };
                  this.handleChange(change);
                }}
                showButtons
                inputClassName="w-full"
                className="w-full"
              />
            </div>

            <div className="field col-12">
              <label htmlFor="email" className="block font-normal">
                Inventory
              </label>
              <AutoComplete
                name="inventory_id"
                id="inventory_id"
                className="w-full"
                dropdown
                suggestions={this.state.filteredInventory}
                completeMethod={this.searchInventory}
                field="title"
                placeholder="Select Inventory"
                defaultValue={this.state.info.inventory_id}
                value={this.state.inventory_id}
                onChange={(selectedOption) => {
                  let event = {
                    target: {
                      name: "inventory_id",
                      value: selectedOption.target.value,
                    },
                  };
                  this.handleChange(event);
                }}
              />
            </div>

            <div className="field col-12">
              <label>Description</label>
              <InputTextarea
                id="description"
                type="text"
                name="description"
                placeholder="Description"
                onChange={(event) => this.handleChange(event, "description")}
                defaultValue={this.state.info.description}
                value={this.state.description}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

Consumables.propTypes = {
  fetchConsumables: PropTypes.func.isRequired,
  fetchInventories: PropTypes.func.isRequired,
  createConsumable: PropTypes.func.isRequired,
  editConsumable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  inventories: state.inventories.inventories,
  booksize: state.consumables.booksize,
  pagesize: state.consumables.pagesize,
});

export default connect(mapStateToProps, {
  fetchConsumables,
  fetchInventories,
  createConsumable,
  editConsumable,
})(Consumables);
