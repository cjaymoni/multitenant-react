import React, { Component } from "react";
import { Chart } from "primereact/chart";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchDashData } from "../../../../shared/redux/actions/dashboardActions";
import ReportGenerator from "./reports";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchDashData();
  }

  render() {
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
          <div
            className="col"
            style={{
              backgroundColor: "#ADEBD6",
              // width: '17vw',
              margin: "5px",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                borderRadius: "20px",
              }}
              className="flex w-full align-items-start flex-column p-2 bg-white"
            >
              <div className="w-full font-medium text-2xl  text-700">
                Assets
              </div>
              <div className="w-full align-items-center text-700 flex-wrap">
                <div className="mr-5 flex align-items-center mt-3 ">
                  <i className="pi pi-users mr-2" style={{ color: "red" }}></i>
                  <span>{assets["total"]} Total</span>
                </div>
                <div className="mr-5 flex align-items-center mt-3">
                  <i className="pi pi-globe mr-2" style={{ color: "blue" }}></i>
                  <span>{assets["assigned"]} Assigned </span>
                </div>

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

          <div
            className="col"
            style={{
              backgroundColor: "#e2e2f5",
              // width: '17vw',
              margin: "5px",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                borderRadius: "20px",
              }}
              className="flex w-full align-items-start flex-column p-2 bg-white"
            >
              <div className="w-full font-medium text-2xl  text-700">
                Inventory
              </div>
              <div className="w-full align-items-center text-700 flex-wrap">
                <div className="mr-5 flex align-items-center mt-3 ">
                  <i className="pi pi-users mr-2" style={{ color: "red" }}></i>
                  <span>{inventories["total"]} Total </span>
                </div>
                <div className="mr-5 flex align-items-center mt-3">
                  <i className="pi pi-globe mr-2" style={{ color: "blue" }}></i>
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

          <div
            className="col"
            style={{
              backgroundColor: "#AFE2EB",
              margin: "5px",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                borderRadius: "20px",
              }}
              className="flex w-full align-items-start flex-column p-2 bg-white"
            >
              <div className="w-full font-medium text-2xl  text-700">
                Requests
              </div>
              <div className="w-full align-items-center text-700 flex-wrap">
                <div className="mr-5 flex align-items-center mt-3 ">
                  <i className="pi pi-users mr-2" style={{ color: "red" }}></i>
                  <span>{requests["total"]} Total</span>
                </div>
                <div className="mr-5 flex align-items-center mt-3">
                  <i className="pi pi-globe mr-2" style={{ color: "blue" }}></i>
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

          <div
            className="col"
            style={{
              backgroundColor: "#FFEAD7",
              margin: "5px",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                borderRadius: "20px",
              }}
              className="flex w-full align-items-start flex-column p-2 bg-white"
            >
              <div className="w-full font-medium text-2xl  text-700">
                Proposal
              </div>
              <div className="w-full align-items-center text-700 flex-wrap">
                <div className="mr-5 flex align-items-center mt-3 ">
                  <i className="pi pi-users mr-2" style={{ color: "red" }}></i>
                  <span>{proposals["total"]} Total </span>
                </div>
                <div className="mr-5 flex align-items-center mt-3">
                  <i className="pi pi-globe mr-2" style={{ color: "blue" }}></i>
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

        <div
          className="grid justify-content-between"
          style={{
            width: "80vw",
            margin: "45px 0px 15px 15px",
            borderRadius: "20px",
          }}
        >
          <div
            className="col-6"
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
              }}
            />
          </div>

          <div
            className="col-6 "
            style={{ backgroundColor: "whitesmoke", borderRadius: "20px" }}
          >
            <ReportGenerator />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchDashData: PropTypes.func.isRequired,
  dashitems: PropTypes.array.isRequired,
  pagesize: PropTypes.any.isRequired,
};
const mapStateToProps = (state) => ({
  pagesize: state.assets.pagesize,
  booksize: state.assets.booksize,
  dashitems: state.dashboard.dashitems,
});

export default connect(mapStateToProps, {
  fetchDashData,
})(Dashboard);
