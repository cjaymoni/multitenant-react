import React from 'react';
import Moment  from 'moment';

export const CardData =[
    {title:"Total Locations",icon:"pi pi-shopping-cart",content:"1"},
    {title:"New Locations",icon:"pi pi-folder-open",content:"3"}
]

export const titleBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Location Name</span>
            {rowData.title}
        </React.Fragment>
    );
}

export const addressBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
        <span className="p-column-title">Digital Address</span>
        {rowData.ghana_post}
    </React.Fragment>
    );
}
export const dateBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Date Created</span>
            {Moment(rowData.created_at).local()
            .format("DD-MM-YYYY")}
        </React.Fragment>
    );
}
export const depDateTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Date Created</span>
            {Moment(rowData.created_at).local()
            .format("DD-MM-YYYY")}
        </React.Fragment>
    );
}
export const depTitleTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Department Name</span>
            {rowData.title}
        </React.Fragment>
    );
}
