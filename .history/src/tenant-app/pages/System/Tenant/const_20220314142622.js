import React from "react";
import Moment from "moment";

export const CardData = [
  { title: "Total Tenants", icon: "pi pi-shopping-cart", content: "1" },
  { title: "New Tenants", icon: "pi pi-table", content: "3" },
];

export const dateBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      {Moment(rowData.created_at).local().format("DD-MM-YYYY")}
    </React.Fragment>
  );
};

export const infoColumns = [
  { field: "title", header: "Tenant Name" },
  { field: "code", header: "Tenant Code" },
  { field: "serial_number", header: "Serial no." },
  { field: "model", header: "Model" },
  { field: "make", header: "Make" },
];
