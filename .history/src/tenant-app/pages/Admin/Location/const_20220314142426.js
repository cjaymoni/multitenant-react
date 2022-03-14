import React from "react";
import Moment from "moment";

export const dateBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      {Moment(rowData.created_at).local().format("DD-MM-YYYY")}
    </React.Fragment>
  );
};
export const depDateTemplate = (rowData) => {
  return (
    <React.Fragment>
      {Moment(rowData.created_at).local().format("DD-MM-YYYY")}
    </React.Fragment>
  );
};
