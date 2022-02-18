import React from 'react';
import Moment  from "moment";
import { Button } from "primereact/button";


export const CardData =[
    {title:"Total Requests",icon:"pi pi-sort-alt",content:"1"},
    {title:"Accepted",icon:"pi pi-thumbs-up",content:"3"},
    {title:"Declined",icon:"pi pi-thumbs-down",content:"2"}
]

export const  typeSelect =[
    {label:'Created', value:'Created'},
    {label:'Accepted', value:'Accepted'},
    {label:'Declined', value:'Declined'},
    {label:'Ready', value:'Ready'},
    {label:'Picked', value:'Picked'},
    {label:'Returned', value:'Returned'},
  ]



export const historyTitle = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset name</span>
            {rowData.item.title}
        </React.Fragment>
    );
}
const historyCode = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset code</span>
            {rowData.item.code}
        </React.Fragment>
    );
}

const historyDaterequested = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Date Requested</span>
            {Moment(rowData.created_at).local()
            .format("DD-MM-YYYY")}        </React.Fragment>
    );
}

const historyStartDate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Start Date</span>
            {Moment(rowData.start_date).local()
            .format("DD-MM-YYYY")}        </React.Fragment>
    );
}

const historyEndDate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">End Date</span>
          
            {Moment(rowData.end_date).local()
            .format("DD-MM-YYYY")}
        </React.Fragment>
    );
}
const historyStatus = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Request Status</span>
            {rowData.action}
        </React.Fragment>
    );
}
export const  historycolumns = [
    {field: 'item.title', header: 'Asset Name', body:historyTitle},
    {field: 'item.code', header:'Asset Code',body:historyCode},
    {field: 'created_at', header:'Date Requested',body:historyDaterequested},
    {field: 'start_date', header:'Start Date ',body:historyStartDate},
    {field: 'end_date', header:'End Date',body:historyEndDate},
    {field: "action", header:'Request Status',body:historyStatus}
];

export const titleBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset name</span>
            {rowData.title}
        </React.Fragment>
    );
}
export const codeBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Asset Code</span>
            {rowData.code}
        </React.Fragment>
    );
}
export const modelBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Model</span>
            {rowData.model}
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
export const dateBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Purchase Date</span>
           
            {Moment(rowData.purchase_date).local()
            .format("DD-MM-YYYY")}
        </React.Fragment>
    );
}



  export const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-info" className="p-button-rounded p-button-info p-mr-2"
            //    onClick={() => this.toggle('toggler1',rowData)} 
               tooltip="More Info" />
                <Button icon="pi pi-external-link" className="p-button-rounded p-button-success"
            //    onClick={() => {this.toggle('toggler',rowData);
                // this.returnDateView(rowData)}} 
               tooltip="Request"/>
            </React.Fragment>
        );
    }