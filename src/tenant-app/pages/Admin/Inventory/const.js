import React from 'react';

export const CardData =[
    {title:"Total Inventory",icon:"pi pi-bookmark",content:"1"},
    {title:"Total Assigned",icon:"pi pi-user-plus",content:"3"},
    {title:"Total Unassigned",icon:"pi pi-user-minus",content:"2"}
]

export const titleBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Inventory name</span>
            {rowData.title}
        </React.Fragment>
    );
}
export const descriptionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Description</span>
            {rowData.description}
        </React.Fragment>
    );
}
export const managerBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Manager</span>
            {rowData.manager.info.last_name + " " + rowData.manager.info.first_name}
        </React.Fragment>
    );
}

