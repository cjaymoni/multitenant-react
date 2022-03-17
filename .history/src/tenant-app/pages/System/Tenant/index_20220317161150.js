import React, { Component } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Can from "../../../../shared/casl/can";
import {
  CardData,
  dateBodyTemplate,
  descriptionTemplate,
  infoColumns,
  titleTemplate,
} from "./const";
import { Form, Formik } from "formik";
import TableUI from "../../../../shared/components/Table/Table";
import { InputTextarea } from "primereact/inputtextarea";
import { TenantSchema } from "../../../../shared/utils/validation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchTenants,
  editTenant,
  deleteTenant,
  createTenant,
  fetchTenantItems,
} from "../../../../shared/redux/actions/tenantActions";
import { fetchCategories } from "../../../../shared/redux/actions/categoryActions";
import CardDemo from "../../../../shared/components/card/CardDemo";

class Tenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      deleteToggler: false,
      createToggler: false,
      disableToggler: false,
      toggler2: false,
      info: [],
      title: "",
      description: "",
      selectedTenant: null,
      globalFilter: "",
      itemFilter: "",
      loading: false,
      items: [],
      catloading: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   // this.props.fetchCategories();
  //   this.loadLazyData();
  // }

  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
  }

  async toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    var rowd = rowData;
    await localStorage.setItem("cat_id", rowData.id);
    return this.setState({
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

  handleClose() {
    this.setState({ toggler: false });
    this.setState({ toggler2: false });
    this.setState({ deleteToggler: false });
    this.setState({ disableToggler: false });
    this.setState({ createToggler: false });
    this.setState({ showlists: false });
  }

  createTenant() {
    const tenantPayload = {
      title: this.state.title,
    };
    // console.log(postData)
    this.props.createTenant(tenantPayload);
  }

  updateTenant() {
    const tenantPayload = {
      title: this.state.title || this.state.info.title,
      description: this.state.description || this.state.info.description,
    };
    const id = this.state.info.id;
    this.props.editTenant(id, tenantPayload);
  }

  deleteTenant() {
    const id = this.state.info.id;

    this.props.deleteTenant(id);
  }

  disableTenant() {
    const id = this.state.info.id;
    const tenantPayload = {
      status: "false",
    };
    this.props.disableTenant(id, tenantPayload);
  }
  async createNewTenant() {
    return this.props.history.push("/tenantform");
  }

  editTenantDialogFooter = (
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
          this.updateTenant();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  deleteTenantDialogFooter = (
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
          this.deleteTenant();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );
  disableTenantDialogFooter = (
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
          this.disableTenant();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  createTenantDialogFooter = (
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

  render() {
    const initialValues = {
      title: "",
      description: "",
    };

    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Can do="info" on="Tenant">
            <Button
              icon="pi pi-info"
              className="p-button-rounded p-button-info mr-2"
              onClick={() => this.toggle("toggler2", rowData)}
              tooltip="More Info"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="edit" on="Tenant">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning mr-2"
              onClick={() => this.toggle("toggler", rowData)}
              tooltip="Edit Tenant"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="disable" on="Tenant">
            <Button
              icon="pi pi-ban"
              className="p-button-rounded p-button-danger  mr-2"
              onClick={() => this.toggle("disableToggler", rowData)}
              tooltip="Delete Tenant"
            />
          </Can>
          &nbsp;
          <Can do="delete" on="Tenant">
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger  mr-2"
              // onClick={() => this.toggle("deleteToggler", rowData)}
              tooltip="Delete Tenant"
            />
          </Can>
        </React.Fragment>
      );
    };
    const tenantColumns = [
      { field: "title", header: "Tenant Name" },
      {
        field: "description",
        header: "Description",
      },
      { field: "created_at", header: "Date Created", body: dateBodyTemplate },
      { header: "Action(s)", body: actionBodyTemplate },
    ];

    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Tenant info
        </h2>
        <br></br>

        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-md-6 p-lg-3">
            <CardDemo
              title="Total Tenants"
              icon="pi pi-shopping-cart"
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
              content={this.props.booksize}
            ></CardDemo>
          </div>
          <div className="p-col-12 p-md-6 p-lg-3">
            <CardDemo
              title="New Tenants"
              icon="pi pi-users"
              color="#e7cbec"
              iconColor="#9c27b0"
              update="1"
              content={this.props.pagesize}
            ></CardDemo>
          </div>
          <div className="p-col-12 p-md-6 p-lg-3">
            <CardDemo
              title="Active Tenants"
              icon="pi pi-user-minus"
              update="1"
              color="#fde0c2"
              iconColor="#f57c00"
              content={this.props.booksize - this.props.pagesize}
            ></CardDemo>
          </div>
        </div>
        <br></br>

        <div className="datatable-responsive-demo">
          <div>
            <TableUI
              tableHeader="Manage Tenants"
              columns={tenantColumns}
              fetchFunction={this.props.fetchCategories}
              clickFunction={() => this.createNewTenant()}
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
          header="Create Tenant"
          modal
          className="p-fluid"
          footer={this.createTenantDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={TenantSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              const postData = {
                title: values.title,
                description: values.description,
                email: values.email,
                phone: values.phone,
                metatitle: values.metatitle,
                street_address: values.street_address,
                postal_address: values.postal_address,
                digital_address: values.digital_address,
                logo: values.logo,
                bg_image: values.bg_image,
              };
              this.props.createTenant(postData);
              this.handleClose();
            }}
          >
            {(props) => {
              const { handleChange, values, errors } = props;
              return (
                <>
                  <Form id="postform">
                    <div className="flex align-items-center justify-content-center">
                      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-900 font-medium mb-2"
                          >
                            Tenant Name
                          </label>
                          <InputText
                            id="email"
                            type="text"
                            className="w-full mb-3"
                            value={values.title}
                            onChange={(event) => handleChange(event, "title")}
                          />

                          <label
                            htmlFor="password"
                            className="block text-900 font-medium mb-2"
                          >
                            Branches
                          </label>
                          <InputText
                            id="password"
                            type="password"
                            className="w-full mb-3"
                            value={values.title}
                            onChange={(event) => handleChange(event, "title")}
                          />

                          <Button
                            label="Sign In"
                            icon="pi pi-user"
                            className="w-full"
                          />
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
          style={{ width: "27vw" }}
          header="Edit Tenant Details"
          modal
          className="p-fluid"
          footer={this.editTenantDialogFooter}
          onHide={this.handleClose}
        >
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="namefItem">Tenant name</label>
              <InputText
                id="title"
                name="title"
                defaultValue={this.state.info.title}
                onChange={(event) => this.handleChange(event, "title")}
              />
            </div>
          </div>
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="namefItem">Description</label>
              <InputTextarea
                id="description"
                name="description"
                defaultValue={this.state.info.description}
                onChange={(event) => this.handleChange(event, "description")}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["deleteToggler"]}
          style={{ width: "450px" }}
          header="Confirm Delete"
          modal
          footer={this.deleteTenantDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
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
          visible={this.state["disableToggler"]}
          style={{ width: "450px" }}
          header="Confirm Delete"
          modal
          footer={this.disableTenantDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
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
          style={{ width: "60vw" }}
          header="Tenant Info"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="namefItem">Tenant name</label>
              <InputText value={this.state.info.title} disabled />
            </div>
            <div className="p-field p-col">
              <label htmlFor="namefItem">Description</label>
              <InputText value={this.state.info.description} disabled />
            </div>
          </div>
          <div className="datatable-responsive-demo">
            <div>
              <TableUI
                tableHeader="Items in Tenant"
                columns={infoColumns}
                // fetchFunction={this.props.fetchTenantItems}
                style={{
                  width: "56vw",
                  marginLeft: "5px",
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
          </div>
        </Dialog>
      </div>
    );
  }
}
Tenant.propTypes = {
  fetchTenants: PropTypes.func.isRequired,
  tenants: PropTypes.array.isRequired,
  editTenant: PropTypes.func.isRequired,
  deleteTenant: PropTypes.func.isRequired,
  createTenant: PropTypes.func.isRequired,
  fetchTenantItems: PropTypes.func.isRequired,
  tenantitems: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // tenants: state.tenants.tenants,
  // tenantitems:state.tenants.tenantitems,
  // booksize:state.tenants.booksize,
  // pagesize:state.tenants.pagesize
});

export default connect(mapStateToProps, {
  fetchCategories,
  // fetchTenants,
  // editTenant,
  // deleteTenant,
  // createTenant,
  // fetchTenantItems,
})(Tenant);
