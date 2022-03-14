import React from "react";

export const managerBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      {rowData.manager.info.last_name + " " + rowData.manager.info.first_name}
    </React.Fragment>
  );
};
