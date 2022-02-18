import React from 'react';
import Moment from 'moment';
import classNames from 'classnames';

export const CardData = [
  { title: 'New Recommendations', icon: 'pi pi-comments', content: '1' },
  { title: 'Total Recommendations', icon: 'pi pi-comments', content: '3' },
];

export const authorBodyTemplate = rowData => {
  return (
    <React.Fragment>
      <span className="p-column-title">Email</span>
      {rowData.author.email}
    </React.Fragment>
  );
};

export const itemBodyTemplate = rowData => {
  return (
    <React.Fragment>
      <span className="p-column-title">Item</span>
      {rowData.title}
    </React.Fragment>
  );
};
export const dateBodyTemplate = rowData => {
  return (
    <React.Fragment>
      <span className="p-column-title">Date</span>

      {Moment(rowData.created_at).local().format('DD-MM-YYYY')}
    </React.Fragment>
  );
};

export const priorityBodyTemplate = rowData => {
  return (
    <React.Fragment>
      <span
        className={classNames(
          'priority-badge',
          'status-' + rowData.priority.title
        )}
      >
        {rowData.priority.title}
      </span>
    </React.Fragment>
  );
};
export const statusBodyTemplate = rowData => {
  return (
    <React.Fragment>
      <span className={classNames('status-badge', 'status-' + rowData.status)}>
        {rowData.status}
      </span>
    </React.Fragment>
  );
};
