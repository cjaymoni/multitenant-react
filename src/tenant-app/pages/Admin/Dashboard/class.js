import React,{ Component } from "react";
import CardDemo from "../../../components/card/CardDemo";
import {connect} from 'react-redux'
import {fetchtestAssets} from '../../../shared/redux/actions/assetActions'
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link} from 'react-router-dom';
import { DataScroller } from "primereact/datascroller";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state ={
            toggler:false,
            toggler1:false

        }
        this.toggle = this.toggle.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }
    toggle(toggler) {
        let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
        this.setState({
            [toggler]: !togglerStatus // change the status only for the toggle you clicked
        });
    }
  
      handleClose(){
        this.setState({toggler:false});
        this.setState({toggler1:false});

             
    }
    componentDidMount(){
        this.props.fetchtestAssets();
      
    }
    
    formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }


    priceBodyTemplate = (rowData) => {
        return this.formatCurrency(rowData.price);
    }


    statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    itemTemplate = (postItems) => {
        return (
          <div className="product-item">
            <div className="product-detail">
              {/* <div className="product-name">{data.name}</div> */}
              <div className="product-description">{postItems.description}</div>
              {/* <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.category}</span> */}
            </div>
            <div className="product-action">
              <span className={`overview-badge status-${postItems.overviewStatus}`}>
                {postItems.overviewStatus}
              </span>
            </div>
          </div>
        );
      };
    
    mainHeader = (
        <div className="table-header">
            New Assets
        </div>
    );

    previewHeader = (
        <div className="table-header">
            Quick details
        </div>
    );
   

 render(){
    const postItems = this.props.tassets
    const footer = `In total there are ${postItems ? postItems.length : 0} new assets.`;

     return(
        <div>
       
        <h2 className="p-mb-3 p-text-light" style={{marginLeft:"20px"}}>Overview</h2>
        
        <div className="p-grid p-justify-between" style={{marginLeft:"10px" }}>
        <div className="p-col-1">
        <Link to={'/asset'} style={{textDecoration:'none'}}>  
        <CardDemo title="Total assets" icon="pi pi-shopping-cart" content={postItems.length}  >
        </CardDemo>
        </Link>
        </div>
    
        <div className="p-col-1">
        <Link to={'/requestlist'} style={{textDecoration:'none'}}>
        <CardDemo title="Total requests" icon="pi pi-folder-open" content="24"></CardDemo>
        </Link>
        </div>
    
        <div className="p-col-1">
        <Link to={'/inventory'} style={{textDecoration:'none'}}>
        <CardDemo title="Total inventory" icon="pi pi-bookmark" content="55"></CardDemo>
        </Link>
        </div>
        </div>
    
        <div className="p-grid">
        <div className="datatable-templating-demo">
                            <div className="table-header">

                      
                   <DataTable value={postItems} header={this.mainHeader} footer={footer} style={{width:'50vw', marginLeft:'25px'}}>
                    <Column field="center_code" header="Asset Code"></Column>
                        <Column field="asset_name" header="Item"></Column>
                        <Column field="category" header="Category"></Column>
                        <Column field="sub_location" header="Location"></Column>
                        {/* <Column header="Availability" body={statusBodyTemplate}></Column>  */}
                      <Column field="price" header="Price" body={this.priceBodyTemplate}></Column> 
                    </DataTable>  
                </div>
            </div>
            <div className="datascroller-demo">
          <div className="card" style={{ marginLeft: "18px", width: "22vw" }}>
            <DataScroller
              value={postItems}
              itemTemplate={this.itemTemplate}
              rows={5}
              header="Quick details"
              inline
              scrollHeight="50vh"
              className="p-shadow-3"
            />
          </div>
        </div>
        </div>
      </div>   
     )
 }
}
Dashboard.propTypes ={
    fetchtestAssets: PropTypes.func.isRequired,
    tassets: PropTypes.array.isRequired,
}
const mapStateToProps = state =>({
    tassets : state.assets.titems,
});
export default connect(mapStateToProps, {fetchtestAssets})(Dashboard);