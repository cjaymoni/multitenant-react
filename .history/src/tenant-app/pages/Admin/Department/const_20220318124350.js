import React from "react";
import Moment from "moment";

// export const CardData =[
//     {title:"Total Departments",icon:"pi pi-shopping-cart",content:"1"},
//     {title:"New Departments",icon:"pi pi-folder-open",content:"3"}
// ]

export const headBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      {rowData.head_of_department.last_name +
        " " +
        rowData.head_of_department.middle_name +
        " " +
        rowData.head_of_department.first_name}
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
