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
import { ConsumableSchema } from "../../../../shared/utils/validation";
import {
  fetchConsumables,
  createConsumable,
  editConsumable,
  deleteConsumable,
} from "../../../../shared/redux/actions/consumableActions";

class Consumables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      deleteToggler: false,
      createToggler: false,
      disableToggler: false,
      toggler2: false,
      info: [],
    };
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    this.setState({ toggler2: false });
    this.setState({ deleteToggler: false });
    this.setState({ disableToggler: false });
    this.setState({ createToggler: false });
    this.setState({ showlists: false });
  }
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
          style={{ width: "27vw" }}
          header="Create Category"
          modal
          className="p-fluid"
          footer={this.createCategoryDialogFooter}
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
              this.props.createConsumable(postData);
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
                        <label htmlFor="namefItem">Category name</label>
                        <InputText
                          id="title"
                          name="title"
                          value={values.title}
                          onChange={(event) => handleChange(event, "title")}
                          className={
                            errors.title ? "p-invalid p-d-block" : "p-d-block"
                          }
                        />
                      </div>
                      <div className="field col-12">
                        <label>Description</label>
                        <InputTextarea
                          id="description"
                          name="description"
                          value={values.description}
                          onChange={(event) =>
                            handleChange(event, "description")
                          }
                          className={
                            errors.description
                              ? "p-invalid p-d-block"
                              : "p-d-block"
                          }
                          rows={2}
                          cols={20}
                        />
                      </div>
                    </div>
                    {/* <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label>Description</label>
            <InputTextarea
            id="description"
            name="description"
            value={values.description}
            onChange={(event) => handleChange(event, "description")}
            className={errors.description ? "p-invalid p-d-block" : "p-d-block"}           
            rows={2}
            cols={20}
            />
            </div>

            </div> */}
                  </Form>
                </>
              );
            }}
          </Formik>
        </Dialog>
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
