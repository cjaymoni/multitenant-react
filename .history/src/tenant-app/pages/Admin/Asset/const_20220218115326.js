import React from 'react';
import store from "../../../../shared/redux/store/store";
const state = store.getState();
// const available = store.getState().assets.available;

export const CardData =[
    {title:"Total items",icon:"pi pi-shopping-cart",content:state.assets.booksize},
    {title:"Available items",icon:"pi pi-user-plus",content:state.assets.pagesize},
    {title:"Decommisioned items",icon:"pi pi-minus-circle",content:state.assets.booksize - state.assets.pagesize}
]

export const titleBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset name</span>
            {rowData.title}
        </React.Fragment>
    );
}

export const makeBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset make</span>
            {rowData.make}
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
export const serialBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Serial no.</span>
            {rowData.serial_number}
        </React.Fragment>
    );
}
export const modelBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset model</span>
            {rowData.model}
        </React.Fragment>
    );
}
