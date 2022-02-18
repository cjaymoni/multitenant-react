import { Divider } from 'primereact/divider';
import { TabPanel, TabView } from 'primereact/tabview';
import React, { Component } from 'react';
import CardDemo from '../../../../shared/components/card/CardDemo';
import ExpandableTable from '../../../../shared/components/Table/ExpandableTable';
import {
  assetColumns,
  categoryColumns,
  inventoryColumns,
  locationColumns,
} from './const';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategories } from '../../../../shared/redux/actions/categoryActions';
import { fetchAssets } from '../../../../shared/redux/actions/assetActions';
import { fetchLocation } from '../../../../shared/redux/actions/locationActions';
import { fetchInventories } from '../../../../shared/redux/actions/inventoryActions';

class Aggregation extends Component {
  render() {
    return (
      <>
        <div>
          <h2
            className="p-mb-3 p-text-bold"
            style={{ marginLeft: '20px', color: '#495057' }}
          >
            Tenant's Aggregation
          </h2>
          <br></br>
          <div className="p-grid p-justify-between cardFstyle">
            <div className="p-col-12 p-md-6 p-lg-3">
              <CardDemo
                title="Total Assets"
                icon="pi pi-shopping-cart"
                color="#cae6fc"
                iconColor="#2196f3"
                update="1"
                content="3"
              ></CardDemo>
            </div>
            <div className="p-col-12 p-md-6 p-lg-3">
              <CardDemo
                title="Total Inventory"
                icon="pi pi-shopping-cart"
                color="#e7cbec"
                iconColor="#9c27b0"
                update="1"
                content="4"
              ></CardDemo>
            </div>
            <div className="p-col-12 p-md-6 p-lg-3">
              <CardDemo
                title="Total Decommisioned"
                icon="pi pi-shopping-cart"
                content="4"
                update="1"
                color="#fde0c2"
                iconColor="#f57c00"
              ></CardDemo>
            </div>
          </div>

          <br></br>

          <Divider style={{ width: '82vw' }}></Divider>

          <TabView
            style={{
              backgroundColor: 'aliceblue',
              width: '82vw',
              marginLeft: '12px',
              color: 'black',
            }}
          >
            <TabPanel header="Assets">
              <div>
                <ExpandableTable
                  mainColumns={locationColumns}
                  exColumns={assetColumns}
                  fetchFunction={this.props.fetchLocation}
                  fetchFunction1={this.props.fetchAssets}
                  subtitle="Assets"
                ></ExpandableTable>
              </div>
            </TabPanel>
            <TabPanel header="Inventories">
              <ExpandableTable
                mainColumns={locationColumns}
                exColumns={inventoryColumns}
                fetchFunction={this.props.fetchLocation}
                fetchFunction1={this.props.fetchInventories}
                subtitle="Inventories"
              ></ExpandableTable>
            </TabPanel>
            <TabPanel header="Decommissioned">
              <ExpandableTable
                mainColumns={locationColumns}
                exColumns={assetColumns}
                fetchFunction={this.props.fetchLocation}
                fetchFunction1={this.props.fetchAssets}
                subtitle="Decommissioned Assets"
              ></ExpandableTable>
            </TabPanel>
          </TabView>
        </div>
      </>
    );
  }
}

Aggregation.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  fetchAssets: PropTypes.func.isRequired,
  fetchLocation: PropTypes.func.isRequired,
  fetchInventories: PropTypes.func.isRequired,
};

export default connect(null, {
  fetchCategories,
  fetchAssets,
  fetchLocation,
  fetchInventories,
})(Aggregation);
