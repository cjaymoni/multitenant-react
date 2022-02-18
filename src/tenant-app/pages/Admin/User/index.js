import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import CardDemo from '../../../../shared/components/card/CardDemo';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import '../../../../shared/components/Table/Table.css';
import { connect } from 'react-redux';
import {
  fetchLocation,
  fetchLocationDepartments,
} from '../../../../shared/redux/actions/locationActions';
import {
  fetchByUserId,
  fetchUsers,
  editUser,
  deleteUser,
  disableUser,
  createUser,
  fetchRoles,
} from '../../../../shared/redux/actions/userActions';
import PropTypes from 'prop-types';
import Can from '../../../../shared/casl/can';
import { Form, Formik } from 'formik';
import { UserSchema } from '../../../../shared/utils/validation';
import { RandomPassword } from './RandomPassword';
import { fetchDepartments } from '../../../../shared/redux/actions/departmentActions';
import {
  CardData,
  emailTemplate,
  fnameTemplate,
  lnameTemplate,
  phoneTemplate,
  roleTemplate,
} from './const';
import TableUI from '../../../../shared/components/Table/Table';
import ExcelReader from './fileupload/Reader';
import { AutoComplete } from 'primereact/autocomplete';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      updateToggler: false,
      toggler2: false,
      infoToggler: false,
      fileToggler: false,
      info: [],
      details: [],
      selectedUsertype: null,
      globalFilter: '',
      inputText: '',
      portalPlacement: 'bottom',
      password: '',
      locationoptions: [],
      departmentoptions: [],
      roleoptions: [],
      isLoading: false,
      isdepLoading: false,

      locationLoaded: false,
      departmentLoaded: false,
      roleLoaded: false,
      loc_id: '',
      role_id: '',
      last_name: '',
      first_name: '',
      middle_name: '',
      phone: '',
      location_id: '',
      department_id: '',
      userd: {},
      usero: [],
      usein: [],
      loading: false,
      selectedRole: null,
      filteredRoles: null,
      selectedLocation: null,
      filteredDepartments: null,
      selectedDepartment: null,
      filteredLocations: null,
    };
    this.reset = this.reset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInfoOpen = this.handleInfoOpen.bind(this);
    this.searchLocation = this.searchLocation.bind(this);
    this.searchDepartment = this.searchDepartment.bind(this);
    this.searchRole = this.searchRole.bind(this);
  }

  componentDidMount() {
    // this.props.fetchUsers()
    this.props.fetchDepartments();
    this.generatePwd();
    this.props.fetchLocation();
    this.props.fetchRoles();
  }
  searchLocation(event) {
    setTimeout(() => {
      let filteredLocations;
      if (!event.query.trim().length) {
        filteredLocations = [...this.props.locations];
      } else {
        filteredLocations = this.props.locations.filter(option => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredLocations });
      // console.log(filteredOptions);
    }, 250);
  }
  searchRole(event) {
    setTimeout(() => {
      let filteredRoles;
      if (!event.query.trim().length) {
        filteredRoles = [...this.props.roles];
      } else {
        filteredRoles = this.props.roles.filter(option => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredRoles });
      // console.log(filteredOptions);
    }, 250);
  }
  searchDepartment(event) {
    setTimeout(() => {
      let filteredDepartments;
      if (!event.query.trim().length) {
        filteredDepartments = [...this.props.departments];
      } else {
        filteredDepartments = this.props.departments.filter(option => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredDepartments });
      // console.log(filteredOptions);
    }, 250);
  }
  updateUser() {
    const id = this.state.info.id;
    const userPayload = {
      department_id:
        this.state.department_id.id || this.state.info.department_id,
      location_id: this.state.location_id.id || this.state.info.location_id,
      role_id: this.state.role_id.id || this.state.usero.id,
      info: {
        first_name: this.state.first_name || this.state.usein.first_name,
        middle_name: this.state.middle_name || this.state.usein.middle_name,
        last_name: this.state.last_name || this.state.usein.last_name,
        phone: this.state.phone || this.state.usein.phone,
      },
    };
    this.props.editUser(userPayload, id);
  }
  reset() {
    this.setState({ globalFilter: '' });
    this.dt.reset();
  }
  deleteUser() {
    const id = this.state.info.id;
    this.props.deleteUser(id);
  }

  disableUser() {
    const id = this.state.info.id;
    const payLoad = {
      status: 'false',
    };
    this.props.disableUser(payLoad, id);
  }
  handleOpen(toggler) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
    });
  }

  handleClose() {
    this.setState({ toggler: false });
    this.setState({ updateToggler: false });
    this.setState({ toggler2: false });
    this.setState({ infoToggler: false });
    this.setState({ fileToggler: false });
  }

  async toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    await this.setState({
      info: rowData,
      usein: rowData.info,
      usero: rowData.role,
    });
    return this.setState({
      [toggler]: !togglerStatus,
    });
  }

  async handleInfoOpen(rowData) {
    await this.props.fetchByUserId(rowData.id);
    return this.setState({ updateToggler: true, userd: this.props.userdetail });
  }

  handleChange(evt, field) {
    // check it out: we get the evt.target.title (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same title, using bracket syntax
    this.setState({ [field]: evt.target.value });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  adduserDialogFooter = (
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
        form="postform"
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

  deleteuserDialogFooter = (
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
          this.disableUser();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  edituserDialogFooter = (
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
          this.updateUser();
          this.handleClose();
        }}
      />
    </React.Fragment>
  );

  loadRoles = () => {
    let roleoptions;
    setTimeout(() => {
      roleoptions = this.props.roles.map(i => ({
        label: i.title,
        value: i.id,
      }));
      this.setState({
        roleLoaded: true,
        roleoptions,
        isLoading: false,
      });
    }, 2000);
  };

  maybeLoadRoles = () => {
    if (!this.state.roleLoaded) {
      this.setState({ isLoading: true });
      this.loadRoles();
    }
  };

  generatePwd() {
    let password = new RandomPassword()
      .setLength(8)
      .setLowerCase(true)
      .setUpperCase(true)
      .setNumberCase(true)
      .generate();
    this.setState({ password });
  }

  render() {
    const initialValues = {
      first_name: '',
      last_name: '',
      middle_name: '',
      role_id: '',
      phone: '',
      email: '',
      department_id: '',
      password: this.state.password,
      location_id: '',
    };

    const actionBodyTemplate = rowData => {
      return (
        <React.Fragment>
          <Can do="view" on="User">
            <Button
              onClick={() => this.toggle('infoToggler', rowData)}
              icon="pi pi-info"
              className="p-button-rounded p-button-info mr-2"
              tooltip="More Info"
              tooltipOptions={{ position: 'bottom' }}
            ></Button>
          </Can>
          &nbsp;
          <Can do="edit" on="User">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning mr-2"
              onClick={() => this.toggle('updateToggler', rowData)}
              tooltip="Edit User"
              tooltipOptions={{ position: 'bottom' }}
            />
          </Can>
          &nbsp;
          <Can do="disable" on="User">
            <Button
              icon="pi pi-ban"
              className="p-button-rounded p-button-danger"
              onClick={() => this.toggle('toggler2', rowData)}
              tooltip="Delete User"
              tooltipOptions={{ position: 'bottom' }}
            />
          </Can>
          &nbsp;
          <Can do="delete" on="User">
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger"
              // onClick={() => this.toggle("toggler2", rowData)}
              tooltip="Delete User"
              tooltipOptions={{ position: 'bottom' }}
            />
          </Can>
        </React.Fragment>
      );
    };

    const userColumns = [
      { field: 'email', header: 'Email', body: emailTemplate },
      { field: 'info.first_name', header: 'First name', body: fnameTemplate },
      { field: 'info.last_name', header: 'Last name', body: lnameTemplate },
      { field: 'info.phone', header: 'Contact', body: phoneTemplate },
      { field: 'role.title', header: 'Usertype', body: roleTemplate },
      { header: 'Action(s)', body: actionBodyTemplate },
    ];

    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: '20px', color: '#495057' }}
        >
          Users info
        </h2>
        <br></br>
        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Total users"
              icon="pi pi-shopping-cart"
              content={this.props.booksize}
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
            ></CardDemo>
          </div>
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Disabled users"
              icon="pi pi-shopping-cart"
              color="#e7cbec"
              iconColor="#9c27b0"
              update="1"
              content={this.props.booksize - this.props.pagesize}
            ></CardDemo>
          </div>
        </div>
        <br></br>
        <div className="datatable-responsive-demo">
          <div>
            <TableUI
              tableHeader="Manage Users"
              columns={userColumns}
              fetchFunction={this.props.fetchUsers}
              clickFunction={() => this.handleOpen('toggler')}
              clickFunction1={() => this.handleOpen('fileToggler')}
              style={{
                width: '76vw',
                marginLeft: '15px',
                marginBottom: '0px',
                marginTop: '0px',
              }}
              figment={{
                height: '35px',
                width: '40%',
                position: 'absolute',
                left: '20%',
                top: '3%',
              }}
            />
          </div>
        </div>

        <Dialog
          draggable={false}
          visible={this.state['toggler']}
          header="Add New User"
          modal
          className="p-fluid w-6"
          footer={this.adduserDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={UserSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={values => {
              const postData = {
                first_name: values.first_name,
                last_name: values.last_name,
                middle_name: values.middle_name,
                role_id: values.role_id.id,
                phone: values.phone,
                email: values.email,
                password: values.password,
                department_id: values.department_id.id,
                location_id: values.location_id.id,
              };
              console.log(postData);
              this.props.createUser(postData);
            }}
          >
            {props => {
              const { handleChange, values, errors } = props;

              return (
                <>
                  <Form id="postform">
                    <div className="formgrid grid">
                      <div className="field col">
                        <label htmlFor="state" className="block font-normal">
                          User Type
                        </label>
                        <AutoComplete
                          className="w-full"
                          dropdown
                          name="role_id"
                          id="role_id"
                          suggestions={this.state.filteredRoles}
                          completeMethod={this.searchRole}
                          field="title"
                          placeholder="Select usertype"
                          value={props.values.role_id}
                          onChange={selectedOption => {
                            let event = {
                              target: {
                                name: 'role_id',
                                value: selectedOption.target.value,
                              },
                            };
                            handleChange(event);
                          }}
                        />

                        <div className="error-message">{errors.role_id}</div>
                      </div>

                      <div className="field col">
                        <label htmlFor="staff_id" className="block font-normal">
                          Email
                        </label>
                        <InputText
                          id="staff_id"
                          type="text"
                          value={values.email}
                          placeholder="Email"
                          onChange={handleChange('email')}
                          className={
                            errors.email ? 'p-invalid p-d-block' : 'p-d-block'
                          }
                        />
                      </div>
                      <div className="field col">
                        <label htmlFor="state" className="block font-normal">
                          Password{' '}
                        </label>
                        <InputText disabled value={values.password} />
                      </div>
                    </div>
                    <div className="fluid formgrid grid">
                      <div className="field col">
                        <label htmlFor="state" className="block font-normal">
                          Location{' '}
                        </label>
                        <AutoComplete
                          name="location_id"
                          id="location_id"
                          className="w-full"
                          dropdown
                          suggestions={this.state.filteredLocations}
                          completeMethod={this.searchLocation}
                          field="title"
                          placeholder="Select location"
                          value={props.values.location_id}
                          onChange={selectedOption => {
                            let event = {
                              target: {
                                name: 'location_id',
                                value: selectedOption.target.value,
                              },
                            };
                            handleChange(event);
                          }}
                        />

                        <div className="error-message">
                          {errors.location_id}
                        </div>
                      </div>
                      <div className="field col">
                        <label
                          htmlFor="firstname6"
                          className="block font-normal"
                        >
                          Last name
                        </label>
                        <InputText
                          id="firstname6"
                          type="text"
                          value={values.last_name}
                          placeholder="Last name"
                          onChange={handleChange('last_name')}
                          className={
                            errors.last_name
                              ? 'p-invalid p-d-block'
                              : 'p-d-block'
                          }
                        />
                      </div>
                      <div className="field col">
                        <label
                          htmlFor="lastname6"
                          className="block font-normal"
                        >
                          First name
                        </label>
                        <InputText
                          id="lastname6"
                          type="text"
                          value={values.first_name}
                          onChange={handleChange('first_name')}
                          placeholder="First name"
                          className={
                            errors.first_name
                              ? 'p-invalid p-d-block'
                              : 'p-d-block'
                          }
                        />
                      </div>
                    </div>
                    <div className="fluid formgrid grid">
                      <div className="field col">
                        <label htmlFor="state" className="block font-normal">
                          Department{' '}
                        </label>
                        <AutoComplete
                          className="w-full"
                          dropdown
                          name="department_id"
                          id="department_id"
                          suggestions={this.state.filteredDepartments}
                          completeMethod={this.searchDepartment}
                          field="title"
                          placeholder="Select department"
                          value={props.values.department_id}
                          onChange={selectedOption => {
                            let event = {
                              target: {
                                name: 'department_id',
                                value: selectedOption.target.value,
                              },
                            };
                            handleChange(event);
                          }}
                        />

                        <div className="error-message">
                          {errors.department_id}
                        </div>
                      </div>
                      <div className="field col">
                        <label htmlFor="email" className="block font-normal">
                          Middle name
                        </label>
                        <InputText
                          id="email"
                          type="text"
                          value={values.middle_name}
                          placeholder="Middle name"
                          onChange={handleChange('middle_name')}
                          className={
                            errors.middle_name
                              ? 'p-invalid p-d-block'
                              : 'p-d-block'
                          }
                        />
                      </div>

                      <div className="field col">
                        <label htmlFor="city" className="block font-normal">
                          Phone
                        </label>
                        <InputText
                          id="phone"
                          placeholder="0240000000"
                          maxlength={10}
                          value={values.phone}
                          onChange={handleChange('phone')}
                          className={
                            errors.phone ? 'p-invalid p-d-block' : 'p-d-block'
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
          visible={this.state['fileToggler']}
          style={{ width: '600px' }}
          header="Upload Users File"
          modal
          className="p-fluid"
          onHide={this.handleClose}
        >
          <ExcelReader handleFunction={() => this.handleClose()} />
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state['updateToggler']}
          style={{ width: '40vw' }}
          header="Edit User"
          modal
          className="p-fluid"
          footer={this.edituserDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="state" className="block font-normal">
                User Type
              </label>
              <AutoComplete
                className="w-full"
                dropdown
                suggestions={this.state.filteredRoles}
                completeMethod={this.searchRole}
                field="title"
                value={this.state.role_id}
                placeholder={this.state.usero.title}
                defaultValue={this.state.usero}
                onChange={selectedOption => {
                  this.setState({ role_id: selectedOption.target.value });
                }}
              />
            </div>
            <div className="field col">
              <label htmlFor="last_name" className="block font-normal">
                Last Name
              </label>
              <InputText
                id="last_name"
                name="last_name"
                type="text"
                defaultValue={this.state.usein.last_name}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="first_name" className="block font-normal">
                First name
              </label>
              <InputText
                id="first_name"
                name="first_name"
                type="text"
                defaultValue={this.state.usein.first_name}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="field col">
              <label htmlFor="middle_name" className="block font-normal">
                Middle Name
              </label>
              <InputText
                id="middle_name"
                name="middle_name"
                type="text"
                defaultValue={this.state.usein.middle_name}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="phone" className="block font-normal">
                Phone
              </label>
              <InputText
                id="phone"
                name="phone"
                placeholder="(233) 000-0000"
                defaultValue={this.state.usein.phone}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="field col">
              <label htmlFor="location_id" className="block font-normal">
                Location
              </label>
              <AutoComplete
                className="w-full"
                dropdown
                suggestions={this.state.filteredLocations}
                completeMethod={this.searchLocation}
                field="title"
                placeholder="Select location"
                value={this.state.location_id}
                defaultValue={this.state.info.location_id}
                onChange={selectedOption => {
                  this.setState({ location_id: selectedOption.target.value });
                  this.props.fetchLocationDepartments(
                    selectedOption.target.value.id
                  );
                }}
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="department_id" className="block font-normal">
                Department
              </label>
              <AutoComplete
                className="w-full"
                dropdown
                id="department_id"
                name="department_id"
                suggestions={this.state.filteredDepartments}
                completeMethod={this.searchDepartment}
                field="title"
                placeholder="Select department"
                value={this.state.department_id}
                defaultValue={this.state.info.department_id}
                onChange={selectedOption => {
                  this.setState({ department_id: selectedOption.target.value });
                }}
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state['toggler2']}
          style={{ width: '30vw' }}
          header="Delete User"
          modal
          className="p-fluid"
          footer={this.deleteuserDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-2"
              style={{ fontSize: '2rem' }}
            />
            {this.state.usein && (
              <span>
                Are you sure you want to delete{' '}
                <b>
                  {this.state.usein.first_name} {this.state.usein.last_name}
                </b>
                ?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state['infoToggler']}
          style={{ width: '32vw' }}
          header="User Details"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Usertype
              </label>
              <InputText value={this.state.usero.title} disabled />
            </div>
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Email
              </label>
              <InputText value={this.state.info.email} disabled />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                First Name
              </label>
              <InputText value={this.state.usein.first_name} disabled />
            </div>
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Last Name
              </label>
              <InputText value={this.state.usein.last_name} disabled />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Middle Name
              </label>
              <InputText value={this.state.usein.middle_name} disabled />
            </div>
            <div className="field col">
              <label htmlFor="namefItem" className="block font-normal">
                Phone
              </label>
              <InputText value={this.state.usein.phone} disabled />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

User.propTypes = {
  users: PropTypes.array.isRequired,
  fetchLocationDepartments: PropTypes.func.isRequired,
  fetchLocation: PropTypes.func.isRequired,
  fetchRoles: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  departmentlocations: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  user: PropTypes.array.isRequired,
  fetchByUserId: PropTypes.func.isRequired,
  userdetail: PropTypes.object.isRequired,
  disableUser: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  users: state.users.users,
  departmentlocations: state.locations.departmentlocations,
  locations: state.locations.locations,
  roles: state.users.roles,
  user: state.auth.user,
  userdetail: state.users.userdetail,
  departments: state.departments.departments,
  booksize: state.users.booksize,
  pagesize: state.users.pagesize,
});

export default connect(mapStateToProps, {
  fetchUsers,
  editUser,
  deleteUser,
  fetchRoles,
  fetchLocation,
  fetchLocationDepartments,
  fetchByUserId,
  disableUser,
  createUser,
  fetchDepartments,
})(User);
