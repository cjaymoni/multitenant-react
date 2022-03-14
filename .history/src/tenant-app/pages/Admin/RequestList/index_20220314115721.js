import React, { Component } from "react";
import CardDemo from "../../../../shared/components/card/CardDemo";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "../../../../shared/components/Table/Table.css";
import { Dropdown } from "primereact/dropdown";
import { connect } from "react-redux";
import {
  fetchRequests,
  editRequest,
  fetchDepartmentRequests,
} from "../../../../shared/redux/actions/requestActions";
import PropTypes from "prop-types";
import Can from "../../../../shared/casl/can";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { InputTextarea } from "primereact/inputtextarea";
import {
  dateBodyTemplate,
  priorityBodyTemplate,
  statusBodyTemplate,
} from "./const";
import TableUI from "../../../../shared/components/Table/Table";

class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      toggler1: false,
      toggler2: false,
      readyToggler: false,
      pickedToggler: false,
      returnedToggler: false,
      info: [],
      reqde: [],
      reqpr: [],
      asset_id: "",
      user_id: "",
      center_code: "",
      startdate: "",
      enddate: "",
      request_status: "",
      assetname: "",
      date_requested: "",
      stat: "",
      globalFilter: "",
      tdate: "",
      mdate: "",
      pdate: "",
      pickup_deadline: "",
      return_deadline: "",
      date_picked: "",
      pickup_date: "",
      return_date: "",
      date_returned: "",
      loading: false,
      totalRecords: 0,
      justification: "",

      depreqs: [],
    };
    this.toggle = this.toggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.reset = this.reset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.monthNavigatorTemplate = this.monthNavigatorTemplate.bind(this);
    this.yearNavigatorTemplate = this.yearNavigatorTemplate.bind(this);

    // this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {
    console.log(JSON.parse(localStorage.role));
  }

  async toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    await this.setState({
      info: rowData,
      reqde: rowData.item,
      reqpr: rowData.priority,
      mdate: moment(rowData.end_date).format("YYYY-MM-DD"),
      tdate: moment(rowData.start_date).format("YYYY-MM-DD"),
      pdate: moment(rowData.pickup_date).format("YYYY-MM-DD"),
    });
    return this.setState({
      [toggler]: !togglerStatus,
    });
  }

  monthNavigatorTemplate(e) {
    return (
      <Dropdown
        className="mr-1"
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        style={{ lineHeight: 1 }}
      />
    );
  }

  yearNavigatorTemplate(e) {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        className="p-ml-2"
        style={{ lineHeight: 1 }}
      />
    );
  }

  handleChange(evt, field) {
    // check it out: we get the evt.target.title (which will be either "email" or "password")
    // and use it to target the key on our `state` object with the same title, using bracket syntax
    this.setState({ [field]: evt.target.value });
  }

  handleClose() {
    this.setState({ toggler: false });
    this.setState({ toggler1: false });
    this.setState({ toggler2: false });
    this.setState({ readyToggler: false });
    this.setState({ pickedToggler: false });
    this.setState({ returnedToggler: false });
  }

  reset() {
    this.setState({ globalFilter: "" });
    this.dt.reset();
  }

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
          this.handleClose();
          this.verifyRequest();
        }}
      />
    </React.Fragment>
  );

  readyDialogFooter = (
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
          this.handleClose();
          this.readyRequest();
        }}
      />
    </React.Fragment>
  );

  pickedDialogFooter = (
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
          this.handleClose();
          this.pickedRequest();
        }}
      />
    </React.Fragment>
  );
  returnedDialogFooter = (
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
          this.handleClose();
          this.returnedRequest();
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
          this.handleClose();
          this.declinedRequest();
        }}
      />
    </React.Fragment>
  );

  deleteRequestDialogFooter = (
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
        // onClick={deleteRequest}
      />
    </React.Fragment>
  );

  deleteRequestsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        // onClick={hideDeleteRequestsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        // onClick={deleteSelectedRequests}
      />
    </React.Fragment>
  );

  verifyRequest() {
    const id = this.state.info.id;
    const updateData = {
      action: this.state.stat,
      inventory_id: this.state.info.item.inventory_id,
    };
    // console.log(id,updateData)
    this.props.editRequest(updateData, id);
  }

  declinedRequest() {
    const id = this.state.info.id;
    const updateData = {
      action: this.state.stat,
      justification: this.state.justification,
    };
    // console.log(id,updateData)
    this.props.editRequest(updateData, id);
  }

  readyRequest() {
    const id = this.state.info.id;
    const updateData = {
      action: "ready",
      pickup_deadline: moment(this.state.pickup_deadline).unix(),
      return_deadline: moment(this.state.return_deadline).unix(),
    };
    this.props.editRequest(updateData, id);
  }

  pickedRequest() {
    const id = this.state.info.id;
    const updateData = {
      action: "picked",
      pickup_date: this.state.pickup_date / 1000,
    };
    this.props.editRequest(updateData, id);
  }

  returnedRequest() {
    const id = this.state.info.id;
    const updateData = {
      action: "returned",
      return_date: this.state.return_date / 1000,
    };
    this.props.editRequest(updateData, id);
  }

  priorityBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span
          className={classNames(
            "priority-badge",
            "status-" + rowData.priority.title
          )}
        >
          {rowData.priority.title}
        </span>
      </React.Fragment>
    );
  }

  render() {
    const actionBodyTemplate = (rowData) => {
      switch (rowData.action) {
        case "created":
          return (
            <React.Fragment>
              <Can do="info" on="Request">
                <Button
                  onClick={() => this.toggle("toggler", rowData)}
                  icon="pi pi-info"
                  className="p-button-rounded p-button-info mr-2"
                  tooltip="More Info"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
              <Can do="verify" on="Request">
                <Button
                  onClick={() => {
                    this.toggle("toggler1", rowData);
                    this.setState({ stat: "accepted" });
                  }}
                  icon="pi pi-check"
                  className="p-button-rounded p-button-success mr-2"
                  tooltip="Accept Request"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
                &nbsp;
                <Button
                  onClick={() => {
                    this.toggle("toggler2", rowData);
                    this.setState({ stat: "declined" });
                  }}
                  icon="pi pi-times"
                  className="p-button-rounded p-button-warning"
                  tooltip="Decline Request"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
            </React.Fragment>
          );

        case "accepted":
          return (
            <React.Fragment>
              <Can do="info" on="Request">
                <Button
                  onClick={() => this.toggle("toggler", rowData)}
                  icon="pi pi-info"
                  className="p-button-rounded p-button-info mr-2"
                  tooltip="More Info"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
              <Can do="ready" on="Request">
                <Button
                  onClick={() => this.toggle("readyToggler", rowData)}
                  icon="pi pi-bell"
                  className="p-button-rounded p-button-warning"
                  tooltip="Make ready"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
            </React.Fragment>
          );
        case "declined":
          return (
            <React.Fragment>
              <Can do="info" on="Request">
                <Button
                  onClick={() => this.toggle("toggler", rowData)}
                  icon="pi pi-info"
                  className="p-button-rounded p-button-info mr-2"
                  tooltip="More Info"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
              <Can do="delete" on="Request">
                <Button
                  icon="pi pi-ban"
                  className="p-button-rounded p-button-warning"
                  tooltip="Delete Request"
                ></Button>
              </Can>
            </React.Fragment>
          );
        case "ready":
          return (
            <React.Fragment>
              <Can do="info" on="Request">
                <Button
                  onClick={() => this.toggle("toggler", rowData)}
                  icon="pi pi-info"
                  className="p-button-rounded p-button-info mr-2"
                  tooltip="More Info"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
              &nbsp;
              <Can do="end" on="Request">
                <Button
                  onClick={() => this.toggle("pickedToggler", rowData)}
                  icon="pi pi-directions"
                  className="p-button-rounded p-button-success"
                  tooltip="Set Date Picked"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
            </React.Fragment>
          );
        case "picked":
          return (
            <React.Fragment>
              <Can do="info" on="Request">
                <Button
                  onClick={() => this.toggle("toggler", rowData)}
                  icon="pi pi-info"
                  className="p-button-rounded p-button-info mr-2"
                  tooltip="More Info"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
              &nbsp;
              <Can do="end" on="Request">
                <Button
                  onClick={() => this.toggle("returnedToggler", rowData)}
                  icon="pi pi-directions-alt"
                  className="p-button-rounded p-button-success"
                  tooltip="Set Date Returned"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
            </React.Fragment>
          );
        case "returned":
          return (
            <React.Fragment>
              <Can do="info" on="Request">
                <Button
                  onClick={() => this.toggle("toggler", rowData)}
                  icon="pi pi-info"
                  className="p-button-rounded p-button-info mr-2"
                  tooltip="More Info"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
              <Can do="delete" on="Request">
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-warning"
                  tooltip="Delete"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
            </React.Fragment>
          );
        default:
          return (
            <React.Fragment>
              <Can do="info" on="Request">
                <Button
                  onClick={() => this.toggle("toggler", rowData)}
                  icon="pi pi-info"
                  className="p-button-rounded p-button-info mr-2"
                  tooltip="More Info"
                  tooltipOptions={{ position: "bottom" }}
                ></Button>
              </Can>
            </React.Fragment>
          );
      }
    };
    const requestColumns = [
      { field: "item.title", header: "Asset name" },
      { field: "item.code", header: "Asset code" },
      { field: "created_at", header: "Date Requested", body: dateBodyTemplate },
      {
        field: "priority.title",
        header: "Priority",
        body: priorityBodyTemplate,
      },
      { field: "action", header: "Status", body: statusBodyTemplate },
      { header: "Action(s)", body: actionBodyTemplate },
    ];

    const opened = this.props.requests.filter((m) => m.action !== "completed");
    const accepted = this.props.requests.filter((m) => m.action === "accepted");
    const created = this.props.requests.filter((m) => m.action === "created");
    const settledReqs = this.props.requests.filter(
      (m) => m.action === "completed"
    );
    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Request List
        </h2>
        <br></br>

        <div className="p-grid p-justify-between cardFstyle">
          <Can do="view" on="PendingS">
            <div className="p-col-7 p-md-3 p-lg-2">
              <CardDemo
                title="Pending requests"
                icon="pi pi-folder-open"
                content={accepted.length}
                color="#cae6fc"
                iconColor="#2196f3"
                update="1"
              ></CardDemo>
            </div>
          </Can>
          <Can do="view" on="PendingH">
            <div className="p-col-7 p-md-3 p-lg-2">
              <CardDemo
                title="Pending requests"
                icon="pi pi-folder-open"
                content={created.length}
                color="#cae6fc"
                iconColor="#2196f3"
                update="1"
              ></CardDemo>
            </div>
          </Can>
          <div className="p-col-7 p-md-3 p-lg-2">
            <CardDemo
              title="Open requests"
              icon="pi pi-folder-open"
              content={opened.length}
              color="#e7cbec"
              iconColor="#9c27b0"
              update="1"
            ></CardDemo>
          </div>
          <div className="p-col-7 p-md-3 p-lg-2">
            <CardDemo
              title="Settled requests"
              icon="pi pi-folder"
              content={settledReqs.length}
              update="1"
              color="#fde0c2"
              iconColor="#f57c00"
            ></CardDemo>
          </div>
        </div>
        <br></br>

        <div className="datatable-responsive-demo">
          <div>
            <TableUI
              tableHeader="Manage Requests"
              columns={requestColumns}
              fetchFunction={this.props.fetchRequests}
              fetchFunction1={this.props.fetchDepartmentRequests}
              style={{
                width: "76vw",
                marginLeft: "15px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
            />
          </div>

          <Dialog
            draggable={false}
            visible={this.state["toggler"]}
            style={{ width: "45vw" }}
            header="Request Details"
            modal
            className="p-fluid"
            footer={this.infoDialogFooter}
            onHide={this.handleClose}
          >
            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="namefItem" className="block font-normal">
                  Asset name
                </label>
                <InputText value={this.state.reqde.title} disabled />
              </div>
              <div className="field col">
                <label htmlFor="namefItem" className="block font-normal">
                  Asset code
                </label>
                <InputText value={this.state.reqde.code} disabled />
              </div>
              {/* <div className="p-field p-col">
              <label htmlFor="namefItem">Requested By</label>
              <InputText
                  // value={this.state.info.code}
                  disabled
                />
              </div> */}
              <div className="formgrid grid">
                <div className="field col">
                  <label htmlFor="namefItem" className="block font-normal">
                    Date Requested
                  </label>
                  <InputText
                    value={moment(this.state.info.created_at).format(
                      "YYYY/MM/DD"
                    )}
                    disabled
                  />
                </div>
                <div className="field col">
                  <label htmlFor="namefItem" className="block font-normal">
                    Start Date
                  </label>
                  <InputText
                    value={moment(this.state.info.start_date).format(
                      "YYYY/MM/DD"
                    )}
                    disabled
                  />
                </div>
                <div className="field col">
                  <label htmlFor="namefItem" className="block font-normal">
                    End Date
                  </label>
                  <InputText
                    value={moment(this.state.info.end_date).format(
                      "YYYY/MM/DD"
                    )}
                    disabled
                  />
                </div>
              </div>
              <div className="formgrid grid">
                <div className="field col">
                  <label htmlFor="namefItem" className="block font-normal">
                    Priority
                  </label>
                  <InputText value={this.state.reqpr.title} disabled />
                </div>
                <div className="field col">
                  <label htmlFor="namefItem" className="block font-normal">
                    Pickup Date
                  </label>
                  <InputText
                    value={moment(this.state.info.pickup_date).format(
                      "YYYY/MM/DD"
                    )}
                    disabled
                  />
                </div>
                <div className="field col">
                  <label htmlFor="namefItem" className="block font-normal">
                    Return Date
                  </label>
                  <InputText
                    value={moment(this.state.info.return_date).format(
                      "YYYY/MM/DD"
                    )}
                    disabled
                  />
                </div>
              </div>
            </div>
          </Dialog>

          <Dialog
            draggable={false}
            visible={this.state["toggler1"]}
            style={{ width: "30vw" }}
            header="Accept Request"
            modal
            className="p-fluid"
            footer={this.acceptDialogFooter}
            onHide={this.handleClose}
          >
            <div className="confirmation-content">
              <i className="pi pi-check mr-2" style={{ fontSize: "2rem" }} />
              {this.state.info.item && (
                <span>
                  Accept Request For <b>{this.state.info.item.title}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            draggable={false}
            visible={this.state["toggler2"]}
            style={{ width: "30vw" }}
            header="Decline Request"
            modal
            className="p-fluid"
            footer={this.declineDialogFooter}
            onHide={this.handleClose}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-2"
                style={{ fontSize: "1rem" }}
              />
              {this.state.info.item && (
                <span>
                  Decline Request For <b>{this.state.info.item.title}</b>
                </span>
              )}
            </div>
            <br></br>
            <div className="p-formgrid p-grid">
              <div className="p-field p-col">
                <label htmlFor="pickup_date" className="block font-normal">
                  Justification
                </label>
                <InputTextarea
                  id="justification"
                  name="justification"
                  onChange={(event) =>
                    this.handleChange(event, "justification")
                  }
                  value={this.state.justification}
                />
              </div>
            </div>
          </Dialog>

          <Dialog
            draggable={false}
            visible={this.state["readyToggler"]}
            style={{ width: "40vw" }}
            header="Ready Request"
            modal
            className="p-fluid"
            footer={this.readyDialogFooter}
            onHide={this.handleClose}
          >
            <div className="formgrid grid">
              <div className="field col-12">
                <label htmlFor="pickup_date" className="block font-normal">
                  Pickup Deadline
                </label>
                <Calendar
                  id="pickup_deadline"
                  //  dateFormat="dd/mm/yy"
                  minDate={new Date(this.state.tdate)}
                  maxDate={new Date(this.state.mdate)}
                  onChange={(event) =>
                    this.handleChange(event, "pickup_deadline")
                  }
                  value={this.state.pickup_deadline}
                  name="pickup_deadline"
                  placeholder="Pickup Date"
                  monthNavigator
                  showIcon
                  yearNavigator
                  monthNavigatorTemplate={this.monthNavigatorTemplate}
                  yearNavigatorTemplate={this.yearNavigatorTemplate}
                  yearRange="2010:2050"
                />
              </div>
              <div className="field col-12">
                <label htmlFor="return_deadline" className="block font-normal">
                  Return Deadline
                </label>
                <Calendar
                  id="return_deadline"
                  dateFormat="dd/mm/yy"
                  minDate={new Date(this.state.pickup_deadline)}
                  maxDate={new Date(this.state.mdate)}
                  value={this.state.return_deadline}
                  onChange={(event) =>
                    this.handleChange(event, "return_deadline")
                  }
                  name="return_deadline"
                  placeholder="Return Date"
                  showIcon
                  monthNavigator
                  yearNavigator
                  monthNavigatorTemplate={this.monthNavigatorTemplate}
                  yearNavigatorTemplate={this.yearNavigatorTemplate}
                  yearRange="2010:2050"
                />
              </div>
            </div>
          </Dialog>

          <Dialog
            draggable={false}
            visible={this.state["pickedToggler"]}
            style={{ width: "35vw" }}
            header="Set Date Item was Picked"
            modal
            className="p-fluid"
            footer={this.pickedDialogFooter}
            onHide={this.handleClose}
          >
            <div className="confirmation-content">
              <div className="field col-12">
                <label htmlFor="pickup_date" className="block font-normal">
                  Date Picked
                </label>
                <Calendar
                  id="pickup_date"
                  dateFormat="dd/mm/yy"
                  minDate={new Date(this.state.tdate)}
                  value={this.state.pickup_date}
                  maxDate={new Date(this.state.mdate)}
                  onChange={(event) => this.handleChange(event, "pickup_date")}
                  name="pickup_date"
                  placeholder="Date Picked"
                  showIcon
                  monthNavigator
                  yearNavigator
                  monthNavigatorTemplate={this.monthNavigatorTemplate}
                  yearNavigatorTemplate={this.yearNavigatorTemplate}
                  yearRange="2010:2050"
                />
              </div>
            </div>
          </Dialog>

          <Dialog
            draggable={false}
            visible={this.state["returnedToggler"]}
            style={{ width: "35vw" }}
            header="Set Date Item was Returned"
            modal
            className="p-fluid"
            footer={this.returnedDialogFooter}
            onHide={this.handleClose}
          >
            <div className="confirmation-content">
              <div className="field col-12">
                <label htmlFor="return_date" className="block font-normal">
                  Date Returned
                </label>
                <Calendar
                  id="return_date"
                  dateFormat="dd/mm/yy"
                  minDate={new Date(this.state.pdate)}
                  value={this.state.return_date}
                  maxDate={new Date(this.state.mdate)}
                  onChange={(event) => this.handleChange(event, "return_date")}
                  name="return_date"
                  placeholder="Date Returned"
                  monthNavigator
                  showIcon
                  yearNavigator
                  monthNavigatorTemplate={this.monthNavigatorTemplate}
                  yearNavigatorTemplate={this.yearNavigatorTemplate}
                  yearRange="2010:2050"
                />
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

RequestList.propTypes = {
  fetchRequests: PropTypes.func.isRequired,
  editRequest: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired,
  fetchDepartmentRequests: PropTypes.func.isRequired,
  departmentrequests: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  requests: state.requests.requests,
  user: state.auth.user,
  pagesize: state.requests.pagesize,
  departmentrequests: state.requests.departmentrequests,
});
export default connect(mapStateToProps, {
  fetchDepartmentRequests,
  fetchRequests,
  editRequest,
})(RequestList);
