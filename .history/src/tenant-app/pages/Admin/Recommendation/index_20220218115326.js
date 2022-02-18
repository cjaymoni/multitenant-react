import React, { Component } from 'react';
import CardDemo from '../../../../shared/components/card/CardDemo';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import {
  fetchPriorities,
  fetchRecommendations,
  fetchDepartmentRecommendations,
  deleteRecommendation,
  editRecommendation,
  createRecommendation,
} from '../../../../shared/redux/actions/recommendationActions';
import PropTypes from 'prop-types';
import Can from '../../../../shared/casl/can';
import { InputTextarea } from 'primereact/inputtextarea';
import moment from 'moment';
import Select from 'react-select';
import { fetchInventories } from '../../../../shared/redux/actions/inventoryActions';
import { Form, Formik } from 'formik';
import { RecommendationSchema } from '../../../../shared/utils/validation';
import {
  authorBodyTemplate,
  CardData,
  dateBodyTemplate,
  itemBodyTemplate,
  priorityBodyTemplate,
  statusBodyTemplate,
} from './const';
import TableUI from '../../../../shared/components/Table/Table';
import { AutoComplete } from 'primereact/autocomplete';

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      toggler1: false,
      toggler2: false,
      acceptToggler: false,
      declineToggler: false,
      deliverToggler: false,
      deleteToggler: false,
      disableToggler: false,
      inventoryToggler: false,
      inventory_id: '',
      recommendations: [],
      info: [],
      infoauth: [],
      infopri: [],
      infoinf: [],
      inventoryLoaded: false,
      inventoryoptions: [],
      inventoryLoading: false,
      portalPlacement: 'bottom',
      isLoading: false,
      optionsLoaded: false,
      options: [],
      globalFilter: '',
      loading: false,
      justification: '',
      selectedPriority: null,
      filteredPriorities: null,
      filteredInventories: null,
      selectedInventory: null,
    };
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.reset = this.reset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.searchPriority = this.searchPriority.bind(this);
    this.searchInventory = this.searchInventory.bind(this);
  }
  searchPriority(event) {
    setTimeout(() => {
      let filteredPriorities;
      if (!event.query.trim().length) {
        filteredPriorities = [...this.props.priorities];
      } else {
        filteredPriorities = this.props.priorities.filter(option => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredPriorities });
      // console.log(filteredOptions);
    }, 250);
  }
  searchInventory(event) {
    setTimeout(() => {
      let filteredInventories;
      if (!event.query.trim().length) {
        filteredInventories = [...this.props.inventories];
      } else {
        filteredInventories = this.props.inventories.filter(option => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredInventories });
      // console.log(filteredOptions);
    }, 250);
  }
  toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
      info: rowData,
      infoauth: rowData.author,
      infopri: rowData.priority,
    });
  }

  handleLoadOptions = () => {
    let options;
    setTimeout(() => {
      options = this.props.priorities.map(i => ({
        label: i.title,
        value: i.id,
      }));
      this.setState({
        optionsLoaded: true,
        options,
        isLoading: false,
      });
    }, 2000);
  };

  handleClose() {
    this.setState({ toggler: false });
    this.setState({ toggler1: false });
    this.setState({ toggler2: false });
    this.setState({ acceptToggler: false });
    this.setState({ declineToggler: false });
    this.setState({ deliverToggler: false });
    this.setState({ deleteToggler: false });
    this.setState({ inventoryToggler: false });
    this.setState({ disableToggler: false });
  }
  reset() {
    this.setState({ globalFilter: '' });
    this.dt.reset();
  }
  componentDidMount() {
    this.props.fetchInventories();
    this.props.fetchPriorities();
  }

  handleChange(evt, field) {
    // check it out: we get the evt.target.title (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same title, using bracket syntax
    this.setState({ [field]: evt.target.value });
  }

  createRecommendation() {
    const recommendationPayload = {
      id: this.state.info.id,
      title: this.state.title | this.state.info.title,
      justification: this.state.justification | this.state.info.justification,
      metatitle: this.state.metatitle | this.state.info.metatitle,
      // department_name: this.state.department_name,
      description: this.state.description,
    };

    this.props.createRecommendation(recommendationPayload);
  }

  maybeLoadOptions = () => {
    if (!this.state.optionsLoaded) {
      this.setState({ isLoading: true });
      this.handleLoadOptions();
    }
  };
  updateRecommendation() {
    const recommendationPayload = {
      id: this.state.info.id,
      title: this.state.title | this.state.info.title,
      justification: this.state.justification | this.state.info.justification,
      metatitle: this.state.metatitle | this.state.info.metatitle,
      // department_name: this.state.department_name,
      description: this.state.description,
      author_name: this.state.author_name,
    };

    this.props.editRecommendation(recommendationPayload);
  }

  deleteProposal() {
    const id = this.state.info.id;
    this.props.deleteRecommendation(id);
  }

  deliverProposal() {
    const id = this.state.info.id;
    const updateData = {
      status: 'delivered',
      send_email: true,
    };
    this.props.editRecommendation(id, updateData);
  }

  declineProposal() {
    const id = this.state.info.id;
    const updateData = {
      status: 'declined',
      send_email: true,
      justification: this.state.justification,
    };
    this.props.editRecommendation(id, updateData);
  }
  acceptProposal() {
    const id = this.state.info.id;
    const updateData = {
      status: 'accepted',
      send_email: true,
      inventory_id: this.state.inventory_id.id,
    };
    this.props.editRecommendation(id, updateData);
  }
  disableProposal() {
    const id = this.state.info.id;
    const updateData = {
      status: 'inactive',
    };
    this.props.editRecommendation(updateData, id);
  }

  ItemDialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        form="postform"
        onClick={() => this.handleClose()}
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
          this.acceptProposal();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );
  declineDialogFooter = (
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
          this.declineProposal();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );
  deliverDialogFooter = (
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
          this.deliverProposal();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  deleteDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        // onClick={hideDeleteRequestDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          this.deleteProposal();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  disableDialogFooter = (
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
          this.disableProposal();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  loadInventory = () => {
    let inventoryoptions;
    setTimeout(() => {
      inventoryoptions = this.props.inventories.map(i => ({
        label: i.title,
        value: i.id,
      }));
      this.setState({
        inventoryLoaded: true,
        inventoryoptions,
        inventoryLoading: false,
      });
    }, 2000);
  };

  maybeLoadInventory = () => {
    if (!this.state.inventoryLoaded) {
      this.setState({ inventoryLoading: true });
      this.loadInventory();
    }
  };
  handleOpen(toggler) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
    });
  }

  render() {
    const initialValues = {
      title: '',
      justification: '',
      description: '',
      priority_id: '',
    };

    const actionBodyTemplate = rowData => {
      switch (rowData.status) {
        case 'active':
          return (
            <React.Fragment>
              <Can do="info" on="Recommendation">
                <Button
                  onClick={() => this.toggle('toggler2', rowData)}
                  icon="pi pi-info"
                  className="p-button-rounded p-button-info mr-2"
                  tooltip="More Info"
                  tooltipOptions={{ position: 'bottom' }}
                ></Button>
              </Can>
              <Can do="edit" on="Recommendation">
                <Button
                  onClick={() => this.toggle('acceptToggler', rowData)}
                  icon="pi pi-check"
                  className="p-button-rounded p-button-success mr-2"
                  tooltip="Accept"
                  tooltipOptions={{ position: 'bottom' }}
                />
              </Can>
              <Can do="edit" on="Recommendation">
                <Button
                  onClick={() => this.toggle('declineToggler', rowData)}
                  icon="pi pi-times"
                  className="p-button-rounded p-button-warning mr-2"
                  tooltip="Decline"
                  tooltipOptions={{ position: 'bottom' }}
                />
              </Can>
            </React.Fragment>
          );
        case 'accepted':
          return (
            <React.Fragment>
              <Can do="info" on="Recommendation">
                <Button
                  onClick={() => this.toggle('toggler2', rowData)}
                  icon="pi pi-info"
                  className="p-button-rounded p-button-info mr-2"
                  tooltip="More Info"
                  tooltipOptions={{ position: 'bottom' }}
                ></Button>
              </Can>
              <Can do="deliver" on="Recommendation">
                <Button
                  icon="pi pi-reply"
                  className="p-button-rounded p-button-success mr-2"
                  onClick={() => this.toggle('deliverToggler', rowData)}
                  tooltip="Deliver"
                  tooltipOptions={{ position: 'bottom' }}
                />
              </Can>
            </React.Fragment>
          );
        case 'declined':
          return (
            <React.Fragment>
              <Can do="info" on="Recommendation">
                <Button
                  onClick={() => this.toggle('toggler2', rowData)}
                  icon="pi pi-info"
                  className="p-button-rounded p-button-info mr-2"
                  tooltip="More Info"
                  tooltipOptions={{ position: 'bottom' }}
                ></Button>
              </Can>
              <Can do="disable" on="Recommendation">
                <Button
                  icon="pi pi-ban"
                  className="p-button-rounded p-button-danger  mr-2"
                  onClick={() => this.toggle('disableToggler', rowData)}
                  tooltip="Delete"
                  tooltipOptions={{ position: 'bottom' }}
                />
              </Can>
            </React.Fragment>
          );
        case 'delivered':
          return (
            <React.Fragment>
              <Can do="info" on="Recommendation">
                <Button
                  onClick={() => this.toggle('toggler2', rowData)}
                  icon="pi pi-info"
                  className="p-button-rounded p-button-info mr-2"
                  tooltip="More Info"
                  tooltipOptions={{ position: 'bottom' }}
                ></Button>
              </Can>
              <Can do="disable" on="Recommendation">
                <Button
                  icon="pi pi-ban"
                  className="p-button-rounded p-button-danger mr-2"
                  onClick={() => this.toggle('disableToggler', rowData)}
                  tooltip="Delete"
                  tooltipOptions={{ position: 'bottom' }}
                />
              </Can>
            </React.Fragment>
          );
        default:
          return (
            <Can do="info" on="Recommendation">
              <Button
                onClick={() => this.toggle('toggler2', rowData)}
                icon="pi pi-info"
                className="p-button-rounded p-button-info mr-2"
                tooltip="More Info"
                tooltipOptions={{ position: 'bottom' }}
              ></Button>
            </Can>
          );
      }
    };
    const proposalColumns = [
      { field: 'author.email', header: 'Email', body: authorBodyTemplate },
      { field: 'title', header: 'Item', body: itemBodyTemplate },
      { field: 'created_at', header: 'Date', body: dateBodyTemplate },
      {
        field: 'priority.title',
        header: 'Priority',
        body: priorityBodyTemplate,
      },
      { field: 'status', header: 'Status', body: statusBodyTemplate },
      { header: 'Action(s)', body: actionBodyTemplate },
    ];

    // const completed = this.props.recommendations.filter(m=>m.status ==='delivered');
    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: '20px', color: '#495057' }}
        >
          Recommendation info
        </h2>
        <br></br>

        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-7 p-md-3 p-lg-2">
            <CardDemo
              title="Total recommendations"
              icon="pi pi-comments"
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
              content={this.props.pagesize}
            ></CardDemo>
          </div>
          <div className="p-col-7 p-md-3 p-lg-2">
            <CardDemo
              title="Open "
              icon="pi pi-comments"
              color="#e7cbec"
              iconColor="#9c27b0"
              update="1"
              content={this.props.pagesize - this.props.delivered.length}
            ></CardDemo>
          </div>
          <div className="p-col-7 p-md-3 p-lg-2">
            <CardDemo
              title="Settled "
              icon="pi pi-comments"
              update="1"
              color="#fde0c2"
              iconColor="#f57c00"
              content={this.props.delivered.length}
            ></CardDemo>
          </div>
        </div>

        <br></br>
        <div className="p-grid">
          <div className="datatable-responsive-demo">
            <div>
              {
                <TableUI
                  tableHeader="Recommendations"
                  columns={proposalColumns}
                  fetchFunction={this.props.fetchRecommendations}
                  fetchFunction1={this.props.fetchDepartmentRecommendations}
                  clickFunction={() => this.handleOpen('toggler1')}
                  style={{
                    width: '76vw',
                    marginLeft: '15px',
                    marginBottom: '0px',
                    marginTop: '0px',
                  }}
                  figment={{
                    position: 'absolute',
                    top: '4%',
                    left: '22%',
                    height: '35px',
                    width: '30%',
                  }}
                />
              }
            </div>
          </div>
        </div>

        <Dialog
          draggable={false}
          visible={this.state['toggler1']}
          style={{ width: '40vw' }}
          header="Recommend Asset"
          modal
          className="p-fluid"
          footer={this.ItemDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={RecommendationSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={values => {
              const postData = {
                title: values.title,
                department_id: this.props.user.department_id,
                justification: values.justification,
                description: values.description,
                author_id: this.props.user.id,
                priority_id: values.priority_id.id,
                status: 'accepted',
                send_email: true,
                inventory_id: 11,
              };
              this.props.createRecommendation(postData);
            }}
          >
            {props => {
              const { handleChange, values, errors, onSubmit } = props;
              return (
                <>
                  <Form id="postform">
                    <div className="formgrid grid">
                      <div className="field col-12">
                        <label htmlFor="firstname6">
                          Device / Equipment Specification
                        </label>
                        <InputText
                          id="title"
                          type="text"
                          name="title"
                          placeholder="Example: (HP OMEN 15)"
                          value={values.title}
                          className={
                            errors.title ? 'p-invalid p-d-block' : 'p-d-block'
                          }
                          onChange={handleChange('title')}
                        />
                        <div className="error-message mt-1">{errors.title}</div>
                      </div>
                      <div className="field col-12">
                        <label htmlFor="lastname6">
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
                          onChange={selectedOption => {
                            let event = {
                              target: {
                                name: 'priority_id',
                                value: selectedOption.target.value,
                              },
                            };
                            handleChange(event);
                          }}
                        />
                        <div className="error-message mt-1">
                          {errors.priority_id}
                        </div>
                      </div>

                      <div className="field col-12">
                        <label htmlFor="firstname6">Justification</label>
                        <InputTextarea
                          id="justification"
                          name="justification"
                          placeholder="Enter justification"
                          value={values.justification}
                          onChange={handleChange('justification')}
                          className={
                            errors.justification
                              ? 'p-invalid p-d-block'
                              : 'p-d-block'
                          }
                        />
                        <div className="error-message mt-1">
                          {errors.justification}
                        </div>
                      </div>
                      <div className="field col-12">
                        <label htmlFor="firstname6">Description</label>
                        <InputTextarea
                          id="description"
                          name="description"
                          placeholder="Enter item description"
                          value={values.description}
                          onChange={handleChange('description')}
                          className={
                            errors.description
                              ? 'p-invalid p-d-block'
                              : 'p-d-block'
                          }
                        />
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
          visible={this.state['toggler2']}
          style={{ width: '40vw' }}
          header="Recommendation Info"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="namefItem">Email</label>
              <InputText value={this.state.infoauth.email} disabled />
            </div>
            <div className="field col">
              <label htmlFor="namefItem">Device specification</label>
              <InputText value={this.state.info.title} disabled />
            </div>
          </div>

          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="namefItem">Justification</label>
              <InputText value={this.state.info.justification} disabled />
            </div>
            <div className="field col">
              <label htmlFor="namefItem">Date recommended</label>
              <InputText
                value={moment(this.state.info.created_at).format('YYYY/MM/DD')}
                disabled
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="namefItem">Urgency</label>
              <InputText value={this.state.infopri.title} disabled />
            </div>
            <div className="field col">
              <label htmlFor="namefItem">Status</label>
              <InputText value={this.state.info.status} disabled />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state['acceptToggler']}
          style={{ width: '35vw' }}
          header="Accept Recommendation"
          modal
          className="p-fluid"
          footer={this.acceptDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i className="pi pi-check p-mr-3" style={{ fontSize: '1rem' }} />
            {this.state.info && (
              <span>
                Accept Recommendation For <b>{this.state.info.title}</b>?
              </span>
            )}
          </div>
          <br></br>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="namefItem">Select Target Inventory</label>
              <AutoComplete
                name="inventory_id"
                id="inventory_id"
                className="w-full"
                dropdown
                suggestions={this.state.filteredInventories}
                completeMethod={this.searchInventory}
                field="title"
                placeholder="Select Target Inventory"
                value={this.state.inventory_id}
                onChange={selectedOption => {
                  this.setState({ inventory_id: selectedOption.target.value });
                }}
              />
              {/* <Select
                searchable={true}
                onBlurResetsInput={false}
                onCloseResetsInput={false}
                placeholder="Select Target Inventory"
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                menuPortalTarget={document.body}
                labelKey="title"
                valuekey="id"
                autoload={false}
                isLoading={this.state.inventoryLoading}
                options={this.state.inventoryoptions}
                onFocus={this.maybeLoadInventory}
                onChange={selectedOption => {
                  this.setState({ inventory_id: selectedOption.value });
                }}
              /> */}
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state['declineToggler']}
          style={{ width: '35vw' }}
          header="Decline Recommendation"
          modal
          className="p-fluid"
          footer={this.declineDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-2"
              style={{ fontSize: '1rem' }}
            />
            {this.state.info && (
              <span>
                Decline Recommendation For <b>{this.state.info.title}</b>
              </span>
            )}
          </div>
          <br></br>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="pickup_date"> Justification </label>
              <InputTextarea
                id="justification"
                name="justification"
                onChange={event => this.handleChange(event, 'justification')}
                value={this.state.justification}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state['deliverToggler']}
          style={{ width: '30vw' }}
          header="Deliver Recommendation"
          modal
          className="p-fluid"
          footer={this.deliverDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i className="pi pi-check p-mr-3" style={{ fontSize: '2rem' }} />
            {this.state.info && (
              <span>
                Deliver Recommendation For <b>{this.state.info.title}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state['deleteToggler']}
          style={{ width: '30vw' }}
          header="Delete Recommendation"
          modal
          className="p-fluid"
          footer={this.deleteDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: '2rem' }}
            />
            {this.state.info && (
              <span>
                Delete Recommendation For <b>{this.state.info.title}</b>?
              </span>
            )}
          </div>
        </Dialog>
        <Dialog
          draggable={false}
          visible={this.state['disableToggler']}
          style={{ width: '30vw' }}
          header="Delete Recommendation"
          modal
          className="p-fluid"
          footer={this.disableDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle p-mr-3"
              style={{ fontSize: '2rem' }}
            />
            {this.state.info && (
              <span>
                Delete Recommendation For <b>{this.state.info.title}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}

Recommendation.propTypes = {
  fetchRecommendations: PropTypes.func.isRequired,
  recommendations: PropTypes.array.isRequired,
  editRecommendation: PropTypes.func.isRequired,
  deleteRecommendation: PropTypes.func.isRequired,
  createRecommendation: PropTypes.func.isRequired,
  fetchDepartmentRecommendations: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
  departmentrecommendations: PropTypes.array.isRequired,
  pagesize: PropTypes.any.isRequired,
  fetchInventories: PropTypes.func.isRequired,
  inventories: PropTypes.array.isRequired,
  fetchPriorities: PropTypes.func.isRequired,
  priorities: PropTypes.array.isRequired,
};
// TableUI.props={
//   fetchFunction:this.props.fetchRecommendations
// }
const mapStateToProps = state => ({
  recommendations: state.recommendations.recommendations,
  user: state.auth.user,
  departmentrecommendations: state.recommendations.departmentrecommendations,
  pagesize: state.recommendations.pagesize,
  inventories: state.inventories.inventories,
  priorities: state.recommendations.priorities,
  delivered: state.recommendations.delivered,
});
export default connect(mapStateToProps, {
  fetchRecommendations,

  fetchDepartmentRecommendations,
  fetchInventories,
  fetchPriorities,
  deleteRecommendation,
  editRecommendation,
  createRecommendation,
})(Recommendation);
