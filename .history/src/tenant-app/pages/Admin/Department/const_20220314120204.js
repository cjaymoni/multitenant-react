import React from "react";
import Moment from "moment";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { connect } from "react-redux";

// export const CardData =[
//     {title:"Total Departments",icon:"pi pi-shopping-cart",content:"1"},
//     {title:"New Departments",icon:"pi pi-folder-open",content:"3"}
// ]

export const headBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      {rowData.manager.info.last_name + " " + rowData.manager.info.first_name}
    </React.Fragment>
  );
};
export const dateBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      {Moment(rowData.created_at).local().format("DD-MM-YYYY")}
    </React.Fragment>
  );
};
