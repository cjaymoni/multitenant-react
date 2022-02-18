import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CardDemo from '../../../../shared/components/card/CardDemo';
import { fetchAssets } from '../../../../shared/redux/actions/assetActions';
import {
  getUpcomingAppointments,
  selectAsset,
  selectPod,
  selectItemIds,
  makeSelectItemsByCategory,
} from '../../../../shared/redux/selectors/assetSelectors';

class ForwardedProposals extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAssets();
    console.log(this.props.assetList, 'this is it');
  }

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
          <div className="cardFstyle">
            <div className="flex ">
              <CardDemo
                title="Total Assets"
                icon="pi pi-shopping-cart"
                color="#cae6fc"
                iconColor="#2196f3"
                update="1"
                content="3"
              ></CardDemo>
            </div>
            <div className="flex ">
              <CardDemo
                title="Total Inventory"
                icon="pi pi-shopping-cart"
                color="#e7cbec"
                iconColor="#9c27b0"
                update="1"
                content="4"
              ></CardDemo>
            </div>
            <div className="flex ">
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
        </div>

        {JSON.stringify(this.props.assetList, null, 2)}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  assetList: makeSelectItemsByCategory('A4'),
});
export default connect(mapStateToProps, {
  fetchAssets,
})(ForwardedProposals);
