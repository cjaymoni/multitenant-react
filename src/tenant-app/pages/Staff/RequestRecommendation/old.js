import React,{useEffect,useState,useRef} from "react";
import {InputTextarea} from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown';
import CardDemo from "../../../components/card/CardDemo";
import classNames from 'classnames';
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import ProductService from "../../../services/ProductService";
import { Column } from 'primereact/column';




export default function RequestRecommendation(props) {
    const [historyDialog, sethistoryDialog] = useState(false);
    const [selectedUrgency, setSelectedUrgency] = useState(null);
    const dt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const itemService = new ProductService();
    const [items, setItems] = useState(null);




    useEffect(() => {
        itemService.getProductsSmall().then(data => setItems(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    let urgency = [
            {name: 'High', code: 'High'},
            {name: 'Moderate', value: 'Moderate'},
            {name: 'Low', code: 'Low'},
    ];

    const onUrgencyChange = (e) => {
        setSelectedUrgency(e.value);
    }
    const openHistoryDialog = () => {
        sethistoryDialog(true);
    }
    
    const hideDialog = () => {
        // setSubmitted(false);
        sethistoryDialog(false);
    }
    
    const ItemDialogFooter = (
        <React.Fragment>
            <Button label="Close" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        </React.Fragment>
    );
return(
    <div>
    <h2 className="p-mb-3 p-text-light" style={{marginLeft:"20px"}}>Recommendation</h2>
    
    <div className="p-grid p-justify-between" style={{marginLeft:"10px" }}>
    <div className="p-col-1">
    <CardDemo title="Total recommendations" icon="pi pi-shopping-cart" content="27"></CardDemo>
    </div>
    <div className="p-col-1">
    <CardDemo title="Approved " icon="pi pi-shopping-cart" content="24"></CardDemo>
    </div>
    <div className="p-col-1">
    <CardDemo title="Declined" icon="pi pi-shopping-cart" content="15"></CardDemo>
    </div>
    </div>
    <div  className="header">
    <h2 className="p-m-0">Recommend Asset</h2>
            <div className=" p-flex-md-row">
                <Button label="Recommendation History " icon="pi pi-replay"  className="p-button-raised p-button-outlined" onClick={()=>openHistoryDialog()}   ></Button>
            </div>
    </div><br></br>
    <div style={{marginLeft:"auto"}}>
    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="firstname6">Device / Equipment / Item Specification</label>
                             <label> Example: (HP OMEN 15)</label>
                            <InputText id="firstname6" type="text" />
                        </div>
                     
 <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="lastname6">Select Urgency of item</label>
                            <label></label>
                            <Dropdown inputId="state" value={selectedUrgency} options={urgency} onChange={onUrgencyChange} placeholder="Select" optionLabel="name"/>                        </div>

    </div>
    </div>
    <div className="p-fluid p-formgrid p-grid">
    <label htmlFor="firstname6">Justification</label>
    <InputTextarea></InputTextarea>
    </div>
    <div>
        <Button label="Submit" icon="pi pi-check" iconPos="left"></Button>
    </div>




    <Dialog visible={historyDialog} header="Recommendation History" modal className="p-fluid" footer={ItemDialogFooter} onHide={hideDialog}  breakpoints={{'960px': '75vw'}} style={{width: '60vw', height:'60vh'}}>
    <div className="card">
                <DataTable ref={dt} value={items} 
                    dataKey="id"   
                    paginator rows={5} rowsPerPageOptions={[5, 10,15,20, 25]}
                    style={{width:'53vw', marginLeft:'20px'}}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" 
                    globalFilter={globalFilter} >
                    <Column  field="code" header="Device Specification" sortable></Column>
                    <Column field="name" header="Justification" sortable></Column>
                    <Column field="serial" header="Urgency" sortable></Column>
                    <Column field="category" header="Date Recommended" sortable></Column>
                </DataTable>
            </div>       
    </Dialog>






    </div>
)

}