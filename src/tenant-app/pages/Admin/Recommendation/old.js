import React,{useEffect,useState} from "react";
import { Column } from 'primereact/column';
import ProductService from '../../../services/ProductService';
import CardDemo from "../../../components/card/CardDemo";
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';


export default function Recommendation() {
  let emptyRecommendation = {
    id: null,
    name: '',
    deviceSpecification: '',
    date: null,
    urgency:'',
    justification: '',
    
};
  const [recommendations, setRecommendations] = useState([]);
  const recommendationService = new ProductService();
  const [deleteItemDialog, setDeleteItemDialog] = useState(false);
  const [item, setItem] = useState(emptyRecommendation);



  useEffect(() => {
    recommendationService.getProductsSmall().then(data => setRecommendations(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatCurrency = (value) => {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  const priceBodyTemplate = (rowData) => {
      return formatCurrency(rowData.price);
  }

  const statusBodyTemplate = (rowData) => {
      return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
  }

  const mainHeader = (
      <div className="table-header">
          Recommendations
      </div>
  );
  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <div className="p-d-flex">
            <Button icon="pi pi-check" className="p-button-rounded p-button-warning  p-mr-2" onClick={() => confirmDeleteItem(rowData)} tooltip="Notify" />
            </div>
        </React.Fragment>
    );
}
const confirmDeleteItem = (item) => {
  setItem(item);
  setDeleteItemDialog(true);
}

  return (
    <div>
    <h2 className="p-mb-3 p-text-light" style={{marginLeft:"20px"}}>Recommendation info</h2>
    <div className="p-grid p-justify-between" style={{marginLeft:"10px" }}>
    <div className="p-col-6">
    <CardDemo title="New recommendation" icon="pi pi-shopping-cart" content="34"></CardDemo>
    </div>
    <div className="p-col-6">
    <CardDemo title="Total recommendation" icon="pi pi-shopping-cart" content="256"></CardDemo>
    </div>
    </div>
    <div className="p-grid">
    <div className="datatable-templating-demo">
            <div className="card">
                <DataTable value={recommendations} header={mainHeader} 
                style={{width:'73vw', marginLeft:'25px'}}
                paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">
                    <Column field="name" header="Username"></Column>
                    <Column header="Device specs" body={statusBodyTemplate}></Column>
                    <Column field="price" header="Justification" body={priceBodyTemplate}></Column>
                    <Column field="name" header="Date"></Column>
                    <Column field="name" header="Urgency"></Column>
                    <Column header="Notify" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>      
    </div>
</div>
  );
}