import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "../ProductService";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { fetchLogs } from "../../../../shared/redux/actions/logActions";
import { Divider } from "primereact/divider";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CardDemo from "../../../../shared/components/card/CardDemo";

class Logs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      expandedRows: null,
    };

    this.productService = new ProductService();
    this.amountBodyTemplate = this.amountBodyTemplate.bind(this);
    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
    this.searchBodyTemplate = this.searchBodyTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.statusOrderBodyTemplate = this.statusOrderBodyTemplate.bind(this);
    this.onRowExpand = this.onRowExpand.bind(this);
    this.onRowCollapse = this.onRowCollapse.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  componentDidMount() {
    this.productService
      .getProductsWithOrdersSmall()
      .then((data) => this.setState({ products: data }));
    this.props.fetchLogs();
  }

  onRowExpand(event) {
    this.toast.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  }

  onRowCollapse(event) {
    this.toast.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  }

  expandAll() {
    let expandedRows = {};
    this.state.products.forEach((p) => (expandedRows[`${p.id}`] = true));

    this.setState(
      {
        expandedRows,
      },
      () => {
        this.toast.show({
          severity: "success",
          summary: "All Rows Expanded",
          life: 3000,
        });
      }
    );
  }

  collapseAll() {
    this.setState(
      {
        expandedRows: null,
      },
      () => {
        this.toast.show({
          severity: "success",
          summary: "All Rows Collapsed",
          life: 3000,
        });
      }
    );
  }

  formatCurrency(value) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  amountBodyTemplate(rowData) {
    return this.formatCurrency(rowData.amount);
  }

  statusOrderBodyTemplate(rowData) {
    return (
      <span className={`order-badge order-${rowData.status.toLowerCase()}`}>
        {rowData.status}
      </span>
    );
  }

  searchBodyTemplate() {
    return <Button icon="pi pi-search" />;
  }

  priceBodyTemplate(rowData) {
    return rowData.price;
  }

  ratingBodyTemplate(rowData) {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  }

  statusBodyTemplate(rowData) {
    return (
      <span
        className={`logs-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  }

  rowExpansionTemplate(data) {
    return (
      <div className="orders-subtable">
        <h5>Logs for {data.name}</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <Divider />

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit,
          sed quia non numquam eius modi.
        </p>
      </div>
    );
  }

  render() {
    const headColumns = [
      { field: "title", header: "Title" },
      { field: "code", header: "Category" },
      { field: "serial_number", header: "Date Created" },
      { field: "make", header: "Status" },
      { header: "Action(s)" },
    ];

    const header = (
      <h3 className="table-header-container">
        {/* <Button icon="pi pi-plus" label="Expand All" onClick={this.expandAll} className="p-mr-2" />
                <Button icon="pi pi-minus" label="Collapse All" onClick={this.collapseAll} /> */}
        System Logs
      </h3>
    );

    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          System Logs
        </h2>
        <br></br>
        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Critical"
              icon="pi pi-shopping-cart"
              content={this.props.booksize}
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
            ></CardDemo>
          </div>
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Warning"
              icon="pi pi-shopping-cart"
              content={this.props.booksize}
              color="#e7cbec"
              iconColor="#9c27b0"
              update="1"
            ></CardDemo>
          </div>
          <div className="p-col-12 p-lg-6">
            <CardDemo
              title="Error"
              icon="pi pi-shopping-cart"
              color="#fde0c2"
              iconColor="#f57c00"
              update="1"
              content={this.props.booksize - this.props.pagesize}
            ></CardDemo>
          </div>
        </div>
        <br></br>

        <div className="datatable-rowexpansion-demo">
          <Toast ref={(el) => (this.toast = el)} />

          <div className="" style={{ width: "70vw", margin: "20px" }}>
            <DataTable
              value={this.state.products}
              expandedRows={this.state.expandedRows}
              onRowToggle={(e) => this.setState({ expandedRows: e.data })}
              onRowExpand={this.onRowExpand}
              onRowCollapse={this.onRowCollapse}
              rowExpansionTemplate={this.rowExpansionTemplate}
              dataKey="id"
              header={header}
            >
              <Column expander style={{ width: "3em" }} />
              <Column field="name" header="Name" sortable />
              <Column
                field="date"
                header="Date"
                sortable
                body={this.priceBodyTemplate}
              />
              <Column field="code" header="Code" sortable />
              <Column field="category" header="Category" sortable />
              <Column
                field="inventoryStatus"
                header="Status"
                sortable
                body={this.statusBodyTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
    );
  }
}

Logs.propTypes = {
  logs: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  logs: state.logs,
});
export default connect(mapStateToProps, {
  fetchLogs,
})(Logs);
