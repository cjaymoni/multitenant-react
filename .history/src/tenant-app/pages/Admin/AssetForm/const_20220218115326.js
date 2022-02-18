import store from '../../../../shared/redux/store/store'
import { connect } from 'react-redux';

// const tInvent =  store.getState().inventories.inventories.map(i=>({label:i.title, value:i.id}))
// const ipam = tInvent.map(i=>({label:i.title, value:i.id}))

export const Returnablefields =
  [
    {label: 'Asset Name', type: 'text', name: 'title', value: '',tooltip:'Name of Asset'},
    {label: 'Asset code', type: 'text', name: 'code', value: '',tooltip:`Unique organization's code for asset`},
    {label: 'Serial Number', type: 'text', name: 'serial_number', value: '',tooltip:`Unique serial number`},
    {label: 'Model', type: 'text', name: 'model', value: '',tooltip:`Model of asset`},
    {label: 'Make', type: 'text', name: 'make', value: '',tooltip:`Make of asset`},
    {label: 'Price', type: 'price', name: 'amount', value: '',tooltip:`Amount asset was bought`},
    {label: 'Purchase Date', type: 'date', name: 'purchase_date', value: '',tooltip:`Date asset was bought`},
    {label: 'Warranty Deadline', type: 'date', name: 'warranty_deadline', value: '',tooltip:`Date warranty ends`},
    {label: 'Service Date', type: 'date', name: 'service_date', value: '',tooltip:`Date required for servicing asset`},
    {label: 'Lifespan', type: 'number', name: 'lifespan', value: '',tooltip:`Estimated usage span of asset`},
    {label: 'Inventory Name', type: 'select', name: 'inventory_name', value: '',function:'inventories',tooltip:`Name of asset's inventory`,data :[
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
  ]},
    {label: 'Department ', type: 'select', name: 'department', value: '',tooltip:`Department where asset can be located`,data :[
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
  ]},
    {label: 'Salvage Amount ', type: 'price', name: 'salvage_amount', value: '',tooltip:` Estimated value after depreciation is complete`},
    {label: 'Depreciation Type', type: 'select', name: 'dep_algorithm', value: '',tooltip:`Asset's depreciation type`,data :[
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
  ]},
    {label: 'Depreciation rate', type: 'number', name: 'dep_factor', value: '',tooltip:`Percentage of asset depreciation`},
    {label: 'Category', type: 'select', name: 'category', value: '',tooltip:`Category group of asset`,data :[
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
  ]},
  {label: 'Vendor', type: 'select', name: 'vendor', value: '',tooltip:`Where the asset was bought from`,data :[
    { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
  ],},
  {label: 'Description ', type: 'textarea', name: 'description', value: '',tooltip:`Brief description about asset`}

    //  { label: 'Agree to Terms & Conditions', type: 'checkbox', name: 'terms', value: false, },
      ]
    

// export const nonReturnableFields =[
//     {label: 'Asset Name', type: 'input', name: 'title', value: '',tooltip:`Name of Asset`},
//     {label: 'Asset code', type: 'input', name: 'code', value: '',tooltip:`Unique organization's code for asset`},
//     {label: 'Serial Number', type: 'input', name: 'serial_number', value: '',tooltip:`Unique serial number`},
//     {label: 'Model', type: 'input', name: 'model', value: '',tooltip:`Model of asset`},
//     {label: 'Make', type: 'input', name: 'make', value: '',tooltip:`Make of asset`},
//     {label: 'Price', type: 'price', name: 'amount', value: '',tooltip:`Amount asset was bought`},
//     {label: 'Purchase Date', type: 'date', name: 'purchase_date', value: '',tooltip:`Date asset was bought`},
//     {label: 'Warranty Deadline', type: 'date', name: 'warranty_deadline', value: '',tooltip:`Date warranty ends`},
//     {label: 'Service Date', type: 'date', name: 'service_date', value: '',tooltip:`Date required for servicing asset`},
//     {label: 'Lifespan', type: 'number', name: 'lifespan', value: '',tooltip:`Estimated usage span of asset`},
//     {label: 'Inventory Name', type: 'select', name: 'inventory_name', value: '',tooltip:`Name of asset's inventory`},
//     {label: 'Department ', type: 'select', name: 'department', value: '',tooltip:`Department where asset can be located`},
//     {label: 'Salvage Amount ', type: 'price', name: 'salvage_amount', value: '',tooltip:` Estimated value after depreciation is complete`},
//     {label: 'Depreciation Type', type: 'select', name: 'dep_algorithm', value: '',tooltip:`Asset's depreciation type`},
//     {label: 'Depreciation rate', type: 'number', name: 'dep_factor', value: '',tooltip:`Percentage of asset depreciation`},
//     {label: 'Category', type: 'select', name: 'category', value: '',tooltip:`Category group of asset`,data :[
//       { value: 'chocolate', label: 'Chocolate' },
//       { value: 'strawberry', label: 'Strawberry' },
//       { value: 'vanilla', label: 'Vanilla' }
//   ]},
//     {label: 'Vendor', type: 'select', name: 'vendor', value: '',tooltip:`Where the asset was bought from`,data :[
//       { value: 'chocolate', label: 'Chocolate' },
//       { value: 'strawberry', label: 'Strawberry' },
//       { value: 'vanilla', label: 'Vanilla' }
//   ],},
//     {label: 'Quantity', type: 'number', name: 'quantity', value: '',tooltip:`Total number of asset`},
//     {label: 'Description ', type: 'textarea', name: 'description', value: '',tooltip:`Brief description about asset`}
   


// ]


// const mapStateToProps = (state) => ({
//   inventories:state.inventories.inventories,
// });

// export default connect(mapStateToProps, null)(Returnablefields);