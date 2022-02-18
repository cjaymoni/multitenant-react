import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import '../../../../shared/components/Table/Table.css';
import CardDemo from '../../../../shared/components/card/CardDemo';
import { Form, Formik } from 'formik';
import { VendorSchema } from '../../../../shared/utils/validation';
import Select from 'react-select';
import { connect } from 'react-redux';
import {
  fetchVendors,
  editVendor,
  deleteVendor,
  createVendor,
  addVenCategory,
  disableVendor,
} from '../../../../shared/redux/actions/vendorActions';
import { fetchCategories } from '../../../../shared/redux/actions/categoryActions';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import Can from '../../../../shared/casl/can';
import TableUI from '../../../../shared/components/Table/Table';
import {
  CardData,
  contactBodyTemplate,
  emailBodyTemplate,
  titleBodyTemplate,
} from './const';
import { AutoCompleteDemo } from '../../../../shared/components/autocomplete/AutoComplete';
import { AutoComplete } from 'primereact/autocomplete';

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
      name: '',
      contact: '',
      email: '',
      category: '',
      website: '',
      title: '',
      ven_category: '',
      selectedVendor: null,
      globalFilter: '',
      portalPlacement: 'bottom',
      categoryoptions: [],
      isLoading: false,
      categoryLoaded: false,
      loading: false,
      selectedOption: null,
      filteredOptions: null,
    };

    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchOption = this.searchOption.bind(this);
  }

  componentDidMount() {
    // this.props.fetchVendors();
    this.props.fetchCategories().then(data => {
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
        filteredOptions = this.state.categoryoptions.filter(option => {
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
      website: this.state.website || this.state.info.website,
    };
    const id = this.state.info.id;

    this.props.editVendor(id, vendorPayload);
  }

  disableVendor() {
    const vendorPayload = {
      status: 'false',
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
      categoryoptions = this.props.categories.map(i => ({
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

  onCategoryChange = ven_category => {
    this.setState({ ven_category });
  };

  render() {
    const initialValues = {
      title: '',
      contact: '',
      website: '',
      email: '',
    };
    const tte = '';
    const actionBodyTemplate = rowData => {
      return (
        <React.Fragment>
          <div className="p-d-flex">
            <Can do="info" on="Vendor">
              <Button
                icon="pi pi-info"
                className="p-button-rounded p-button-info mr-2"
                onClick={() => this.toggle('toggler2', rowData)}
                tooltip="More Info"
                tooltipOptions={{ position: 'bottom' }}
              />
            </Can>
            &nbsp;
            <Can do="edit" on="Vendor">
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-warning mr-2"
                onClick={() => this.toggle('toggler', rowData)}
                tooltip="Edit Vendor"
                tooltipOptions={{ position: 'bottom' }}
              />
            </Can>
            &nbsp;
            <Can do="edit" on="Vendor">
              <Button
                icon="pi pi-plus"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => this.toggle('addToggler', rowData)}
                tooltip="Add To Category"
                tooltipOptions={{ position: 'bottom' }}
              />
            </Can>
            &nbsp;
            <Can do="disable" on="Vendor">
              <Button
                icon="pi pi-ban"
                className="p-button-rounded p-button-danger mr-2"
                onClick={() => this.toggle('disableToggler', rowData)}
                tooltip="Delete Vendor"
                tooltipOptions={{ position: 'bottom' }}
              />
            </Can>
            &nbsp;
            <Can do="delete" on="Vendor">
              <Button
                icon="pi pi-ban"
                className="p-button-rounded p-button-danger mr-auto"
                // onClick={() => this.toggle("deleteToggler", rowData)}
                tooltip="Delete Vendor"
                tooltipOptions={{ position: 'bottom' }}
              />
            </Can>
          </div>
        </React.Fragment>
      );
    };
    const vendorColumns = [
      { field: 'title', header: 'Vendor Name', body: titleBodyTemplate },
      { field: 'contact', header: 'Vendor Contact', body: contactBodyTemplate },
      { field: 'email', header: 'Vendor Email', body: emailBodyTemplate },
      { header: 'Action(s)', body: actionBodyTemplate },
    ];

    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: '20px', color: '#495057' }}
        >
          Vendor info
        </h2>
        <br></br>
        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Total vendors"
              icon="pi pi-shopping-cart"
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
              content={this.props.booksize}
            ></CardDemo>
          </div>

          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Active vendors"
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
              tableHeader="Manage Vendors"
              columns={vendorColumns}
              fetchFunction={this.props.fetchVendors}
              clickFunction={() => this.handleOpen('createToggler')}
              style={{
                width: '76vw',
                marginLeft: '15px',
                marginBottom: '0px',
                marginTop: '0px',
              }}
              figment={{
                position: 'absolute',
                top: '4%',
                left: '30%',
                height: '35px',
                width: '40%',
              }}
            />
          </div>
        </div>

        <Dialog
          draggable={false}
          visible={this.state['createToggler']}
          style={{ width: '30vw' }}
          header="Add New Vendor"
          modal
          className="p-fluid"
          footer={this.createVendorDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={VendorSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={values => {
              const postData = {
                title: values.title,
                contact: values.contact,
                email: values.email,
                website: values.website,
              };
              this.props.createVendor(postData);
            }}
          >
            {props => {
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
                          placeholder="Vendor Name"
                          value={values.title}
                          onChange={event => handleChange(event, 'title')}
                          className={
                            errors.title ? 'p-invalid p-d-block' : 'p-d-block'
                          }
                        />
                      </div>

                      <div className="field col-12">
                        <label htmlFor="email">Email</label>
                        <InputText
                          id="email"
                          type="text"
                          placeholder="Vendor Email"
                          value={values.email}
                          onChange={event => handleChange(event, 'email')}
                          className={
                            errors.email ? 'p-invalid p-d-block' : 'p-d-block'
                          }
                        />
                      </div>

                      <div className="field col-12">
                        <label htmlFor="contact">Phone number</label>

                        <InputText
                          id="contact"
                          type="text"
                          placeholder="000-0000000"
                          maxlength={10}
                          value={values.contact}
                          onChange={event => handleChange(event, 'contact')}
                          className={
                            errors.contact ? 'p-invalid p-d-block' : 'p-d-block'
                          }
                        />
                      </div>

                      <div className="field col-12">
                        <label htmlFor="email">Website</label>
                        <InputText
                          id="website"
                          name="website"
                          placeholder="Vendor Website"
                          type="text"
                          value={values.website}
                          onChange={event => handleChange(event, 'website')}
                          className={
                            errors.website ? 'p-invalid p-d-block' : 'p-d-block'
                          }
                        />
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
          visible={this.state['toggler']}
          style={{ width: '30vw' }}
          header="Edit Vendor Details"
          modal
          className="p-fluid"
          footer={this.editVendorDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="namefItem">Vendor name</label>
              <InputText
                id="title"
                name="title"
                defaultValue={this.state.info.title}
                onChange={event => this.handleChange(event, 'title')}
              />
            </div>
            <div className="field col-12">
              <label htmlFor="namefItem">Vendor Email</label>
              <InputText
                id="email"
                name="email"
                defaultValue={this.state.info.email}
                onChange={event => this.handleChange(event, 'email')}
              />
            </div>

            <div className="field col-12">
              <label htmlFor="namefItem">Vendor Contact</label>
              <InputText
                id="contact"
                name="contact"
                type="text"
                defaultValue={this.state.info.contact}
                placeholder="(000)-(99999999)"
                onChange={event => this.handleChange(event, 'contact')}
              />
            </div>
            <div className="field col-12">
              <label htmlFor="namefItem">Vendor Website</label>
              <InputText
                id="website"
                name="website"
                defaultValue={this.state.info.website}
                onChange={event => this.handleChange(event, 'website')}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state['deleteToggler']}
          style={{ width: '450px' }}
          header="Confirm Delete"
          modal
          footer={this.deleteVendorDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: '2rem' }}
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
          visible={this.state['disableToggler']}
          style={{ width: '450px' }}
          header="Confirm Delete"
          modal
          footer={this.disableVendorDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: '2rem' }}
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
          visible={this.state['toggler2']}
          style={{ width: '30vw' }}
          header="Vendor Info"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col-12">
              <label htmlFor="namefItem">Vendor name</label>
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
              <InputText value={this.state.info.website} disabled />
            </div>
          </div>

          {/* <div className="p-formgrid p-grid">
            <div className="p-field p-col">
            <label htmlFor="namefItem">Category</label>
              <InputText
                  value={this.state.info.category}
                  disabled
                />
              
            </div>
          </div> */}
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state['addToggler']}
          style={{ width: '30vw' }}
          header="Add Vendor To Category"
          modal
          className="p-fluid"
          footer={this.addDialogFooter}
          onHide={this.handleClose}
        >
          <div className="p-formgrid p-grid">
            <div className="p-field p-col">
              <label htmlFor="namefItem">Category name</label>

              {/* <Select
                searchable={true}
                onBlurResetsInput={false}
                onCloseResetsInput={false}
                placeholder="Select Category"
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                menuPortalTarget={document.body}
                onChange={this.onCategoryChange}
                isClearable
                labelKey="title"
                valuekey="id"
                autoload={false}
                isLoading={this.state.isLoading}
                options={this.state.categoryoptions}
                onFocus={this.maybeLoadOptions}
              /> */}
              <AutoComplete
                className="w-full"
                dropdown
                suggestions={this.state.filteredOptions}
                completeMethod={this.searchOption}
                field="title"
                placeholder="Search Category"
                value={this.state.ven_category}
                onChange={e => this.setState({ ven_category: e.target.value })}
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

const mapStateToProps = state => ({
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
