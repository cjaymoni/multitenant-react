import React, { Component } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "../../../../shared/components/Table/Table.css";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { Form, Formik } from "formik";
import { VendorSchema } from "../../../../shared/utils/validation";
import { connect } from "react-redux";
import {
  fetchVendors,
  editVendor,
  deleteVendor,
  createVendor,
  addVenCategory,
  disableVendor,
} from "../../../../shared/redux/actions/vendorActions";
import { fetchCategories } from "../../../../shared/redux/actions/categoryActions";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import Can from "../../../../shared/casl/can";
import TableUI from "../../../../shared/components/Table/Table";
import {
  contactBodyTemplate,
  emailBodyTemplate,
  titleBodyTemplate,
} from "./const";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";

class Vendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      deleteToggler: false,
      createToggler: false,
      addToggler: false,
      toggler2: false,
      disableToggler: false,
      info: [],
      name: "",
      contact: "",
      email: "",
      category: "",
      url: "",
      title: "",
      ven_category: "",
      selectedVendor: null,
      globalFilter: "",
      portalPlacement: "bottom",
      categoryoptions: [],
      isLoading: false,
      categoryLoaded: false,
      loading: false,
      selectedOption: null,
      filteredOptions: null,
      description: "",
    };

    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchOption = this.searchOption.bind(this);
  }

  componentDidMount() {
    // this.props.fetchVendors();
    this.props.fetchCategories().then((data) => {
      this.setState({ categoryoptions: data.payload.data });
    });
  }

  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
  }
  searchOption(event) {
    setTimeout(() => {
      let filteredOptions;
      if (!event.query.trim().length) {
        filteredOptions = [...this.state.categoryoptions];
      } else {
        filteredOptions = this.state.categoryoptions.filter((option) => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredOptions });
      // console.log(filteredOptions);
    }, 250);
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

  handleClose() {
    this.setState({ toggler: false });
    this.setState({ toggler2: false });
    this.setState({ deleteToggler: false });
    this.setState({ createToggler: false });
    this.setState({ showlists: false });
    this.setState({ addToggler: false });
    this.setState({ disableToggler: false });
  }

  updateVendor() {
    const vendorPayload = {
      title: this.state.title || this.state.info.title,
      contact: this.state.contact || this.state.info.contact,
      email: this.state.email || this.state.info.email,
      url: this.state.url || this.state.info.url,
      description: this.state.description || this.state.info.description,
    };
    const id = this.state.info.id;

    this.props.editVendor(id, vendorPayload);
  }

  disableVendor() {
    const vendorPayload = {
      status: "false",
    };
    const id = this.state.info.id;

    this.props.disableVendor(id, vendorPayload);
  }

  deleteVendor() {
    const id = this.state.info.id;
    this.props.deleteVendor(id);
  }

  addCategory() {
    const catid = this.state.ven_category.id;
    const venid = this.state.info.id;
    this.props.addVenCategory(catid, venid);
  }
  editVendorDialogFooter = (
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
          this.updateVendor();
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
  addDialogFooter = (
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
          this.addCategory();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );
  deleteVendorDialogFooter = (
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
          this.deleteVendor();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );
  disableVendorDialogFooter = (
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
          this.disableVendor();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );
  createVendorDialogFooter = (
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

  loadCategory = () => {
    let categoryoptions;
    setTimeout(() => {
      categoryoptions = this.props.categories.map((i) => ({
        label: i.title,
        value: i.id,
      }));
      this.setState({
        categoryLoaded: true,
        categoryoptions,
        isLoading: false,
      });
    }, 2000);
  };

  maybeLoadOptions = () => {
    if (!this.state.categoryLoaded) {
      this.setState({ isLoading: true });
      this.loadCategory();
    }
  };

  onCategoryChange = (ven_category) => {
    this.setState({ ven_category });
  };

  render() {
    const initialValues = {
      title: "",
      contact: "",
      url: "",
      email: "",
      description: "",
    };
    const actionBodyTemplate = (rowData) => {
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
            &nbsp;
            <Can do="edit" on="Suppliers">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-warning mr-2"
                onClick={() => this.toggle("toggler", rowData)}
                tooltip="Edit Supplier"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
            &nbsp;
            <Can do="edit" on="Suppliers">
              <Button
                icon="pi pi-plus"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => this.toggle("addToggler", rowData)}
                tooltip="Add To Category"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
            &nbsp;
            <Can do="disable" on="Suppliers">
              <Button
                icon="pi pi-ban"
                className="p-button-rounded p-button-danger mr-2"
                onClick={() => this.toggle("disableToggler", rowData)}
                tooltip="Delete Suppliers"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
            &nbsp;
            <Can do="delete" on="Suppliers">
              <Button
                icon="pi pi-ban"
                className="p-button-rounded p-button-danger mr-auto"
                // onClick={() => this.toggle("deleteToggler", rowData)}
                tooltip="Delete Suppliers"
                tooltipOptions={{ position: "bottom" }}
              />
            </Can>
          </div>
        </React.Fragment>
      );
    };
    const vendorColumns = [
      { field: "title", header: "Supplier Name", body: titleBodyTemplate },
      {
        field: "contact",
        header: "Supplier Contact",
        body: contactBodyTemplate,
      },
      { field: "email", header: "Supplier Email", body: emailBodyTemplate },
      { header: "Action(s)", body: actionBodyTemplate },
    ];

    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Supplier info
        </h2>
        <br></br>
        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Total Suppliers"
              icon="pi pi-shopping-cart"
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
              content={this.props.booksize}
            ></CardDemo>
          </div>

          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Active Suppliers"
              icon="pi pi-folder-open"
              color="#e7cbec"
              iconColor="#9c27b0"
              update="1"
              content={this.props.pagesize}
            ></CardDemo>
          </div>
        </div>
        <br></br>

        <div className="datatable-responsive-demo">
          <div>
            <TableUI
              tableHeader="Manage Suppliers"
              columns={vendorColumns}
              fetchFunction={this.props.fetchVendors}
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
          header="Add New Supplier"
          modal
          className="p-fluid"
          footer={this.createVendorDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={VendorSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              const postData = {
                title: values.title,
                contact: values.contact,
                email: values.email,
                url: values.url,
                description: values.description,
              };
              this.props.createVendor(postData);
            }}
          >
            {(props) => {
              const { handleChange, values, errors, onSubmit } = props;
              return (
                <>
                  <Form id="postform">
                    <div className="formgrid grid">
                      <div className="field col-12">
                        <label htmlFor="name">Name</label>
                        <InputText
                          id="title"
                          type="text"
                          placeholder="Supplier Name"
                          value={values.title}
                          onChange={(event) => handleChange(event, "title")}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Name of Supplier"
                        />
                        <small>eg: CompuGhana</small>
                        <div className="error-message mt-1">{errors.title}</div>
                      </div>

                      <div className="field col-12">
                        <label htmlFor="email">Email</label>
                        <InputText
                          id="email"
                          type="text"
                          placeholder="Supplier Email"
                          value={values.email}
                          onChange={(event) => handleChange(event, "email")}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Email of Supplier"
                        />
                        <small>eg: compugh@mail.com</small>
                        <div className="error-message mt-1">{errors.email}</div>
                      </div>

                      <div className="field col-12">
                        <label htmlFor="contact">Phone number</label>

                        <InputText
                          id="contact"
                          type="text"
                          placeholder="0000000000"
                          maxlength={10}
                          value={values.contact}
                          onChange={(event) => handleChange(event, "contact")}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Contact of Supplier"
                        />
                        <small>eg: 0234578632</small>
                        <div className="error-message mt-1">
                          {errors.contact}
                        </div>
                      </div>

                      <div className="field col-12">
                        <label htmlFor="email">Website</label>
                        <InputText
                          id="url"
                          name="url"
                          placeholder="Supplier Website"
                          type="text"
                          value={values.url}
                          onChange={(event) => handleChange(event, "url")}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Website of Supplier"
                        />
                        <small>eg: https://www.compugh.com</small>
                        <div className="error-message mt-1">{errors.url}</div>
                      </div>

                      <div className="field col-12">
                        <label htmlFor="name" className="block font-normal">
                          Supplier Description
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
                        <small>eg: Supplier for PC hardware</small>

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
          style={{ width: "35vw" }}
          header="Edit Supplier Details"
          modal
          className="p-fluid"
          footer={this.editVendorDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="namefItem">Supplier name</label>
              <InputText
                id="title"
                name="title"
                defaultValue={this.state.info.title}
                onChange={(event) => this.handleChange(event, "title")}
              />
            </div>
            <div className="field col-12">
              <label htmlFor="namefItem">Supplier Email</label>
              <InputText
                id="email"
                name="email"
                defaultValue={this.state.info.email}
                onChange={(event) => this.handleChange(event, "email")}
              />
            </div>

            <div className="field col-12">
              <label htmlFor="namefItem">Supplier Contact</label>
              <InputText
                id="contact"
                name="contact"
                type="text"
                defaultValue={this.state.info.contact}
                placeholder="(000)-(99999999)"
                onChange={(event) => this.handleChange(event, "contact")}
              />
            </div>
            <div className="field col-12">
              <label htmlFor="namefItem">Supplier Website</label>
              <InputText
                id="url"
                name="url"
                defaultValue={this.state.info.url}
                onChange={(event) => this.handleChange(event, "url")}
              />
            </div>
            <div className="field col-12">
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
          style={{ width: "30vw" }}
          header="Confirm Delete"
          modal
          footer={this.deleteVendorDialogFooter}
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
          style={{ width: "30vw" }}
          header="Confirm Delete"
          modal
          footer={this.disableVendorDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
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
          style={{ width: "35vw" }}
          header="Supplier Info"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="namefItem">Supplier name</label>
              <InputText value={this.state.info.title} disabled />
            </div>
            <div className="field col-12">
              <label htmlFor="namefItem">Contact</label>
              <InputText value={this.state.info.contact} disabled />
            </div>

            <div className="field col-12">
              <label htmlFor="namefItem">Email </label>
              <InputText value={this.state.info.email} disabled />
            </div>
            <div className="field col-12">
              <label htmlFor="namefItem">Website</label>
              <InputText value={this.state.info.url} disabled />
            </div>
            <div className="field col-12">
              <label htmlFor="namefItem">Description</label>
              <InputTextarea value={this.state.info.description} disabled />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["addToggler"]}
          style={{ width: "35vw" }}
          header="Add Supplier To Category"
          modal
          className="p-fluid"
          footer={this.addDialogFooter}
          onHide={this.handleClose}
        >
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="namefItem">Category name</label>

              <AutoComplete
                className="w-full"
                dropdown
                suggestions={this.state.filteredOptions}
                completeMethod={this.searchOption}
                field="title"
                placeholder="Search Category"
                value={this.state.ven_category}
                onChange={(e) =>
                  this.setState({ ven_category: e.target.value })
                }
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

Vendor.propTypes = {
  fetchVendors: PropTypes.func.isRequired,
  vendors: PropTypes.array.isRequired,
  editVendor: PropTypes.func.isRequired,
  deleteVendor: PropTypes.func.isRequired,
  createVendor: PropTypes.func.isRequired,
  addVenCategory: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  disableVendor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  vendors: state.vendors.vendors,
  categories: state.categories.categories,
  booksize: state.vendors.booksize,
  pagesize: state.vendors.pagesize,
});

export default connect(mapStateToProps, {
  fetchVendors,
  editVendor,
  deleteVendor,
  createVendor,
  addVenCategory,
  fetchCategories,
  disableVendor,
})(Vendor);
