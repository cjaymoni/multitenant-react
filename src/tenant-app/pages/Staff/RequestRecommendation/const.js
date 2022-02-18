import React from 'react';
import Moment  from "moment";


export const CardData =[
    {title:"Recommended",icon:"pi pi-sort-alt",content:"1"},
    {title:"Approved",icon:"pi pi-thumbs-up",content:"3"},
    {title:"Declined",icon:"pi pi-thumbs-down",content:"2"}
]

export const titleBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Device Specification</span>
            {rowData.title}
        </React.Fragment>
    );
}
export const statusBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Status</span>
            {rowData.status}
        </React.Fragment>
    );
}
export const justificationBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Justification</span>
            {rowData.justification}
        </React.Fragment>
    );
}
export const dateBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Date Recommended</span>
           
            {Moment(rowData.created_at).local()
            .format("DD-MM-YYYY")}
        </React.Fragment>
    );
}