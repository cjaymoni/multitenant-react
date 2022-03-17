import React,{useEffect,useState, useRef} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CardDemo from "../../../components/card/CardDemo";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import '../../../../shared/components/Table/Table.css';
import ProductService from "../../../services/ProductService";
import { Dropdown } from 'primereact/dropdown';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { AutoComplete } from 'primereact/autocomplete';



export default function Transfer() {
  let emptyTransfer = {
    id: null,
    name: '',
    description: '',
    category: null,
    price:'',
    serial: 0,
    quantity: 0,
    itemStatus: 'INSTOCK'
};

const [items, setItems] = useState(null);
const [itemDialog, setItemDialog] = useState(false);
const [deleteItemDialog, setDeleteItemDialog] = useState(false);
const [deleteItemsDialog, setDeleteItemsDialog] = useState(false);
const [item, setItem] = useState();
const [decommission, setDecommission] = useState(emptyTransfer);
const [decommissionDialog, setDecommisionDialog] = useState(false);
const [selectedItems, setSelectedItems] = useState(null);
const [submitted, setSubmitted] = useState(false);
const [globalFilter, setGlobalFilter] = useState(null);
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const toast = useRef(null);
const dt = useRef(null);
const itemService = new ProductService();
const [filteredUsers, setFilteredUsers] = useState(null);


useEffect(() => {
    itemService.getProductsSmall().then(data => setItems(data));
}, []); // eslint-disable-line react-hooks/exhaustive-deps

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const openNew = () => {
    setItem(emptyTransfer);
    setSubmitted(false);
    setItemDialog(true);
}

const hideDialog = () => {
    setSubmitted(true);
    setItemDialog(true);
}

const hideDeleteItemDialog = () => {
    setDeleteItemDialog(false);
}

const hideDeleteItemsDialog = () => {
    setDeleteItemsDialog(false);
}

const searchUsers = (event) => {
  setTimeout(() => {
      let filteredUsers;
      if (!event.query.trim().length) {
          filteredUsers  = [...users];
      }
      else {
          filteredUsers = filteredUsers.filter((user) => {
              return user.name.toLowerCase().startsWith(event.query.toLowerCase());
          });
      }

      setFilteredUsers(filteredUsers);
  }, 250);
}

const saveItem = () => {
    setSubmitted(true);

    if (item.name.trim()) {
        let _items = [...items];
        let _item = {...item};
        if (item.id) {
            const index = findIndexById(item.id);

            _items[index] = _item;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Updated', life: 3000 });
        }
        else {
            _item.id = createId();
            _item.image = 'item-placeholder.svg';
            _items.push(_item);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Created', life: 3000 });
        }

        setItems(_items);
        setItemDialog(false);
        setItem(emptyTransfer);
    }
}

const editItem = (item) => {
    setItem({...item});
    setItemDialog(true);
}

const transferItem = (item) => {
    setDecommission({...item});
    setDecommisionDialog(true);
}

const confirmDeleteItem = (item) => {
    setItem(item);
    setDeleteItemDialog(true);
}

const deleteItem = () => {
    let _items = items.filter(val => val.id !== item.id);
    setItem(_items);
    setDeleteItemDialog(false);
    setItem(emptyTransfer);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Deleted', life: 3000 });
}

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
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
    setDeleteItemsDialog(true);
}

const deleteSelectedItems = () => {
    let _items = items.filter(val => !selectedItems.includes(val));
    setItems(_items);
    setDeleteItemsDialog(false);
    setSelectedItems(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Items Deleted', life: 3000 });
}

const onCategoryChange = (e) => {
    let _item = {...item};
    _item['category'] = e.value;
    setItem(_item);
}


const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <div className="p-d-flex">
            <Button icon="pi pi-user-edit" className="p-button-rounded p-button-success  " onClick={() => transferItem(rowData)} tooltip="Transfer" />
            </div>
        </React.Fragment>
    );
}

const header = (
    <div className="table-header">
        <h2 className="p-m-0">Transfer history</h2>
        <span className="p-input-icon-left">
        <i className="pi pi-search"  />


        <InputText style={{height:'35px', marginRight:'400px'}} type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
       
        <div className=" p-flex-md-row">
            {/* <Button label="New Request" className="p-button-raised p-button-outlined" onClick={() => editRequest()}  ></Button> */}
            &nbsp;&nbsp;
            <Dropdown value={selectedUser} options={['Inventory','Transfer']} onChange={onCategoryChange}  placeholder="History" className="p-column-filter" showClear />

            </div>
              

  </div>
);

const ItemDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveItem} />
    </React.Fragment>
);
const deleteItemDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
    </React.Fragment>
);
const deleteItemsDialogFooter = (
    <React.Fragment>
        <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemsDialog} />
        <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedItems} />
    </React.Fragment>
);

  return (
    <div>
    <h2 className="p-mb-3 p-text-light" style={{marginLeft:"20px"}}>Inventory info</h2>
    
    <div className="p-grid p-justify-between" style={{marginLeft:"10px" }}>
    <div className="p-col-6">
    <CardDemo title="Asset transfer" icon="pi pi-shopping-cart" content="57"></CardDemo>
    </div>
    <div className="p-col-6">
    <CardDemo title="Inventory transfer" icon="pi pi-shopping-cart" content="24"></CardDemo>
    </div>
    </div>
    <div className="datatable-doc-demo">
            <Toast ref={toast} />

            <div className="card">
                {/* <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} style={{marginLeft:"300px",marginBottom:"100px", marginRight:"50px"}}></Toolbar> */}

                <DataTable ref={dt} value={items} selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value)}
                    dataKey="id"   header={header} 
                    paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    style={{width:'73vw', marginLeft:'15px'}}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" 
                    globalFilter={globalFilter}
                    >

                    <Column field="code" header="Inventory name" sortable></Column>
                    <Column field="name" header="Total assets" sortable></Column>
                    <Column field="category" header="Created by" sortable></Column>
                    <Column field="sublocation" header="Owner" sortable></Column>
                    <Column header="Transfer"body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            {/* <Dialog visible={itemDialog} style={{ width: '450px' }} header="Transfer Inventory Ownership" modal className="p-fluid" footer={ItemDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="name">Item</label>
                    <InputText id="name" value={item.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.name })} />
                    {submitted && !item.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={item.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="p-field">
                    <label className="p-mb-3">Category</label>
                    <div className="p-formgrid p-grid">
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={item.category === 'Accessories'} />
                            <label htmlFor="category1">Hardware</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={item.category === 'Clothing'} />
                            <label htmlFor="category2">Software</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={item.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={item.category === 'Fitness'} />
                            <label htmlFor="category4">Furniture</label>
                        </div>
                    </div>
                </div>

                <div className="p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="price">Price</label>
                        <InputNumber id="price" value={item.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="quantity">Quantity</label>
                        <InputNumber id="quantity" value={item.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                    </div>
                </div>
            </Dialog> */}

            <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {item && <span>Are you sure you want to delete <b>{item.name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteItemsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemsDialogFooter} onHide={hideDeleteItemsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {item && <span>Are you sure you want to delete the selected Items?</span>}
                </div>
            </Dialog>
            
            <Dialog visible={decommissionDialog} style={{ width: '450px'}} header="Transfer Details" modal className="p-fluid" footer={ItemDialogFooter} onHide={hideDialog}>
           
            <Accordion  style={{paddingBottom:'20px'}}>
                    <AccordionTab header="Inventory name">
                        <p>I2637</p>
                    </AccordionTab>
                    <AccordionTab header="Total assets">
                        <p>34</p>
                    </AccordionTab>
                    <AccordionTab header="Current owner">
                        <p>Kweku Mante</p>
                    </AccordionTab>
                </Accordion>
          
                <Dropdown value={selectedUser}  options={['Ama','Kojo','Nate']} onChange={onCategoryChange}  placeholder="Select new owner" className="p-column-filter" showClear />
                  
                {/* <span className="p-fluid">
                <AutoComplete value={selectedUser} suggestions={['ama,kofi']} completeMethod={searchUsers} field="name" multiple onChange={(e) => setSelectedUser(e.value)} />
                    </span> */}

                <Accordion  style={{paddingBottom:'20px'}}>
                    <AccordionTab header="Asset name">
                        <p>HP Laptop</p>
                    </AccordionTab>
                    <AccordionTab header="Asset code">
                        <p>AITI2345</p>
                    </AccordionTab>
                    <AccordionTab header="Serial number">
                        <p>CG3H4J3K</p>
                    </AccordionTab>
                    <AccordionTab header="Make">
                        <p>CG3H4J3K</p>
                    </AccordionTab>
                    <AccordionTab header=Branches>
                        <p>Bolgatanga</p>
                    </AccordionTab>
                    <AccordionTab header="Department">
                        <p>Consultancy</p>
                    </AccordionTab>
                    <AccordionTab header="Vendor">
                        <p>HP</p>
                    </AccordionTab>
                    <AccordionTab header="Date Assigned">
                        <p>03/04/2020</p>
                    </AccordionTab>
                    <AccordionTab header="Assigned to">
                        <p>Mandy Ama</p>
                    </AccordionTab>
                    <AccordionTab header="Description">
                        <p>recently purchased laptop for Research and Innovation Department</p>
                    </AccordionTab>
                </Accordion>
          
                <Dropdown value={selectedUser}  options={['Ama','Kojo','Nate']} onChange={onCategoryChange}  placeholder="Change assignee" className="p-column-filter" showClear />
                    
               
            </Dialog>
       
        </div>
  </div>
  );
}