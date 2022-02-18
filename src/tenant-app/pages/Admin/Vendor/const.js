import React from 'react';

export const CardData =[
    {title:"Total Vendors",icon:"pi pi-shopping-cart",content:"1"},
    {title:"New Vendors",icon:"pi pi-folder-open",content:"3"}
]

export const titleBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Vendor Name</span>
            {rowData.title}
        </React.Fragment>
    );
}

export const contactBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
        <span className="p-column-title">Vendor Contact</span>
        {rowData.contact}
    </React.Fragment>
    );
}
export const emailBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Vendor Email</span>
            {rowData.email}
        </React.Fragment>
    );
}
