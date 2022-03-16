import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import React from "react";
import { connect } from "react-redux";
import { generateReport } from "../../../../shared/redux/actions/dashboardActions";
import { Dialog } from "primereact/dialog";
import ResultsTable from "./results";
import ReactToPrint from "react-to-print";

class ReportGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAMonth: "",
      selectedIMonth: "",
      selectedPMonth: "",
      selectedRMonth: "",
      selectedFMonth: "",
      selectedAYear: "",
      selectedPYear: "",
      selectedRYear: "",
      selectedIYear: "",

      selectedFYear: "",
      selectedAField: "",
      selectedFField: "",
      selectedRField: "",
      selectedIField: "",

      selectedPField: "",
      selectedAOperation: "",
      selectedFOperation: "",
      selectedIOperation: "",
      selectedPOperation: "",
      selectedROperation: "",

      toggler1: false,
      toggler2: false,
      toggler3: false,
      toggler4: false,
      toggler5: false,
      recData: this.props.report,
    };
    this.generateReport = this.generateReport.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(toggler) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
    });
  }

  handleClose() {
    this.setState({ toggler1: false });
    this.setState({ toggler2: false });
    this.setState({ toggler3: false });
    this.setState({ toggler4: false });
    this.setState({ toggler5: false });
  }

  DialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        label="Export"
        icon="pi pi-download"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
    </React.Fragment>
  );
  async generateReport(btnName) {
    var postData;
    if (btnName === "asset") {
      postData = [
        {
          resource: btnName,
          // group_by: [],
          date_filters: {
            years: this.state.selectedAYear,
            months: this.state.selectedAMonth,
            field: "created_at",
          },
          // years_available_fields: [],
          // filters: {
          //   and_: {},
          //   or_: {},
          //   kw: {},
          // },
          aggr: [
            {
              field: this.state.selectedAField,
              op: this.state.selectedAOperation,
            },
          ],
        },
      ];
      await this.props.generateReport(postData);
      return this.handleOpen("toggler1");
    } else if (btnName === "inventory") {
      postData = [
        {
          resource: btnName,
          // group_by: [],
          date_filters: {
            years: this.state.selectedIYear,
            months: this.state.selectedIMonth,
            field: "created_at",
          },
          // years_available_fields: [],
          // filters: {
          //   and_: {},
          //   or_: {},
          //   kw: {},
          // },
          aggr: [
            {
              field: this.state.selectedIField,
              op: this.state.selectedIOperation,
            },
          ],
        },
      ];
      await this.props.generateReport(postData);
      return this.handleOpen("toggler2");
    } else if (btnName === "request") {
      postData = [
        {
          resource: btnName,
          // group_by: [],
          date_filters: {
            years: this.state.selectedRYear,
            months: this.state.selectedRMonth,
            field: "created_at",
          },
          // years_available_fields: [],
          filters: {
            //  and_: {},
            //  or_: {},
            kw: { action: this.state.selectedRField },
          },
          aggr: [
            {
              field: "id",
              op: this.state.selectedROperation,
            },
          ],
        },
      ];
      await this.props.generateReport(postData);
      return this.handleOpen("toggler3");
    } else if (btnName === "proposal") {
      postData = [
        {
          resource: btnName,
          // group_by: [],
          date_filters: {
            years: this.state.selectedPYear,
            months: this.state.selectedPMonth,
            field: "created_at",
          },
          // years_available_fields: [],
          filters: {
            //  and_: {},
            //  or_: {},
            kw: { status: this.state.selectedPField },
          },
          aggr: [
            {
              field: "id",
              op: this.state.selectedPOperation,
            },
          ],
        },
      ];
      await this.props.generateReport(postData);
      return this.handleOpen("toggler4");
    } else if (btnName === "financial") {
      postData = [
        {
          resource: btnName,
          // group_by: [],
          date_filters: {
            years: this.state.selectedFYear,
            months: this.state.selectedFMonth,
            field: "created_at",
          },
          // years_available_fields: [],
          // filters: {
          //   and_: {},
          //   or_: {},
          //   kw: {},
          // },
          aggr: [
            {
              field: this.state.selectedFField,
              op: this.state.selectedFOperation,
            },
          ],
        },
      ];
      await this.props.generateReport(postData);
      return this.handleOpen("toggler5");
    }

    // console.log(postData);
  }

  render() {
    // const recData = this.props.report;

    const years = [
      { name: "2019", value: "2019" },
      { name: "2020", value: "2020" },
      { name: "2021", value: "2021" },
    ];

    const months = [
      { name: "January", value: 1 },
      { name: "February", value: 2 },
      { name: "March", value: 3 },
      { name: "April", value: 4 },
      { name: "May", value: 5 },
      { name: "June", value: 6 },
      { name: "July", value: 7 },
      { name: "August", value: 8 },
      { name: "September", value: 9 },
      { name: "October", value: 10 },
      { name: "November", value: 11 },
      { name: "December", value: 12 },
    ];

    const assetfields = [
      { name: "Price", value: "amount" },
      { name: "Salvage Amount", value: "salvage_amount" },
      { name: "Lifespan", value: "lifespan" },
    ];

    const invfields = [
      { name: "Price", value: "amount" },
      { name: "Salvage Amount", value: "salvage_amount" },
      { name: "Lifespan", value: "lifespan" },
    ];

    const propfields = [{ name: "Status", value: "status" }];

    const reqfields = [
      { name: "Price", value: "amount" },
      { name: "Salvage Amount", value: "salvage_amount" },
      { name: "Lifespan", value: "lifespan" },
    ];
    const finanfields = [
      { name: "Price", value: "amount" },
      { name: "Salvage Amount", value: "salvage_amount" },
      { name: "Lifespan", value: "lifespan" },
    ];

    const operations = [
      { name: "Sum", value: "sum" },
      { name: "Average", value: "avg" },
      { name: "Count", value: "count" },
      { name: "Minimum", value: "min" },
      { name: "Maximum", value: "max" },
    ];

    const propOperations = [{ name: "Count", value: "count" }];

    const propso = [
      { name: "Active", value: "active" },
      { name: "Accepted", value: "accepted" },
      { name: "Declined", value: "declined" },
      { name: "Delivered", value: "delivered" },
    ];
    const reqso = [
      { name: "Created", value: "created" },
      { name: "Accepted", value: "accepted" },
      { name: "Declined", value: "declined" },
      { name: "Ready", value: "ready" },
      { name: "Picked", value: "picked" },
      { name: "Returned", value: "returned" },
      { name: "Completed", value: "completed" },
    ];
    return (
      <div>
        <div className="font-medium text-2xl text-700 w-full">
          Generate Reports
        </div>
        <div
          className="surface-0 w-full mt-2"
          style={{
            backgroundColor: "whitesmoke",
            borderRadius: "20px",

            padding: "10px",
          }}
        >
          <div className="text-500 mb-5">Generate Reports For Resources</div>

          <ul className="list-none p-0 m-0">
            <li className="flex w-full align-items-center py-3 px-2 border-top-1 border-300  justify-content-between flex-wrap">
              <div className="text-500  font-medium flex">Asset</div>

              <MultiSelect
                value={this.state.selectedAYear}
                filter
                options={years}
                onChange={async (e) => {
                  await this.setState({ selectedAYear: e.value });
                  return console.log("change");
                }}
                optionLabel="name"
                placeholder="Year"
                display="chip"
                className="flex ml-2 mr-1"
              />

              <MultiSelect
                display="chip"
                value={this.state.selectedAMonth}
                options={months}
                onChange={async (e) => {
                  await this.setState({ selectedAMonth: e.value });
                  return console.log(this.state.selectedAMonth);
                }}
                optionLabel="name"
                placeholder="Month"
                filter
                className="flex mr-1 flex-wrap"
              />

              <Dropdown
                value={this.state.selectedAField}
                onChange={async (e) => {
                  await this.setState({ selectedAField: e.value });
                  return console.log("chabg");
                }}
                display="chip"
                options={assetfields}
                optionLabel="name"
                placeholder="Field"
                filter
                className="flex mr-1"
              />

              <Dropdown
                value={this.state.selectedAOperation}
                onChange={async (e) => {
                  await this.setState({ selectedAOperation: e.value });
                  return console.log("chabg");
                }}
                display="chip"
                options={operations}
                optionLabel="name"
                placeholder="Operation"
                filter
                className="flex "
              />

              <Button
                label="Generate"
                icon="pi pi-cog"
                className="p-button-text flex"
                onClick={() => this.generateReport("asset")}
              />
            </li>

            <li className="flex w-full align-items-center py-3 px-2 border-top-1 border-300  justify-content-between flex-wrap">
              <div className="text-500  font-medium flex">Inventory</div>
              <MultiSelect
                value={this.state.selectedIYear}
                filter
                options={years}
                onChange={async (e) => {
                  await this.setState({ selectedIYear: e.value });
                  return console.log("change");
                }}
                optionLabel="name"
                placeholder="Year"
                display="chip"
                className="flex ml-2 mr-1"
              />

              <MultiSelect
                display="chip"
                value={this.state.selectedIMonth}
                options={months}
                onChange={async (e) => {
                  await this.setState({ selectedIMonth: e.value });
                  return console.log(this.state.selectedIMonth);
                }}
                optionLabel="name"
                placeholder="Month"
                filter
                className="flex mr-1"
              />

              <Dropdown
                value={this.state.selectedIField}
                onChange={async (e) => {
                  await this.setState({ selectedIField: e.value });
                  return console.log("chabg");
                }}
                display="chip"
                options={propfields}
                optionLabel="name"
                placeholder="Field"
                filter
                className="flex mr-1 "
              />
              <Dropdown
                value={this.state.selectedIOperation}
                onChange={async (e) => {
                  await this.setState({ selectedIOperation: e.value });
                  return console.log("chabg");
                }}
                display="chip"
                options={propOperations}
                optionLabel="name"
                placeholder="Operation"
                filter
                className="flex "
              />
              <div className="text-900  flex ">
                <Button
                  label="Generate"
                  icon="pi pi-cog"
                  className="p-button-text"
                  onClick={() => this.generateReport("inventory")}
                />
              </div>
            </li>

            <li className="flex w-full align-items-center py-3 px-2 border-top-1 border-300  justify-content-between flex-wrap">
              <div className="text-500  font-medium flex">Request</div>
              <MultiSelect
                value={this.state.selectedRYear}
                filter
                options={years}
                onChange={async (e) => {
                  await this.setState({ selectedRYear: e.value });
                  return console.log("change");
                }}
                optionLabel="name"
                placeholder="Year"
                display="chip"
                className="flex ml-2"
              />

              <MultiSelect
                display="chip"
                value={this.state.selectedRMonth}
                options={months}
                onChange={async (e) => {
                  await this.setState({ selectedRMonth: e.value });
                  return console.log(this.state.selectedRMonth);
                }}
                optionLabel="name"
                placeholder="Month"
                filter
                className="flex"
              />

              <Dropdown
                value={this.state.selectedRField}
                onChange={async (e) => {
                  await this.setState({ selectedRField: e.value });
                  return console.log("chabg");
                }}
                display="chip"
                options={reqso}
                optionLabel="name"
                placeholder="Field"
                filter
                className="flex"
              />

              <Dropdown
                value={this.state.selectedROperation}
                onChange={async (e) => {
                  await this.setState({ selectedROperation: e.value });
                  return console.log("chabg");
                }}
                display="chip"
                options={propOperations}
                optionLabel="name"
                placeholder="Operation"
                filter
                className="flex "
              />
              <div className="text-900  flex ">
                <Button
                  label="Generate"
                  icon="pi pi-cog"
                  className="p-button-text"
                  onClick={() => this.generateReport("request")}
                />
              </div>
            </li>

            <li className="flex w-full align-items-center py-3 px-2 border-top-1 border-300  justify-content-between flex-wrap">
              <div className="text-500  font-medium flex">Proposal</div>
              <MultiSelect
                value={this.state.selectedPYear}
                filter
                options={years}
                onChange={async (e) => {
                  await this.setState({ selectedPYear: e.value });
                  return console.log("change");
                }}
                optionLabel="name"
                placeholder="Year"
                display="chip"
                className="flex ml-2"
              />

              <MultiSelect
                display="chip"
                value={this.state.selectedPMonth}
                options={months}
                onChange={async (e) => {
                  await this.setState({ selectedPMonth: e.value });
                  return console.log(this.state.selectedPMonth);
                }}
                optionLabel="name"
                placeholder="Month"
                filter
                className="flex"
              />

              <Dropdown
                value={this.state.selectedPField}
                onChange={async (e) => {
                  await this.setState({ selectedPField: e.value });
                  return console.log("chabg");
                }}
                options={propso}
                optionLabel="name"
                placeholder="Field"
                filter
                className="flex"
              />
              <Dropdown
                value={this.state.selectedPOperation}
                onChange={async (e) => {
                  await this.setState({ selectedPOperation: e.value });
                  return console.log("chabg");
                }}
                options={propOperations}
                optionLabel="name"
                placeholder="Operation"
                filter
                className="flex "
              />
              <div className="text-900  flex ">
                <Button
                  label="Generate"
                  icon="pi pi-cog"
                  className="p-button-text"
                  onClick={() => this.generateReport("proposal")}
                />
              </div>
            </li>
            {/* 
            <li className="flex w-full align-items-center py-3 px-2 border-top-1 border-300  justify-content-between flex-wrap">
              <div className="text-500  font-medium flex">Financial</div>
              <MultiSelect
                value={this.state.selectedFYear}
                filter
                options={years}
                onChange={async e => {
                  await this.setState({ selectedFYear: e.value });
                  return console.log('change');
                }}
                optionLabel="name"
                placeholder="Year"
                display="chip"
                className="flex ml-2"
              />

              <MultiSelect
                display="chip"
                value={this.state.selectedFMonth}
                options={months}
                onChange={async e => {
                  await this.setState({ selectedFMonth: e.value });
                  return console.log(this.state.selectedFMonth);
                }}
                optionLabel="name"
                placeholder="Month"
                filter
                className="flex"
              />

              <Dropdown
                value={this.state.selectedFField}
                onChange={async e => {
                  await this.setState({ selectedFField: e.value });
                  return console.log('chabg');
                }}
                display="chip"
                options={assetfields}
                optionLabel="name"
                placeholder="Field"
                filter
                className="flex"
              />
              <Dropdown
                value={this.state.selectedFOperation}
                onChange={async e => {
                  await this.setState({ selectedFOperation: e.value });
                  return console.log('chabg');
                }}
                display="chip"
                options={operations}
                optionLabel="name"
                placeholder="Operation"
                filter
                className="flex "
              />
              <div className="text-900  flex ">
                <Button
                  label="Generate"
                  icon="pi pi-cog"
                  className="p-button-text"
                  onClick={() => this.generateReport('asset')}
                />
           
              </div>
            </li> */}
          </ul>
        </div>

        <Dialog
          draggable={false}
          visible={this.state["toggler1"]}
          style={{ width: "40vw" }}
          header="Generated Asset Report"
          modal
          className="p-fluid"
          footer={this.DialogFooter}
          onHide={this.handleClose}
        >
          <div>
            {/* <ReactToPrint
              content={() => this.componentRef}
              trigger={() => (
                <button className="btn btn-primary">Print to PDF!</button>
              )}
            /> */}
            <ResultsTable
              data="asset"
              ref={(response) => (this.componentRef = response)}
            />
          </div>
        </Dialog>
        <Dialog
          draggable={false}
          visible={this.state["toggler2"]}
          style={{ width: "40vw" }}
          header="Generated Inventory Report"
          modal
          className="p-fluid"
          footer={this.DialogFooter}
          onHide={this.handleClose}
        >
          <div>
            <ResultsTable data="inventory" />
          </div>
        </Dialog>
        <Dialog
          draggable={false}
          visible={this.state["toggler3"]}
          style={{ width: "40vw" }}
          header="Generated Request Report"
          modal
          className="p-fluid"
          footer={this.DialogFooter}
          onHide={this.handleClose}
        >
          <div>
            <ResultsTable data="request" />
          </div>
        </Dialog>
        <Dialog
          draggable={false}
          visible={this.state["toggler4"]}
          style={{ width: "40vw" }}
          header="Generated Proposal Report"
          modal
          className="p-fluid"
          footer={this.DialogFooter}
          onHide={this.handleClose}
        >
          <div>
            <ResultsTable data="proposal" />
          </div>
        </Dialog>
        <Dialog
          draggable={false}
          visible={this.state["toggler5"]}
          style={{ width: "40vw" }}
          header="Generated Financial Report"
          modal
          className="p-fluid"
          footer={this.DialogFooter}
          onHide={this.handleClose}
        >
          <div>
            <ResultsTable data="financial" />
          </div>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  report: state.dashboard.report,
});
export default connect(mapStateToProps, { generateReport })(ReportGenerator);
