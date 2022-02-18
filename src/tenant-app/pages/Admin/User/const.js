import React from 'react';

export const CardData =[
    {title:"Total Users",icon:"pi pi-users",content:"1"},
    {title:"New Users",icon:"pi pi-user-plus",content:"3"}
]

export const emailTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Email</span>
            {rowData.email}
        </React.Fragment>
    );
}


export const fnameTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">First name</span>
            {rowData.info.first_name}
        </React.Fragment>
    );
}

export const lnameTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Last name</span>
            {rowData.info.last_name}
        </React.Fragment>
    );
}

export const phoneTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Contact</span>
            {rowData.info.phone}
        </React.Fragment>
    );
}

export const roleTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Usertype</span>
            {rowData.role.title}
        </React.Fragment>
    );
}




