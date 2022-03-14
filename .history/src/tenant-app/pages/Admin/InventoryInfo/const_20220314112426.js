import React from "react";
export const titleBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className="p-column-title">Asset name</span>
      {rowData.title}
    </React.Fragment>
  );
};

export const serialBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className="p-column-title">Serial Number</span>
      {rowData.serial_number}
    </React.Fragment>
  );
};
export const codeBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className="p-column-title">Asset code</span>
      {rowData.code}
    </React.Fragment>
  );
};

const formatCurrency = (value) => {
  return value.toLocaleString("en-GH", {
    style: "currency",
    currency: "GHS",
  });
};

export const priceBodyTemplate = (rowData) => {
  return formatCurrency(rowData.amount);
};
