import React from "react";

export const CardData = [
  { title: "Assets", icon: "pi pi-shopping-cart", content: "1" },
  { title: "Inventories", icon: "pi pi-table", content: "3" },
];

export const invManagerTemplate = (rowData) => {
  return (
    <React.Fragment>
      {rowData.manager.info.last_name + " " + rowData.manager.info.first_name}
    </React.Fragment>
  );
};
