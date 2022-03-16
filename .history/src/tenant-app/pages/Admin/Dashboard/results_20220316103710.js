import React, { Component } from "react";
import { connect } from "react-redux";
import "./table.css";
class ResultsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.columns = [
      { field: "year", header: "Year" },

      { field: "month", header: "Month", body: this.monthTemplate },
      { field: "sum", header: "Sum" },
    ];
    this.getd = this.getd.bind(this);
  }

  monthTemplate(rowData) {
    switch (rowData.month) {
      case 1:
        return <span>January</span>;
      case 2:
        return <span>February</span>;
      case 3:
        return <span>March</span>;
      case 4:
        return <span>April</span>;
      case 5:
        return <span>May</span>;
      case 6:
        return <span>June</span>;
      case 7:
        return <span>July</span>;
      case 8:
        return <span>August</span>;
      case 9:
        return <span>September</span>;
      case 10:
        return <span>October</span>;
      case 11:
        return <span>November</span>;
      case 12:
        return <span>December</span>;
      default:
        return <span>January</span>;
    }
  }

  getd() {
    var dd = this.state.products;

    return console.log(dd);
  }
  async componentDidMount() {
    var dt = this.props.data;

    switch (dt) {
      case "asset":
        await this.setState({ products: this.props.report["asset"].aggr });

        return console.log(this.state.products);

      case "request":
        await this.setState({
          products: this.props.report["request"].aggr,
        });
        return console.log(this.state.products);

      case "proposal":
        await this.setState({
          products: this.props.report["proposal"].aggr,
        });
        return console.log(this.state.products);

      case "inventory":
        await this.setState({
          products: this.props.report["inventory"].aggr,
        });
        return console.log(this.state.products);

      case "financial":
        await this.setState({
          products: this.props.report["financial"].aggr,
        });
        return console.log(this.state.products);

      default:
        return <span>No data</span>;
    }
  }

  render() {
    const objEntries = this.state.products;
    const firstDog =
      Array.isArray(objEntries) && objEntries.length ? objEntries[0] : {};

    const headers = Object.keys(firstDog);

    return (
      <table className="w-full" id="customers">
        <tr>
          {headers.map((header) => (
            <th>{header}</th>
          ))}
        </tr>

        {objEntries.map((dog) => {
          return (
            <tr>
              {headers.map((header) => {
                if (header === "month") {
                  switch (dog[header]) {
                    case 1:
                      return <span>January</span>;
                    case 2:
                      return <span>February</span>;
                    case 3:
                      return <span>March</span>;
                    case 4:
                      return <span>April</span>;
                    case 5:
                      return <span>May</span>;
                    case 6:
                      return <span>June</span>;
                    case 7:
                      return <span>July</span>;
                    case 8:
                      return <span>August</span>;
                    case 9:
                      return <span>September</span>;
                    case 10:
                      return <span>October</span>;
                    case 11:
                      return <span>November</span>;
                    case 12:
                      return <span>December</span>;
                    default:
                      return <span>January</span>;
                  }
                  // return 'Month';
                } else return <td>{dog[header]}</td>;
              })}
            </tr>
          );
        })}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  report: state.dashboard.report,
});
export default connect(mapStateToProps, null)(ResultsTable);
