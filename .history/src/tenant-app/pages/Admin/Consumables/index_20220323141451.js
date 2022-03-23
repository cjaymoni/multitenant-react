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
import {
  fetchConsumables,
  createConsumable,
  editConsumable,
  deleteConsumable,
} from "../../../../shared/redux/actions/consumableActions";
class Consumables extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Can do="info" on="Consumables">
            <Button
              icon="pi pi-info"
              className="p-button-rounded p-button-info p-mr-2"
              onClick={() => this.toggle("toggler2", rowData)}
              tooltip="More Info"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="edit" on="Consumables">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning p-mr-2"
              onClick={() => this.toggle("toggler", rowData)}
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
      },
      {
        field: "quantity",
        header: "Quantity",
      },
      { header: "Action(s)", body: actionBodyTemplate },
    ];
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
              title="Total categories"
              icon="pi pi-shopping-cart"
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
              content={this.props.booksize}
            ></CardDemo>
          </div>

          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Active categories"
              icon="pi pi-folder-open"
              content={this.props.pagesize}
              color="#fde0c2"
              iconColor="#f57c00"
              update="1"
            ></CardDemo>
          </div>
        </div>

        <br></br>
        <div className="datatable-responsive-demo">
          <div>
            <TableUI
              tableHeader="Manage Categories"
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
      </div>
    );
  }
}

Consumables.propTypes = {
  fetchConsumables: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  booksize: state.consumables.booksize,
  pagesize: state.consumables.pagesize,
});

export default connect(mapStateToProps, { fetchConsumables })(Consumables);
