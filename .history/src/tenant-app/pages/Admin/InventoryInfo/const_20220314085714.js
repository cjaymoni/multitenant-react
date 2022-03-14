import React from 'react';
export const titleBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset name</span>
            {rowData.title}
        </React.Fragment>
    );
}

export const serialBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Serial Number</span>
            {rowData.serial_number}
        </React.Fragment>
    );
}
export const codeBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset code</span>
            {rowData.code}
        </React.Fragment>
    );
}
export const priceBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Price</span>
            {rowData.amount}
        </React.Fragment>
    );
}