import React, { Component } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import {
  fetchCategories,
  editCategory,
  deleteCategory,
  createCategory,
  disableCategory,
  fetchCategoryItems,
} from "../../../../shared/redux/actions/categoryActions";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import Can from "../../../../shared/casl/can";
import { CategorySchema } from "../../../../shared/utils/validation";
import TableUI from "../../../../shared/components/Table/Table";
import { dateBodyTemplate, infoColumns } from "./const";

class Category extends Component {
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
      selectedCategory: null,
      globalFilter: "",
      itemFilter: "",
      loading: false,
      items: [],
      catloading: false,
      scheme: "",
    };

    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openCategoryDetails = this.openCategoryDetails.bind(this);
  }

  // componentDidMount() {
  //   // this.props.fetchCategories();
  //   this.loadLazyData();
  // }

  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
  }
  async openCategoryDetails(rowData) {
    const row = rowData;
    await localStorage.setItem("cat_id", row.id);
    return window.location.assign("/category-info");
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

  updateCategory() {
    const categoryPayload = {
      title: this.state.title || this.state.info.title,
      scheme: this.state.scheme || this.state.info.scheme,
      description: this.state.description || this.state.info.description,
    };
    const id = this.state.info.id;
    this.props.editCategory(id, categoryPayload);
  }

  deleteCategory() {
    const id = this.state.info.id;

    this.props.deleteCategory(id);
  }

  disableCategory() {
    const id = this.state.info.id;
    const categoryPayload = {
      status: "false",
    };
    this.props.disableCategory(id, categoryPayload);
  }

  editCategoryDialogFooter = (
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
          this.updateCategory();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  deleteCategoryDialogFooter = (
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
          this.deleteCategory();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );
  disableCategoryDialogFooter = (
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
          this.disableCategory();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  createCategoryDialogFooter = (
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
          <Can do="info" on="Category">
            <Button
              icon="pi pi-info"
              className="p-button-rounded p-button-info p-mr-2"
              onClick={() => this.openCategoryDetails(rowData)}
              tooltip="More Info"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="edit" on="Category">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning p-mr-2"
              onClick={() => this.toggle("toggler", rowData)}
              tooltip="Edit"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="disable" on="Category">
            <Button
              icon="pi pi-ban"
              className="p-button-rounded p-button-danger  p-mr-2"
              onClick={() => this.toggle("disableToggler", rowData)}
              tooltip="Delete"
              tooltipOptions={{ position: "bottom" }}
            />
          </Can>
          &nbsp;
          <Can do="delete" on="Category">
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

    const categoryColumns = [
      { field: "title", header: "Category Name" },
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
          Category info
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
              columns={categoryColumns}
              fetchFunction={this.props.fetchCategories}
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
          header="Create Category"
          modal
          className="p-fluid"
          footer={this.createCategoryDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={CategorySchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              const postData = {
                title: values.title,
                description: values.description,
                scheme: this.props.scheme,
              };
              this.props.createCategory(postData);
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
                          placeholder="Category Name"
                          value={values.title}
                          onChange={(event) => handleChange(event, "title")}
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Name of category"
                        />
                        <small>eg: Hardware</small>
                        <div className="error-message mt-1">{errors.title}</div>
                      </div>
                      <div className="field col-12">
                        <label>Description</label>
                        <InputTextarea
                          id="description"
                          name="description"
                          value={values.description}
                          placeholder="Category Description"
                          onChange={(event) =>
                            handleChange(event, "description")
                          }
                          tooltipOptions={{ position: "bottom" }}
                          tooltip="Brief Description"
                        />
                        <small>eg: Category for Hardware items</small>
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
          header="Edit Category Details"
          modal
          className="p-fluid"
          footer={this.editCategoryDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="namefItem">Category name</label>
              <InputText
                id="title"
                name="title"
                defaultValue={this.state.info.title}
                onChange={(event) => this.handleChange(event, "title")}
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
          footer={this.deleteCategoryDialogFooter}
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
          visible={this.state["disableToggler"]}
          style={{ width: "30vw" }}
          header="Confirm Delete"
          modal
          footer={this.disableCategoryDialogFooter}
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
      </div>
    );
  }
}

Category.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  editCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  fetchCategoryItems: PropTypes.func.isRequired,
  categoryitems: PropTypes.array.isRequired,
  disableCategory: PropTypes.func.isRequired,
  scheme: PropTypes.string,
};

const mapStateToProps = (state) => ({
  categories: state.categories.categories,
  categoryitems: state.categories.categoryitems,
  booksize: state.categories.booksize,
  pagesize: state.categories.pagesize,
  scheme: state.tenants.tenantConfig.scheme,
});

export default connect(mapStateToProps, {
  fetchCategories,
  editCategory,
  deleteCategory,
  createCategory,
  fetchCategoryItems,
  disableCategory,
})(Category);
