import React from "react";

export const managerBodyTemplate = (rowData) => {
  return (
    rowData.manager.last_name +
    " " +
    rowData.manager.middle_name +
    " " +
    rowData.manager.first_name
  );
};
