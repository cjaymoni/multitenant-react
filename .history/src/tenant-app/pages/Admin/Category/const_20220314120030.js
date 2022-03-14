import React from "react";
import Moment from "moment";

export const dateBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      {Moment(rowData.created_at).local().format("DD-MM-YYYY")}
    </React.Fragment>
  );
};

export const infoColumns = [
  { field: "title", header: "Asset Name" },
  { field: "code", header: "Asset Code" },
  { field: "serial_number", header: "Serial no." },
  { field: "model", header: "Model" },
  { field: "make", header: "Make" },
];
