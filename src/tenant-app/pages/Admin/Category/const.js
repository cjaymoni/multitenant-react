import React from 'react';
import  Moment  from 'moment';

export const CardData =[
    {title:"Total Categories",icon:"pi pi-shopping-cart",content:"1"},
    {title:"New Categories",icon:"pi pi-table",content:"3"}
]

export const titleTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Category Name</span>
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

 const assetTitleTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset Name</span>
            {rowData.title}
        </React.Fragment>
    );
}


 const assetCodeTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset Code</span>
            {rowData.code}
        </React.Fragment>
    );
}

 const assetSerialTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Serial Number</span>
            {rowData.serial_number}
        </React.Fragment>
    );
}

 const assetMakeTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset Make</span>
            {rowData.make}
        </React.Fragment>
    );
}


 const assetModelTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset Model</span>
            {rowData.model}
        </React.Fragment>
    );
}

export const infoColumns=[
    {field: 'title', header: 'Asset Name', body:assetTitleTemplate},
    {field: 'code', header: 'Asset Code', body:assetCodeTemplate},
    {field: 'serial_number', header: 'Serial no.', body:assetSerialTemplate},
    {field: 'model', header: 'Model', body:assetModelTemplate},
    {field: 'make', header: 'Make', body:assetMakeTemplate},
  ]
