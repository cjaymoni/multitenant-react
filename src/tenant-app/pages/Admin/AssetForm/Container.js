import React from 'react';
import { FormikProvider, useFormik } from 'formik';
// import response from "./apiresponse"
import RecursiveContainer from './RecursiveContainer';
import * as yup from 'yup';
// import {Returnablefields}  from './const';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import {
  AssetSchema,
  AssSchema,
  jsonToFormData,
} from '../../../../shared/utils/validation';
import PropTypes from 'prop-types';
import { fetchInventories } from '../../../../shared/redux/actions/inventoryActions';
import { fetchDepartments } from '../../../../shared/redux/actions/departmentActions';
import { fetchCategories } from '../../../../shared/redux/actions/categoryActions';
import { fetchVendors } from '../../../../shared/redux/actions/vendorActions';

import { createAsset } from '../../../../shared/redux/actions/assetActions';
const DynamicForm = props => {
  const depreciationOptions = [
    {
      label: 'Straight Line Depreciation',
      value: 'straight_line_depreciation',
    },
    {
      label: 'Declining Balance Depreciation',
      value: 'declining_balance_depreciation',
    },
  ];

  const Returnablefields = [
    {
      label: 'Asset Name',
      type: 'text',
      name: 'title',
      value: '',
      tooltip: 'Name of Asset',
    },
    {
      label: 'Asset code',
      type: 'text',
      name: 'code',
      value: '',
      tooltip: `Unique organization's code for asset`,
    },
    {
      label: 'Serial Number',
      type: 'text',
      name: 'serial_number',
      value: '',
      tooltip: `Unique serial number`,
    },
    {
      label: 'Model',
      type: 'text',
      name: 'model',
      value: '',
      tooltip: `Model of asset`,
    },
    {
      label: 'Make',
      type: 'text',
      name: 'make',
      value: '',
      tooltip: `Make of asset`,
    },
    {
      label: 'Price',
      type: 'price',
      name: 'amount',
      value: '',
      tooltip: `Amount asset was bought`,
    },
    {
      label: 'Purchase Date',
      type: 'date',
      name: 'purchase_date',
      value: '',
      tooltip: `Date asset was bought`,
    },
    {
      label: 'Warranty Deadline',
      type: 'date',
      name: 'warranty_deadline',
      value: '',
      tooltip: `Date warranty ends`,
    },
    {
      label: 'Service Date',
      type: 'date',
      name: 'service_date',
      value: '',
      tooltip: `Date required for servicing asset`,
    },
    {
      label: 'Lifespan',
      type: 'number',
      name: 'lifespan',
      value: '',
      tooltip: `Estimated usage span of asset`,
    },
    {
      label: 'Inventory Name',
      type: 'auto-complete',
      name: 'inventory_id',
      value: '',
      function: props.fetchInventories,
      tooltip: `Name of asset's inventory`,
    },
    {
      label: 'Department ',
      type: 'auto-complete',
      name: 'department',
      function: props.fetchDepartments,
      value: '',
      tooltip: `Department where asset can be located`,
    },
    {
      label: 'Salvage Amount ',
      type: 'price',
      name: 'salvage_amount',
      value: '',
      tooltip: ` Estimated value after depreciation is complete`,
    },
    {
      label: 'Depreciation Type',
      type: 'select',
      name: 'depreciation_algorithm',
      function: depreciationOptions,
      value: '',
      tooltip: `Asset's depreciation type`,
    },
    {
      label: 'Depreciation rate',
      type: 'number',
      name: 'dep_factor',
      value: '',
      tooltip: `Percentage of asset depreciation`,
    },
    {
      label: 'Category',
      type: 'auto-complete',
      name: 'category',
      function: props.fetchCategories,
      value: '',
      tooltip: `Category group of asset`,
    },
    {
      label: 'Vendor',
      type: 'auto-complete',
      name: 'vendor',
      value: '',
      function: props.fetchVendors,
      tooltip: `Where the asset was bought from`,
    },
    {
      label: 'Description ',
      type: 'textarea',
      name: 'description',
      value: '',
      tooltip: `Brief description about asset`,
    },
  ];

  const nonReturnablefields = [
    {
      label: 'Asset Name',
      type: 'text',
      name: 'title',
      value: '',
      tooltip: 'Name of Asset',
    },
    {
      label: 'Asset code',
      type: 'text',
      name: 'code',
      value: '',
      tooltip: `Unique organization's code for asset`,
    },
    {
      label: 'Serial Number',
      type: 'text',
      name: 'serial_number',
      value: '',
      tooltip: `Unique serial number`,
    },
    {
      label: 'Model',
      type: 'text',
      name: 'model',
      value: '',
      tooltip: `Model of asset`,
    },
    {
      label: 'Make',
      type: 'text',
      name: 'make',
      value: '',
      tooltip: `Make of asset`,
    },
    {
      label: 'Price',
      type: 'price',
      name: 'amount',
      value: '',
      tooltip: `Amount asset was bought`,
    },
    {
      label: 'Purchase Date',
      type: 'date',
      name: 'purchase_date',
      value: '',
      tooltip: `Date asset was bought`,
    },
    {
      label: 'Warranty Deadline',
      type: 'date',
      name: 'warranty_deadline',
      value: '',
      tooltip: `Date warranty ends`,
    },
    {
      label: 'Service Date',
      type: 'date',
      name: 'service_date',
      value: '',
      tooltip: `Date required for servicing asset`,
    },
    {
      label: 'Lifespan',
      type: 'number',
      name: 'lifespan',
      value: '',
      tooltip: `Estimated usage span of asset`,
    },
    {
      label: 'Inventory Name',
      type: 'auto-complete',
      name: 'inventory_id',
      value: '',
      function: props.fetchInventories,
      tooltip: `Name of asset's inventory`,
    },
    {
      label: 'Quantity',
      type: 'number',
      name: 'quantity',
      value: '',
      tooltip: `Total number of asset`,
    },
    {
      label: 'Department ',
      type: 'auto-complete',
      name: 'department',
      function: props.fetchDepartments,
      value: '',
      tooltip: `Department where asset can be located`,
    },
    {
      label: 'Salvage Amount ',
      type: 'price',
      name: 'salvage_amount',
      value: '',
      tooltip: ` Estimated value after depreciation is complete`,
    },
    {
      label: 'Depreciation Type',
      type: 'select',
      name: 'depreciation_algorithm',
      function: depreciationOptions,
      value: '',
      tooltip: `Asset's depreciation type`,
    },
    {
      label: 'Depreciation rate',
      type: 'number',
      name: 'dep_factor',
      value: '',
      tooltip: `Percentage of asset depreciation`,
    },
    {
      label: 'Category',
      type: 'auto-complete',
      name: 'category',
      function: props.fetchCategories,
      value: '',
      tooltip: `Category group of asset`,
    },
    {
      label: 'Vendor',
      type: 'auto-complete',
      name: 'vendor',
      value: '',
      function: props.fetchVendors,
      tooltip: `Where the asset was bought from`,
    },
    {
      label: 'Description ',
      type: 'textarea',
      name: 'description',
      value: '',
      tooltip: `Brief description about asset`,
    },
  ];

  const formik = useFormik({
    initialValues: {},
    // onSubmit: values => {
    //   formik.setErrors()
    //   console.log(JSON.stringify(values, null, 2));
    // },
    onSubmit: values => {
      // console.log(values);
      formik.setErrors();
    },

    validationSchema: AssSchema,
    validateOnChange: true,
  });
  // const vvv = formik.values;
  // console.log(vvv);

  const sub = () => {
    formik.setErrors();
    const postData = {
      make: formik.values.make,
      code: formik.values.code,
      title: formik.values.title,
      model: formik.values.model,
      amount: formik.values.amount,
      author_id: props.user.id,
      vendor_id: formik.values.vendor.id,
      inventory_id: formik.values.inventory_id.id,
      department_id: formik.values.department.id,
      lifespan: formik.values.lifespan,
      dep_factor: formik.values.dep_factor,
      description: formik.values.description,
      serial_number: formik.values.serial_number,
      salvage_amount: formik.values.salvage_amount,
      available: 'true',
      category_ids: formik.values.category.id,
      service_date: formik.values.service_date / 1000,
      purchase_date: formik.values.purchase_date / 1000,
      warranty_deadline: formik.values.warranty_deadline / 1000,
      depreciation_algorithm: formik.values.depreciation_algorithm,
      quantity: formik.values.quantity,
      returnable: 'true',
      numerable: 'false',
    };

    props.createAsset(jsonToFormData(postData));
  };

  const nonSub = () => {
    const postData = {
      make: formik.values.make,
      code: formik.values.code,
      title: formik.values.title,
      model: formik.values.model,
      amount: formik.values.amount,
      author_id: props.user.id,
      vendor_id: formik.values.vendor.id,
      inventory_id: formik.values.inventory_id.id,
      department_id: formik.values.department.id,
      lifespan: formik.values.lifespan,
      dep_factor: formik.values.dep_factor,
      description: formik.values.description,
      serial_number: formik.values.serial_number,
      salvage_amount: formik.values.salvage_amount,
      available: 'true',
      category_ids: formik.values.category.id,
      service_date: formik.values.service_date / 1000,
      purchase_date: formik.values.purchase_date / 1000,
      warranty_deadline: formik.values.warranty_deadline / 1000,
      depreciation_algorithm: formik.values.depreciation_algorithm,
      quantity: formik.values.quantity,
      returnable: 'false',
      numerable: 'true',
    };
    // this.props.createAsset(jsonToFormData(postData));
    props.createAsset(jsonToFormData(postData));
  };
  if (props.assetType === 'returnable') {
    return (
      <FormikProvider value={formik}>
        <form
          style={{ width: '80vw' }}
          onSubmit={e => {
            formik.handleSubmit();
            e.preventDefault();
          }}
        >
          <div
            style={{
              display: 'grid',
              width: '78vw',
              flexDirection: 'column',
              gridTemplateColumns: 'repeat(3,1fr)',
            }}
          >
            <RecursiveContainer config={Returnablefields} formik={formik} />
          </div>

          <div className="flex -mt-1 mb-5 justify-content-center align-content-center w-full">
            <Button
              onClick={sub}
              icon="pi pi-plus"
              label="Add New Asset"
              className="w-4"
            ></Button>
          </div>
        </form>
      </FormikProvider>
    );
  } else {
    return (
      <FormikProvider value={formik}>
        <form
          style={{ width: '80vw' }}
          onSubmit={e => {
            formik.handleSubmit();
            e.preventDefault();
          }}
        >
          <div
            style={{
              display: 'grid',
              width: '78vw',
              flexDirection: 'column',
              gridTemplateColumns: 'repeat(3,1fr)',
            }}
          >
            <RecursiveContainer config={nonReturnablefields} formik={formik} />
          </div>

          <div className="flex -mt-1 mb-5 justify-content-center align-content-center w-full">
            <Button
              onClick={nonSub}
              icon="pi pi-plus"
              label="Add New Asset"
              className="w-4"
            ></Button>
          </div>
        </form>
      </FormikProvider>
    );
  }
};

DynamicForm.propTypes = {
  createAsset: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  inventories: state.inventories.inventories,
  departments: state.departments.departments,
  vendors: state.vendors.vendors,
  categories: state.categories.categories,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  createAsset,
  fetchInventories,
  fetchCategories,
  fetchDepartments,
  fetchVendors,
})(DynamicForm);
// export default DynamicForm;
