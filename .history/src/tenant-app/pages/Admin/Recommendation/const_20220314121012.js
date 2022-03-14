import React from "react";
import Moment from "moment";
import classNames from "classnames";

export const authorBodyTemplate = (rowData) => {
  return <React.Fragment>{rowData.author.email}</React.Fragment>;
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
      <span className={classNames("status-badge", "status-" + rowData.status)}>
        {rowData.status}
      </span>
    </React.Fragment>
  );
};
