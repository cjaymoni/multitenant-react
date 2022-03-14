import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import Can from "../../../../shared/casl/can";
import { Dialog } from "primereact/dialog";

import { Button } from "primereact/button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  fetchAssets,
  fetchNonInventoryAssets,
} from "../../../../shared/redux/actions/assetActions";
import {
  fetchInventoryDetails,
  fetchInventoryAssets,
  addToInventory,
  deleteFromInventory,
} from "../../../../shared/redux/actions/inventoryActions";
import TableUI from "../../../../shared/components/Table/Table";
import {
  codeBodyTemplate,
  priceBodyTemplate,
  serialBodyTemplate,
  titleBodyTemplate,
} from "./const";

class InventoryInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      invasset: [],
      toggler: false,
      addToggler: false,
      listToggler: false,
      deleteToggler: false,
      infoToggler: false,
      globalFilter: "",
      modalFilter: "",
      info: [],
      infoinv: [],
      loading: false,
    };
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.fetchAssetDetails = this.fetchAssetDetails.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchInventoryDetails(localStorage.inv_id);
    return this.props.invdetails;
  }

  toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
      info: rowData,
      infoinv: rowData.inventory,
    });
  }
  handleOpen(toggler) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
    });
  }
  handleClose() {
    this.setState({ addToggler: false });
    this.setState({ toggler2: false });
    this.setState({ listToggler: false });
    this.setState({ deleteToggler: false });
    this.setState({ infoToggler: false });
  }

  listItemDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
    </React.Fragment>
  );
  itemInfoDialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.setState({ infoToggler: false })}
      />
    </React.Fragment>
  );
  addItemDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.setState({ addToggler: false })}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          this.addItemToInventory();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  deleteItemDialogFooter = (
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
          this.delfromInventory();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );
  addItemToInventory() {
    const id = localStorage.inv_id;
    const itemid = this.state.info.id;
    this.props.addToInventory(id, itemid);
  }
  async fetchAssetDetails(rowData) {
    await localStorage.setItem("assetid", rowData.id);

    return this.props.history.push("/assetinfo");
  }

  deletefromInventory() {
    const id = localStorage.inv_id;
    const itemid = this.state.info.id;

    console.log(itemid, id);
    this.props.deleteFromInventory(itemid, id);
  }

  delfromInventory() {
    const id = 1;
    const itemid = this.state.info.id;
    this.props.addToInventory(id, itemid);
  }

  render() {
    const listActionTemplate = (rowData) => {
      return (
        <React.Fragment>
          <div className="p-d-flex">
            {/* <Can do="view" on="Inventory">
            <Button
              icon="pi pi-info"
              className="p-button-rounded p-button-info p-mr-2"
             onClick={() => this.toggle("infoToggler", rowData)}
              tooltip="More info"
            />
          </Can> */}

            <Can do="edit" on="Inventory">
              <Button
                icon="pi pi-plus"
                className="p-button-rounded p-button-success  "
                onClick={() => this.toggle("addToggler", rowData)}
                tooltip="Add Asset"
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
            <Can do="view" on="Inventory">
              <Button
                icon="pi pi-info"
                className="p-button-rounded p-button-info mr-2"
                onClick={() => this.fetchAssetDetails(rowData)}
                tooltip="More info"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>

            <Can do="edit" on="Inventory">
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger  "
                onClick={() => this.toggle("deleteToggler", rowData)}
                tooltip="Remove Asset"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
          </div>
        </React.Fragment>
      );
    };
    const addColumns = [
      { field: "title", header: "Asset Name" },
      { field: "code", header: "Asset Code" },
      {
        field: "serial_number",
        header: "Serial Number",
      },
      { field: "amount", header: "Price", body: priceBodyTemplate },
      { header: "Actions", body: listActionTemplate },
    ];
    const listColumns = [
      { field: "title", header: "Asset Name", body: titleBodyTemplate },
      { field: "code", header: "Asset Code", body: codeBodyTemplate },
      {
        field: "serial_number",
        header: "Serial Number",
        body: serialBodyTemplate,
      },
      { field: "amount", header: "Price", body: priceBodyTemplate },
      { header: "Actions", body: actionBodyTemplate },
    ];
    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Inventory Info
        </h2>
        <div
          style={{ marginLeft: "20px", fontSize: "20px", fontWeight: "bold" }}
        >
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="firstname6" className="block font-normal">
                Inventory name : {this.props.invdetails.title}
              </label>

              <div></div>
            </div>
            {/* <div className="p-field p-col">
              <label htmlFor="lastname6">Inventory Location :</label>
            </div> */}
          </div>

          {/* <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="firstname6">Inventory owner :</label>
            </div>
            <div className="p-field p-col">
              <label htmlFor="lastname6">Created by :</label>
            </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="firstname6">Total assets :</label>
            </div>
          </div> */}
        </div>

        <Divider style={{ width: "82vw" }} />
        <div className="datatable-responsive-demo">
          <TableUI
            columns={listColumns}
            fetchFunction={this.props.fetchInventoryAssets}
            clickFunction={() => this.handleOpen("listToggler")}
            tableHeader="Assets In Inventory"
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
          visible={this.state["listToggler"]}
          style={{ width: "60vw" }}
          modal
          className="p-fluid"
          footer={this.listItemDialogFooter}
          onHide={this.handleClose}
          header="Add Assets To Inventory"
        >
          <div className="datatable-responsive-demo">
            <TableUI
              columns={addColumns}
              fetchFunction={this.props.fetchNonInventoryAssets}
              addOn="NonInventoryAsset"
              tableHeader="Assets List"
              style={{
                width: "56vw",
                marginLeft: "1px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
            />
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["addToggler"]}
          style={{ width: "40vw" }}
          header="Add Asset to Inventory"
          modal
          className="p-fluid"
          footer={this.addItemDialogFooter}
          onHide={() => this.setState({ addToggler: false })}
        >
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="departmentName" className="block font-normal">
                Asset name
              </label>
              <InputText
                id="title"
                title="title"
                defaultValue={this.state.info.title}
                disabled
              />
            </div>
            <div className="field col-12">
              <label htmlFor="departmentName" className="block font-normal">
                Asset code
              </label>
              <InputText
                id="title"
                title="title"
                defaultValue={this.state.info.code}
                disabled
              />
            </div>
            <div className="field col-12">
              <label htmlFor="departmentName" className="block font-normal">
                Serial number
              </label>
              <InputText
                id="title"
                title="title"
                defaultValue={this.state.info.serial_number}
                disabled
              />
            </div>
            <div className="field col-12">
              <label htmlFor="departmentName" className="block font-normal">
                Price
              </label>
              <InputText
                id="title"
                title="title"
                defaultValue={this.state.info.amount}
                disabled
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["deleteToggler"]}
          style={{ width: "450px" }}
          header="Confirm Removal"
          modal
          footer={this.deleteItemDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-2"
              style={{ fontSize: "2rem" }}
            />
            {this.state.info && (
              <span>
                Are you sure you want to remove <b>{this.state.info.title}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}

InventoryInfo.propTypes = {
  fetchInventoryDetails: PropTypes.func.isRequired,
  invdetails: PropTypes.any.isRequired,
  invassets: PropTypes.array.isRequired,
  noninvassets: PropTypes.array.isRequired,
  fetchAssets: PropTypes.func.isRequired,
  addToInventory: PropTypes.func.isRequired,
  fetchInventoryAssets: PropTypes.func.isRequired,
  deleteFromInventory: PropTypes.func.isRequired,
  fetchNonInventoryAssets: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  inventories: state.inventories.inventories,
  invdetails: state.inventories.invdetails,
  invassets: state.inventories.invassets,
  assets: state.assets.items,
  noninvassets: state.assets.noninvassets,
});

export default connect(mapStateToProps, {
  fetchInventoryDetails,
  fetchInventoryAssets,
  addToInventory,
  deleteFromInventory,
  fetchNonInventoryAssets,
  fetchAssets,
})(InventoryInfo);
