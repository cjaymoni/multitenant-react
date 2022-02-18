import React from 'react';
import  Moment  from 'moment';

export const CardData =[
    {title:"Total Tenants",icon:"pi pi-shopping-cart",content:"1"},
    {title:"New Tenants",icon:"pi pi-table",content:"3"}
]

export const titleTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Tenant Name</span>
            {rowData.title}
        </React.Fragment>
    );
}


export const descriptionTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Description</span>
            {rowData.description}
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

 const tenantTitleTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Tenant Name</span>
            {rowData.title}
        </React.Fragment>
    );
}


 const tenantCodeTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Tenant Code</span>
            {rowData.code}
        </React.Fragment>
    );
}

 const tenantSerialTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Serial Number</span>
            {rowData.serial_number}
        </React.Fragment>
    );
}

 const tenantMakeTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Tenant Make</span>
            {rowData.make}
        </React.Fragment>
    );
}


 const tenantModelTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Tenant Model</span>
            {rowData.model}
        </React.Fragment>
    );
}

export const infoColumns=[
    {field: 'title', header: 'Tenant Name', body:tenantTitleTemplate},
    {field: 'code', header: 'Tenant Code', body:tenantCodeTemplate},
    {field: 'serial_number', header: 'Serial no.', body:tenantSerialTemplate},
    {field: 'model', header: 'Model', body:tenantModelTemplate},
    {field: 'make', header: 'Make', body:tenantMakeTemplate},
  ]