import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchCategoryDetails,
  fetchCategoryAssets,
  fetchCategoryConsumables,
  fetchCategoryVedors,
} from "../../../../shared/redux/actions/categoryActions";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import TableUI from "../../../../shared/components/Table/Table";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Can from "../../../../shared/casl/can";

class CategoryInfo extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.fetchCategoryDetails();
  }

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    const conActionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <div className="p-d-flex">
            <Can do="info" on="Suppliers">
              <Button
                icon="pi pi-info"
                className="p-button-rounded p-button-info mr-2"
                onClick={() => this.toggle("toggler2", rowData)}
                tooltip="More Info"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>

            <Can do="disable" on="Suppliers">
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger mr-2"
                onClick={() => this.toggle("disableToggler", rowData)}
                tooltip="Remove from category"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
          </div>
        </React.Fragment>
      );
    };
    const assetActionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <div className="p-d-flex">
            <Can do="info" on="Suppliers">
              <Button
                icon="pi pi-info"
                className="p-button-rounded p-button-info mr-2"
                onClick={() => this.toggle("toggler2", rowData)}
                tooltip="More Info"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>

            <Can do="disable" on="Suppliers">
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger mr-2"
                onClick={() => this.toggle("disableToggler", rowData)}
                tooltip="Remove from category"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
          </div>
        </React.Fragment>
      );
    };
    const vendorActionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <div className="p-d-flex">
            <Can do="info" on="Suppliers">
              <Button
                icon="pi pi-info"
                className="p-button-rounded p-button-info mr-2"
                onClick={() => this.toggle("toggler2", rowData)}
                tooltip="More Info"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>

            <Can do="disable" on="Suppliers">
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger mr-2"
                onClick={() => this.toggle("disableToggler", rowData)}
                tooltip="Remove from category"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
          </div>
        </React.Fragment>
      );
    };
    const vendorColumns = [
      { field: "title", header: "Supplier Name" },
      {
        field: "contact",
        header: "Supplier Contact",
      },
      { field: "email", header: "Supplier Email" },
      { header: "Action(s)", body: vendorActionBodyTemplate },
    ];

    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Category info
        </h2>

        <div
          className="p-formgrid p-grid"
          style={{ marginLeft: "20px", fontSize: "20px", fontWeight: "bold" }}
        >
          {/* {this.props.catdetails.title} */}
          <div className="p-field p-col">
            <label htmlFor="firstname6" className="block font-normal">
              Category name : <span>{this.props.catdetails.title}</span>
            </label>
          </div>
          <div className="p-field p-col">
            <label htmlFor="firstname6" className="block font-normal">
              Category description :
              <span>{this.props.catdetails.description}</span>
            </label>
          </div>
        </div>
        <Divider style={{ width: "82vw" }} />
        <TabView
          style={{
            backgroundColor: "aliceblue",
            width: "82vw",
            marginLeft: "15px",
            color: "black",
          }}
        >
          <TabPanel header="Category Assets">
            <div className="datatable-responsive-demo">
              <TableUI
                tableHeader="Category Assets"
                columns={vendorColumns}
                fetchFunction={this.props.fetchCategoryAssets}
                clickFunction={() => this.handleOpen("createToggler")}
                style={{
                  width: "76vw",
                  marginLeft: "15px",
                  marginBottom: "0px",
                  marginTop: "0px",
                }}
              />
            </div>
          </TabPanel>
          <TabPanel header="Category Consumables">
            <div className="datatable-responsive-demo">
              <TableUI
                tableHeader="Category Consumables"
                columns={vendorColumns}
                fetchFunction={this.props.fetchCategoryConsumables}
                clickFunction={() => this.handleOpen("createToggler")}
                style={{
                  width: "76vw",
                  marginLeft: "15px",
                  marginBottom: "0px",
                  marginTop: "0px",
                }}
              />
            </div>
          </TabPanel>

          <TabPanel header="Category Vendors">
            <div className="datatable-responsive-demo">
              <TableUI
                tableHeader="Category Vendors"
                columns={vendorColumns}
                fetchFunction={this.props.fetchCategoryVedors}
                clickFunction={() => this.handleOpen("createToggler")}
                style={{
                  width: "76vw",
                  marginLeft: "15px",
                  marginBottom: "0px",
                  marginTop: "0px",
                }}
              />
            </div>
          </TabPanel>
        </TabView>
      </div>
    );
  }
}

CategoryInfo.propTypes = {
  fetchCategoryDetails: PropTypes.func.isRequired,
  catdetails: PropTypes.object.isRequired,
  fetchCategoryAssets: PropTypes.func.isRequired,
  fetchCategoryConsumables: PropTypes.func.isRequired,
  fetchCategoryVedors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  catdetails: state.categories.categoryDetails,
});

export default connect(mapStateToProps, {
  fetchCategoryDetails,
  fetchCategoryAssets,
  fetchCategoryConsumables,
  fetchCategoryVedors,
})(CategoryInfo);
