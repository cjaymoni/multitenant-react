import React, { Component } from "react";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchRecommendations } from "../../../../shared/redux/actions/recommendationActions";
import {
  fetchAssets,
  fetchAvailableAssets,
  decommissionAsset,
} from "../../../../shared/redux/actions/assetActions";
import { fetchInventories } from "../../../../shared/redux/actions/inventoryActions";
import { fetchDashData } from "../../../../shared/redux/actions/dashboardActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchDashData();
  }

  render() {
    const years = [{ name: "2018" }, { name: "2019" }, { name: "2020" }];

    const months = [{ name: "June" }, { name: "July" }, { name: "Aug" }];

    const fields = [
      { name: "Code" },
      { name: "Title" },
      { name: "Serial number" },
    ];

    const basicData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "New Assets",
          backgroundColor: "#5C9A9A",
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: "New Requests",
          backgroundColor: "#B8B85A",
          data: [28, 48, 40, 19, 86, 27, 90],
        },
        {
          label: "New Proposals",
          backgroundColor: "#EAB06C",
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    const basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    const assets = this.props.dashitems.asset || [];
    const inventories = this.props.dashitems.inventory || [];
    const requests = this.props.dashitems.request || [];
    const proposals = this.props.dashitems.proposal || [];

    return (
      <div>
        <div
          className="font-medium text-1xl text-700"
          style={{ margin: "10px" }}
        >
          <ul className="list-none p-0 m-0 flex align-items-center font-medium mb-3">
            <li>
              <a className="text-500 no-underline line-height-3 cursor-pointer">
                Dashboard
              </a>
            </li>
            <li className="px-2">
              <i className="pi pi-angle-right text-500 line-height-3"></i>
            </li>
            <li>
              <span className="text-700 line-height-3">Analytics</span>
            </li>
          </ul>
        </div>

        <div
          className="grid"
          style={{
            backgroundColor: "whitesmoke",
            width: "80vw",
            margin: "8px",
            borderRadius: "20px",
          }}
        >
          <div className="col">
            <div
              className="grid"
              style={{
                backgroundColor: "#ADEBD6",
                width: "17vw",
                margin: "5px",
                borderRadius: "20px",
              }}
            >
              <div
                className=""
                style={{
                  backgroundColor: "rgb(255 255 255)",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "20px",
                }}
              >
                <div className="flex align-items-start flex-column  lg:justify-content-between lg:flex-column">
                  <div className="flex flex-column flex-none">
                    <div className="font-medium text-2xl  text-700">Assets</div>
                    <div className="flex align-items-center text-700 flex-wrap">
                      <div className="mr-5 flex align-items-center mt-3 ">
                        <i
                          className="pi pi-users mr-2"
                          style={{ color: "red" }}
                        ></i>
                        <span>{assets["total"]} Total</span>
                      </div>
                      <br></br>
                      <div className="mr-5 flex align-items-center mt-3">
                        <i
                          className="pi pi-globe mr-2"
                          style={{ color: "blue" }}
                        ></i>
                        <span>{assets["assigned"]} Assigned </span>
                      </div>
                      <br></br>

                      <div className="flex align-items-center mt-3">
                        <i
                          className="pi pi-clock mr-2"
                          style={{ color: "green" }}
                        ></i>
                        <span>{assets["decomissioned"]} Decomissioned </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="grid"
              style={{
                backgroundColor: "#e2e2f5",
                width: "17vw",
                margin: "5px",
                borderRadius: "20px",
              }}
            >
              <div
                className=""
                style={{
                  backgroundColor: "rgb(255 255 255)",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "20px",
                }}
              >
                <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
                  <div>
                    <div className="font-medium text-2xl text-700">
                      Inventory
                    </div>
                    <div className="flex align-items-center text-700 flex-wrap">
                      <div className="mr-5 flex align-items-center mt-3">
                        <i
                          className="pi pi-users mr-2"
                          style={{ color: "red" }}
                        ></i>
                        <span>{inventories["total"]} Total </span>
                      </div>
                      <div className="mr-5 flex align-items-center mt-3">
                        <i
                          className="pi pi-globe mr-2"
                          style={{ color: "blue" }}
                        ></i>
                        <span>{inventories["active"]} Active </span>
                      </div>
                      <div className="flex align-items-center mt-3">
                        <i
                          className="pi pi-clock mr-2"
                          style={{ color: "green" }}
                        ></i>
                        <span>{inventories["inactive"]} Inactive </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="grid"
              style={{
                backgroundColor: "#AFE2EB",
                width: "17vw",
                margin: "5px",
                borderRadius: "20px",
              }}
            >
              <div
                className=""
                style={{
                  backgroundColor: "rgb(255 255 255)",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "20px",
                }}
              >
                <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
                  <div>
                    <div className="font-medium text-2xl text-700">
                      Requests
                    </div>
                    <div className="flex align-items-center text-700 flex-wrap">
                      <div className="mr-5 flex align-items-center mt-3">
                        <i
                          className="pi pi-users mr-2"
                          style={{ color: "red" }}
                        ></i>
                        <span>{requests["total"]} Total</span>
                      </div>
                      <div className="mr-5 flex align-items-center mt-3">
                        <i
                          className="pi pi-globe mr-2"
                          style={{ color: "blue" }}
                        ></i>
                        <span>{requests["pending"]} Pending </span>
                      </div>
                      <div className="flex align-items-center mt-3">
                        <i
                          className="pi pi-clock mr-2"
                          style={{ color: "green" }}
                        ></i>
                        <span>{requests["approved"]} Approved </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="grid"
              style={{
                backgroundColor: "#FFEAD7",
                width: "17vw",
                margin: "5px",
                borderRadius: "20px",
              }}
            >
              <div
                className=""
                style={{
                  backgroundColor: "rgb(255 255 255)",
                  padding: "10px",
                  margin: "10px",
                  borderRadius: "20px",
                }}
              >
                <div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
                  <div>
                    <div className="font-medium text-2xl text-700">
                      Proposal
                    </div>
                    <div className="flex align-items-center text-700 flex-wrap">
                      <div className="mr-5 flex align-items-center mt-3">
                        <i
                          className="pi pi-users mr-2"
                          style={{ color: "red" }}
                        ></i>
                        <span>{proposals["total"]} Total </span>
                      </div>
                      <div className="mr-5 flex align-items-center mt-3">
                        <i
                          className="pi pi-globe mr-2"
                          style={{ color: "blue" }}
                        ></i>
                        <span>{proposals["pending"]} Pending </span>
                      </div>
                      <div className="flex align-items-center mt-3">
                        <i
                          className="pi pi-clock mr-2"
                          style={{ color: "green" }}
                        ></i>
                        <span>{proposals["approved"]} Approved </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="grid"
          style={{
            width: "80vw",
            margin: "45px 0px 15px 15px",
            borderRadius: "20px",
          }}
        >
          <div
            className="col"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="font-medium text-2xl text-700">
              Asset Statistics
            </div>
            <Chart
              type="bar"
              data={basicData}
              options={basicOptions}
              style={{
                height: "400px",
                backgroundColor: "white",
                margin: "10px",
                height: "400px",
              }}
            />
          </div>
          &nbsp;&nbsp;&nbsp;
          <div
            className="col"
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <div className="font-medium text-2xl text-700">
              Generate Reports
            </div>
            <div
              className="surface-0"
              style={{
                backgroundColor: "whitesmoke",
                borderRadius: "20px",
                margin: "10px",
                padding: "10px",
              }}
            >
              <div className="text-500 mb-5">
                Morbi tristique blandit turpis. In viverra ligula id nulla
                hendrerit rutrum.
              </div>
              <ul className="list-none p-0 m-0">
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">Asset</div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <MultiSelect
                      display="chip"
                      options={years}
                      optionLabel="name"
                      placeholder="Year"
                      filter
                      className="multiselect-custom "
                    />{" "}
                    &nbsp;&nbsp;
                    <MultiSelect
                      display="chip"
                      options={months}
                      optionLabel="name"
                      placeholder="Month"
                      filter
                      className="multiselect-custom "
                    />
                    &nbsp;&nbsp;
                    <MultiSelect
                      display="chip"
                      options={fields}
                      optionLabel="name"
                      placeholder="Fields"
                      filter
                      className="multiselect-custom"
                    />
                    &nbsp;&nbsp;
                  </div>
                  <div className="w-6 md:w-2 flex justify-content-end">
                    <Button
                      label="Export"
                      icon="pi pi-download"
                      className="p-button-text"
                    />
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Inventory
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <MultiSelect
                      display="chip"
                      options={years}
                      optionLabel="name"
                      placeholder="Year"
                      filter
                      className="multiselect-custom "
                    />{" "}
                    &nbsp;&nbsp;
                    <MultiSelect
                      display="chip"
                      options={months}
                      optionLabel="name"
                      placeholder="Month"
                      filter
                      className="multiselect-custom "
                    />
                    &nbsp;&nbsp;
                    <MultiSelect
                      display="chip"
                      options={fields}
                      optionLabel="name"
                      placeholder="Fields"
                      filter
                      className="multiselect-custom"
                    />
                    &nbsp;&nbsp;
                  </div>
                  <div className="w-6 md:w-2 flex justify-content-end">
                    <Button
                      label="Export"
                      icon="pi pi-download"
                      className="p-button-text"
                    />
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Requests
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <MultiSelect
                      display="chip"
                      options={years}
                      optionLabel="name"
                      placeholder="Year"
                      filter
                      className="multiselect-custom "
                    />{" "}
                    &nbsp;&nbsp;
                    <MultiSelect
                      display="chip"
                      options={months}
                      optionLabel="name"
                      placeholder="Month"
                      filter
                      className="multiselect-custom "
                    />
                    &nbsp;&nbsp;
                    <MultiSelect
                      display="chip"
                      options={fields}
                      optionLabel="name"
                      placeholder="Fields"
                      filter
                      className="multiselect-custom"
                    />
                    &nbsp;&nbsp;
                  </div>
                  <div className="w-6 md:w-2 flex justify-content-end">
                    <Button
                      label="Export"
                      icon="pi pi-download"
                      className="p-button-text"
                    />
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Proposal
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <MultiSelect
                      display="chip"
                      options={years}
                      optionLabel="name"
                      placeholder="Year"
                      filter
                      className="multiselect-custom "
                    />{" "}
                    &nbsp;&nbsp;
                    <MultiSelect
                      display="chip"
                      options={months}
                      optionLabel="name"
                      placeholder="Month"
                      filter
                      className="multiselect-custom "
                    />
                    &nbsp;&nbsp;
                    <MultiSelect
                      display="chip"
                      options={fields}
                      optionLabel="name"
                      placeholder="Fields"
                      filter
                      className="multiselect-custom"
                    />
                    &nbsp;&nbsp;{" "}
                  </div>
                  <div className="w-6 md:w-2 flex justify-content-end">
                    <Button
                      label="Export"
                      icon="pi pi-download"
                      className="p-button-text"
                    />
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Financial
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <MultiSelect
                      display="chip"
                      options={years}
                      optionLabel="name"
                      placeholder="Year"
                      filter
                      className="multiselect-custom "
                    />{" "}
                    &nbsp;&nbsp;
                    <MultiSelect
                      display="chip"
                      options={months}
                      optionLabel="name"
                      placeholder="Month"
                      filter
                      className="multiselect-custom "
                    />
                    &nbsp;&nbsp;
                    <MultiSelect
                      display="chip"
                      options={fields}
                      optionLabel="name"
                      placeholder="Fields"
                      filter
                      className="multiselect-custom"
                    />
                    &nbsp;&nbsp;
                  </div>
                  <div className="w-6 md:w-2 flex justify-content-end">
                    <Button
                      label="Export"
                      icon="pi pi-download"
                      className="p-button-text"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// <div>
//   <h2
//     className="p-mb-3 p-text-bold"
//     style={{ marginLeft: "20px", color: "#495057" }}
//   >
//     Overview
//   </h2>

//   <div className="p-grid p-justify-between" style={{ marginLeft: "10px" }}>
//     <div className="p-col-12 p-md-6 p-lg-3">
//       <Link to={"/asset"} style={{ textDecoration: "none" }}>
//         <CardDemo
//           title="Total assets"
//           icon="pi pi-shopping-cart"
//           // content={items.length}
//         ></CardDemo>
//       </Link>
//     </div>

//     <div className="p-col-12 p-md-6 p-lg-3">
//       <Link to={"/request"} style={{ textDecoration: "none" }}>
//         <CardDemo
//           title="Total requests"
//           icon="pi pi-folder-open"
//           content="24"
//         ></CardDemo>
//       </Link>
//     </div>

//     <div className="p-col-12 p-md-6 p-lg-3">
//       <Link to={"/inventory"} style={{ textDecoration: "none" }}>
//         <CardDemo
//           title="Total inventory"
//           icon="pi pi-bookmark"
//           content="5"
//         ></CardDemo>
//       </Link>
//     </div>
//   </div>

//   <div className="p-d-flex">
//     <div className="datatable-templating-demo">
//       <div >
//         <DataTable
//           className={classNames("p-shadow-3", "p-datatable-gridlines")}
//           // value={items}
//           header={mainHeader}
//           style={{
//             width: "50vw",
//             marginLeft: "25px",
//             marginBottom: "0px",
//             marginTop: "0px",
//           }}
//         >
//           {/* <Column field="code" header="Asset Code"></Column> */}
//           <Column field="name" header="Item"></Column>
//           <Column header="Availability" body={statusBodyTemplate}></Column>
//           <Column
//             field="price"
//             header="Price"
//             body={priceBodyTemplate}
//           ></Column>
//         </DataTable>
//       </div>
//     </div>
//     <div className="datascroller-demo">
//       <div className="card" style={{ marginLeft: "18px", width: "22vw" }}>
//         <DataScroller
//           // value={items}
//           itemTemplate={itemTemplate}
//           rows={5}
//           header="Quick details"
//           inline
//           scrollHeight="50vh"
//           className="p-shadow-3"
//         />
//       </div>
//     </div>
//   </div>
// </div>

Dashboard.propTypes = {
  fetchAssets: PropTypes.func.isRequired,
  fetchAvailableAssets: PropTypes.func.isRequired,
  fetchInventories: PropTypes.func.isRequired,
  inventories: PropTypes.array.isRequired,
  fetchRequests: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired,
  fetchRecommendations: PropTypes.func.isRequired,
  recommendations: PropTypes.array.isRequired,
  decommissionAsset: PropTypes.func.isRequired,
  fetchDashData: PropTypes.func.isRequired,
  dashitems: PropTypes.array.isRequired,
  pagesize: PropTypes.any.isRequired,
};
const mapStateToProps = (state) => ({
  assets: state.assets.items,
  inventories: state.inventories.inventories,
  requests: state.requests.requests,
  recommendations: state.recommendations.recommendations,
  pagesize: state.assets.pagesize,
  booksize: state.assets.booksize,
  dashitems: state.dashboard.dashitems,
});

export default connect(mapStateToProps, {
  fetchInventories,
  fetchRecommendations,
  fetchAssets,
  fetchAvailableAssets,
  decommissionAsset,
  fetchDashData,
})(Dashboard);
