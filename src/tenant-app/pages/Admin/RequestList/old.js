import React,{useEffect,useState, useRef} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CardDemo from "../../../components/card/CardDemo";
import classNames from 'classnames';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import '../../../../shared/components/Table/Table.css';
import { AutoComplete } from 'primereact/autocomplete';
import ProductService from "../../../services/ProductService";
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function RequestList() {
    let emptyRequest = {
        id: null,
        name: '',
        serial: 0,
    };
    
    const [requests, setRequests] = useState(null);
    const [itemDialog, setItemDialog] = useState(false);
    const [deleteRequestDialog, setDeleteRequestDialog] = useState(false);
    const [deleteRequestsDialog, setDeleteRequestsDialog] = useState(false);
    const [request, setRequest] = useState(emptyRequest);
    const [selectedRequests, setSelectedRequests] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredusers] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const requestService = new ProductService();

 
    
    useEffect(() => {
        requestService.getProductsSmall().then(data => setRequests(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Update successful', life: 3000 });
    }

    const confirm1 = () => {
        confirmDialog({
            message: 'Do you you want to accept this request?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept
        });
    };

    const confirm2 = () => {
        confirmDialog({
            message: 'Do you want to decline this request?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept
        });
    };
    
    const openNew = () => {
        setRequest(emptyRequest);
        setSubmitted(false);
        setItemDialog(true);
    }
    
    const hideDialog = () => {
        setSubmitted(false);
        setItemDialog(false);
    }
    
    const hideDeleteRequestDialog = () => {
        setDeleteRequestDialog(false);
    }
    
    const hideDeleteRequestsDialog = () => {
        setDeleteRequestsDialog(false);
    }
    
    const saveRequest = () => {
        setSubmitted(true);
    
        if (request.name.trim()) {
            let _items = [...requests];
            let _item = {...request};
            if (request.id) {
                const index = findIndexById(request.id);
    
                _items[index] = _item;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Request Updated', life: 3000 });
            }
            else {
                _item.id = createId();
                _item.image = 'request-placeholder.svg';
                _items.push(_item);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Request Created', life: 3000 });
            }
    
            setRequests(_items);
            setItemDialog(false);
            setRequest(emptyRequest);
        }
    }
    
    const editRequest = (request) => {
        setRequest({...request});
        setItemDialog(true);
    }
    
    const confirmDeleteRequest = (request) => {
        setRequest(request);
        setDeleteRequestDialog(true);
    }
    
    const deleteRequest = () => {
        let _items = requests.filter(val => val.id !== request.id);
        setRequest(_items);
        setDeleteRequestDialog(false);
        setRequest(emptyRequest);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Request Deleted', life: 3000 });
    }
    
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < requests.length; i++) {
            if (requests[i].id === id) {
                index = i;
                break;
            }
        }
    
        return index;
    }
    
    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    
    const exportCSV = () => {
        dt.current.exportCSV();
    }
    
    const confirmDeleteSelected = () => {
        setDeleteRequestsDialog(true);
    }
    
    const deleteSelectedRequests = () => {
        let _items = requests.filter(val => !selectedRequests.includes(val));
        setRequests(_items);
        setDeleteRequestsDialog(false);
        setSelectedRequests(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Requests Deleted', life: 3000 });
    }
    
    const onCategoryChange = (e) => {
        let _item = {...request};
        _item['category'] = e.value;
        setRequest(_item);
    }
    
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _item = {...request};
        _item[`${name}`] = val;
    
        setRequest(_item);
    }
    
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _item = {...request};
        _item[`${name}`] = val;
    
        setRequest(_item);
    }
    
    const searchUser = (event) => {
      setTimeout(() => {
          let filteredusers;
          if (!event.query.trim().length) {
              filteredusers = [...users];
          }
          else {
              filteredusers = users.filter((country) => {
                  return country.name.toLowerCase().startsWith(event.query.toLowerCase());
              });
          }
    
          setFilteredusers(filteredusers);
      }, 250);
    }
    
    const itemTemplate = (item) => {
      return (
          <div className="country-item">
              <img alt={item.name} src={`showcase/demo/images/flag_placeholder.png`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${item.code.toLowerCase()}`} />
              <div>{item.name}</div>
          </div>
      );
    }
    
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button onClick={confirm1} icon="pi pi-check" className="p-button-rounded p-button-success p-mr-2" tooltip="Accept"></Button>
                <Button onClick={confirm2} icon="pi pi-times" className="p-button-rounded p-button-warning" tooltip="Decline" ></Button>
            </React.Fragment>
        );
    }
    
    const header = (
        <div className="table-header">
            <h2 className="p-m-0">Manage requests</h2>
            <span className="p-input-icon-left">
            <i className="pi pi-search"  />
    
    
            <InputText style={{height:'35px', marginRight:'350px'}} type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
           
            <div className=" p-flex-md-row">
                {/* <Button label="New Request" className="p-button-raised p-button-outlined" onClick={() => editRequest()}  ></Button> */}
                &nbsp;&nbsp;
                <Dropdown value={selectedUser} options={['Pending','Accepted','Declined']} onChange={onCategoryChange}  placeholder="Select a Status" className="p-column-filter" showClear />

                </div>
                  
    
      </div>
    );
    const itemDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveRequest} />
        </React.Fragment>
    );
    const deleteRequestDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRequestDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteRequest} />
        </React.Fragment>
    );
    const deleteRequestsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRequestsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedRequests} />
        </React.Fragment>
    );
    return(
    <div>
    <h2 className="p-mb-3 p-text-light" style={{marginLeft:"20px"}}>Request info</h2>
    
    <div className="p-grid p-justify-between" style={{marginLeft:"10px" }}>
    <div className="p-col-6">
    <CardDemo title="New request" icon="pi pi-shopping-cart" content="54"></CardDemo>
    </div>
    <div className="p-col-6">
    <CardDemo title="Total requests" icon="pi pi-shopping-cart" content="274"></CardDemo>
    </div>
    </div>
        <div className="datatable-doc-demo" >
                <Toast ref={toast} />
    
                <div className="card" >    
                    <DataTable ref={dt} value={requests} selection={selectedRequests} onSelectionChange={(e) => setSelectedRequests(e.value)}
                        dataKey="id"   header={header} 
                        paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        style={{width:'73vw', marginLeft:'15px'}}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" 
                        globalFilter={globalFilter}
                        >
    
                        <Column field="name" header="Staff name" sortable></Column>
                        <Column field="name" header="Asset name" sortable></Column>
                        <Column field="name" header="Center code" sortable></Column>
                        <Column field="name" header="Start date" sortable></Column>
                        <Column field="name" header="End date" sortable></Column>
                        <Column field="name" header="Date Requested" sortable></Column>
                        <Column field="name" header="Request Status" sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
    
                <Dialog visible={itemDialog} style={{ width: '450px' }} header="Request Details" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
                    {request.image && <img src={`showcase/demo/images/request/${request.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={request.image} className="request-image" />}
                    <div className="p-field">
                        <label htmlFor="name">Request</label>
                        <InputText id="name" value={request.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !request.name })} />
                        {submitted && !request.name && <small className="p-error">Name is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="description">Description</label>
                        <InputTextarea id="description" value={request.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                    </div>
    
                    <div className="p-field">
                        <label className="p-mb-3">Category</label>
                        <div className="p-formgrid p-grid">
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={request.category === 'Accessories'} />
                                <label htmlFor="category1">Hardware</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={request.category === 'Clothing'} />
                                <label htmlFor="category2">Software</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={request.category === 'Electronics'} />
                                <label htmlFor="category3">Electronics</label>
                            </div>
                            <div className="p-field-radiobutton p-col-6">
                                <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={request.category === 'Fitness'} />
                                <label htmlFor="category4">Furniture</label>
                            </div>
                        </div>
                    </div>
    
                    <div className="p-formgrid p-grid">
                        <div className="p-field p-col">
                            <label htmlFor="price">Owner</label>
                            <AutoComplete value={selectedUser} suggestions={filteredUsers} completeMethod={searchUser} field="name" dropdown forceSelection itemTemplate={itemTemplate} onChange={(e) => setSelectedUser(e.value)} />                    </div>
                        {/* <div className="p-field p-col">
                            <label htmlFor="quantity">Created By</label>
                            <AutoComplete value={selectedUser} suggestions={filteredusers} completeMethod={searchUser} field="name" dropdown forceSelection itemTemplate={itemTemplate} onChange={(e) => setSelectedUser(e.value)} />                   
                             </div> */}
                    </div>
                </Dialog>
    
                <Dialog visible={deleteRequestDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRequestDialogFooter} onHide={hideDeleteRequestDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {request && <span>Are you sure you want to delete <b>{request.name}</b>?</span>}
                    </div>
                </Dialog>
    
                <Dialog visible={deleteRequestsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRequestsDialogFooter} onHide={hideDeleteRequestsDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                        {request && <span>Are you sure you want to delete the selected requests?</span>}
                    </div>
                </Dialog>
            </div>
      </div>
    );

}