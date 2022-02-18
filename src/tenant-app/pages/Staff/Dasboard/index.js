import React, { useEffect, useState } from "react";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import ProductService from "../../../services/ProductService";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import "../../../../shared/components/Table/Table.css";
import gear from './gear.svg'

export default function Dashboard(props) {
  const [items, setProducts] = useState([]);
  // const productService = new ProductService();
  const columns = [
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
  ];

  const itemTemplate = (data) => {
    return (
      <div className="product-item">
        <div className="product-detail">
          {/* <div className="product-name">{data.name}</div> */}
          <div className="product-description">{data.description}</div>
          {/* <i className="pi pi-tag product-category-icon"></i>
          <span className="product-category">{data.category}</span> */}
        </div>
        <div className="product-action">
          <span className={`overview-badge status-${data.overviewStatus}`}>
            {data.overviewStatus}
          </span>
        </div>
      </div>
    );
  };

  // useEffect(() => {
  //   productService.getProductsSmall().then((data) => setProducts(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  };

  const mainHeader = <div className="table-header">Asset Overview</div>;

  const previewHeader = <div className="table-header">Quick details</div>;
  const footer = `In total there are ${items ? items.length : 0} new assets.`;
  const dynamicColumns = columns.map((col, i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });
  return (

    <div >
    <header className="App-header">
      <img src={gear} className="App-logo" alt="logo" />&nbsp;&nbsp;&nbsp;
      <p>
        Page under construction
      </p>
     
    </header>
  </div>
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
  );
}