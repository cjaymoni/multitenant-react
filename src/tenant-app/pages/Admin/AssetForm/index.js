import React, { Component } from 'react';
import { AssSchema } from '../../../../shared/utils/validation';
import DynamicForm from './Container';
import { Dropdown } from 'primereact/dropdown';
import { nonReturnableFields, Returnablefields } from './const';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchInventories } from '../../../../shared/redux/actions/inventoryActions';
import { fetchDepartments } from '../../../../shared/redux/actions/departmentActions';
import { fetchCategories } from '../../../../shared/redux/actions/categoryActions';
import { fetchVendors } from '../../../../shared/redux/actions/vendorActions';
class AssetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: '',
      showreturnable: true,
      shownonreturn: false,
    };
    this.hideComponent = this.hideComponent.bind(this);
    this.formType = [
      { label: 'Returnable', value: 'showreturnable' },
      { label: 'Non-Returnable', value: 'shownonreturn' },
    ];
  }

  componentDidMount() {
    this.props.fetchInventories();
    this.props.fetchCategories();
    this.props.fetchDepartments();
    this.props.fetchVendors();
  }

  hideComponent(name, e) {
    switch (name) {
      case 'showreturnable':
        this.setState({
          showreturnable: !this.state.showreturnable,
          selectedType: e.value,
          shownonreturn: false,
        });
        break;
      case 'shownonreturn':
        this.setState({
          shownonreturn: !this.state.shownonreturn,
          selectedType: e.value,
          showreturnable: false,
        });
        break;
      default:
        this.setState({ showreturnable: false, shownonreturn: false });
    }
  }

  render() {
    const { showreturnable, shownonreturn } = this.state;
    return (
      <>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: '20px', color: '#495057' }}
        >
          Add Asset
        </h2>
        <Divider style={{ width: '82vw' }} />
        <div style={{ marginLeft: '20px' }}>
          <h4 className="block font-normal mb-2">Select Asset Type</h4>

          <Dropdown
            value={this.state.selectedType}
            style={{ width: '250px' }}
            options={this.formType}
            onChange={e => this.hideComponent(e.value, e)}
            optionLabel="label"
            placeholder="Select Asset Type"
          />
          {/* 
        <div style={{float:"right"}}>
          <Button form='assetform' icon="pi pi-plus"  label='Asset'></Button>
        </div> */}
        </div>
        <Divider style={{ width: '82vw' }} />
        <div style={{ marginLeft: '20px' }}>
          {showreturnable && (
            <>
              <DynamicForm assetType="returnable"></DynamicForm>
            </>
          )}

          {shownonreturn && (
            <>
              <DynamicForm assetType="nonreturnable"></DynamicForm>
            </>
          )}
        </div>
      </>
    );
  }
}

AssetForm.propTypes = {
  fetchInventories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  inventories: state.inventories.inventories,
});

export default connect(mapStateToProps, {
  fetchInventories,
  fetchCategories,
  fetchDepartments,
  fetchVendors,
})(AssetForm);
