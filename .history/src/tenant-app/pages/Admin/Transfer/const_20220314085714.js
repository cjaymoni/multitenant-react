import React from 'react';

export const CardData =[
    {title:"Assets",icon:"pi pi-shopping-cart",content:"1"},
    {title:"Inventories",icon:"pi pi-table",content:"3"}
]

export const assetTitleTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset Name</span>
            {rowData.title}
        </React.Fragment>
    );
}


export const assetCodeTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset Code</span>
            {rowData.code}
        </React.Fragment>
    );
}

export const assetSerialTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Serial Number</span>
            {rowData.serial_number}
        </React.Fragment>
    );
}

export const invTitleTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Inventory Name</span>
            {rowData.title}
        </React.Fragment>
    );
}

export const invManagerTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Inventory Manager</span>
            {rowData.manager.info.last_name + " " + rowData.manager.info.first_name}
        </React.Fragment>
    );
}
export const invDescriptionTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Description</span>
            {rowData.description}
        </React.Fragment>
    );
}




