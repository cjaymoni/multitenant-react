import React from "react";
import Moment from "moment";
import classNames from "classnames";

export const CardData = [
  { title: "New Requests", icon: "pi pi-comments", content: "1" },
  { title: "Total Requests", icon: "pi pi-comments", content: "3" },
];

export const assetBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className="p-column-title">Asset name</span>
      {rowData.item.title}
    </React.Fragment>
  );
};

export const codeBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className="p-column-title">Asset code</span>
      {rowData.item.code}
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

export const priorityBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span
        className={classNames(
          "priority-badge",
          "status-" + rowData.priority.title
        )}
      >
        {rowData.priority.title}
      </span>
    </React.Fragment>
  );
};
export const statusBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className={classNames("status-badge", "status-" + rowData.action)}>
        {rowData.action}
      </span>
    </React.Fragment>
  );
};
