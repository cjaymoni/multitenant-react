import React, { useState } from "react";

import { Button } from "primereact/button";
import { connect } from "react-redux";
import { AssSchema } from "../../../../shared/utils/validation";
import { FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { AutoCompleteDemo } from "../../../../shared/components/autocomplete/AutoComplete";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { fetchInventories } from "../../../../shared/redux/actions/inventoryActions";
import { fetchCategories } from "../../../../shared/redux/actions/categoryActions";
import { fetchVendors } from "../../../../shared/redux/actions/vendorActions";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { createAsset } from "../../../../shared/redux/actions/assetActions";
import { fetchCurrencies } from "../../../../shared/redux/actions/currencyActions";

const DynamicForm = (props) => {
  const [blockWar, setBlockWar] = useState(true);
  const [blockSer, setBlockSer] = useState(true);
  const monthNavigatorTemplate = (e) => {
    return (
      <Dropdown
        className="mr-1"
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        style={{ lineHeight: 1 }}
      />
    );
  };

  const yearNavigatorTemplate = (e) => {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        className="p-ml-2"
        style={{ lineHeight: 1 }}
      />
    );
  };
  const depreciationOptions = [
    {
      label: "Straight Line Depreciation",
      value: "straight_line_depreciation",
    },
    {
      label: "Declining Balance Depreciation",
      value: "declining_balance_depreciation",
    },
  ];
  const formik = useFormik({
    initialValues: {
      code: "",
      make: "",
      title: "",
      model: "",
      price: "",
      lifespan: "",
      serial_number: "",
      dep_factor: "",
      description: "",
      salvage_price: "",
      purchase_date: "",
      warranty_deadline: "",
      service_date: "",
      purchase_order_number: "",
      depreciation_algorithm: "",
      category_ids: "",
      currency_id: "",
      vendor_id: "",
      inventory_id: "",
    },

    onSubmit: (values) => {
      // console.log(values);
      formik.setErrors();
      // if (formik.errors) {
      //   alert("Please fill all the required fields");
      // }
    },

    validationSchema: AssSchema,
    validateOnChange: true,
  });

  const sub = () => {
    // formik.setErrors();

    const postData = {
      make: formik.values.make,
      code: formik.values.code,
      title: formik.values.title,
      model: formik.values.model,
      price: formik.values.price,
      author_id: props.user.id,
      vendor_id: formik.values.vendor_id.id,
      inventory_id: formik.values.inventory_id.id,
      currency_id: formik.values.currency_id.id,
      lifespan: formik.values.lifespan,
      dep_factor: formik.values.dep_factor,
      description: formik.values.description,
      serial_number: formik.values.serial_number,
      salvage_price: formik.values.salvage_price,
      category_ids: [formik.values.category_ids.id],
      service_date: formik.values.service_date / 1000,
      purchase_date: formik.values.purchase_date / 1000,
      warranty_deadline: formik.values.warranty_deadline / 1000,
      depreciation_algorithm: formik.values.depreciation_algorithm,
      purchase_order_number: formik.values.purchase_order_number,
    };

    // if (Object.keys(formik.errors).length !== 0) {
    // if (typeof formik.errors !== "undefined") {
    //   alert("Please fill all the required fields");
    //   console.log(typeof formik.errors, formik.values);
    // } else {
    //   console.log(typeof formik.errors);
    //   props.createAsset(jsonToFormData(postData));
    // }
    if (
      formik.errors === undefined ||
      Object.keys(formik.errors).length === 0
    ) {
      props.createAsset(postData);
    } else {
      console.log("error occured");

      //   alert("Please fill all the required fields");
      console.log(formik);
    }
  };

  return (
    <FormikProvider value={formik}>
      <form
        style={{ width: "80vw", marginLeft: "20px" }}
        onSubmit={(e) => {
          formik.isValid ? formik.handleSubmit(e) : e.preventDefault();
        }}
      >
        <div className="grid w-full" formik={formik}>
          {/* name */}
          <div className="field col-4">
            <label htmlFor="" className=" font-normal mb-2 block">
              Asset Name
            </label>
            <Field name="title">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  <InputText
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Asset Name"
                    value={formik.values.title}
                    tooltip="Name of Asset"
                    className="w-full"
                    tooltipOptions={{ position: "bottom" }}
                    onChange={(event) => formik.handleChange(event, "title")}
                    {...field}
                  />
                  <small id="username1-help" className="block">
                    eg: Lenovo Monitor
                  </small>
                  {meta.touched && meta.error && (
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="error-message mt-1"
                    />
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* code */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Asset Code
            </label>
            <Field name="code">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  <InputText
                    id="code"
                    name="code"
                    type="text"
                    value={formik.values.code}
                    placeholder="Asset Code"
                    tooltip="Unique organization's code for asset"
                    className="w-full"
                    tooltipOptions={{ position: "bottom" }}
                    onChange={(event) => formik.handleChange(event, "code")}
                    {...field}
                  />
                  <small id="username1-help" className="block">
                    eg: AITI-UEU32
                  </small>
                  {meta.touched && meta.error && (
                    <ErrorMessage
                      name="code"
                      component="div"
                      className="error-message mt-1"
                    />
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* serial_number */}
          <div className="field col-4 ">
            <label htmlFor="" className="block font-normal mb-2">
              Serial Number
            </label>
            <Field name="serial_number">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  <InputText
                    id="serial_number"
                    name="serial_number"
                    value={formik.values.serial_number}
                    type="text"
                    placeholder="Serial Number"
                    tooltip="Unique serial number"
                    className="w-full"
                    tooltipOptions={{ position: "bottom" }}
                    onChange={(event) =>
                      formik.handleChange(event, "serial_number")
                    }
                    {...field}
                  />
                  <small id="username1-help" className="block">
                    eg: 9BTYA1
                  </small>
                  {meta.touched && meta.error && (
                    <ErrorMessage
                      name="serial_number"
                      component="div"
                      className="error-message mt-1"
                    />
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* model */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Model
            </label>
            <Field name="model">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also formik.values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  <InputText
                    id="model"
                    name="model"
                    type="text"
                    value={formik.values.model}
                    placeholder="Model"
                    tooltip="Model of asset"
                    className="w-full"
                    tooltipOptions={{ position: "bottom" }}
                    onChange={(event) => formik.handleChange(event, "model")}
                    {...field}
                  />
                  <small id="username1-help" className="block">
                    eg: LN-123
                  </small>
                  {meta.touched && meta.error && (
                    <ErrorMessage
                      name="model"
                      component="div"
                      className="error-message mt-1"
                    />
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* make */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Make
            </label>
            <Field name="make">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also formik.values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  <InputText
                    type="text"
                    name="make"
                    value={formik.values.make}
                    placeholder="Make"
                    tooltip="Make of asset"
                    className="w-full"
                    tooltipOptions={{ position: "bottom" }}
                    onChange={(event) => formik.handleChange(event, "make")}
                    {...field}
                  />
                  <small id="username1-help" className="block">
                    eg: Lenovo
                  </small>
                  {meta.touched && meta.error && (
                    <ErrorMessage
                      name="make"
                      component="div"
                      className="error-message mt-1"
                    />
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* price */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Price
            </label>

            <InputNumber
              showButtons
              name="price"
              mode="decimal"
              minFractionDigits={2}
              min={1.0}
              inputId="stacked"
              value={formik.values.price}
              tooltip="Price asset was bought"
              className="w-full"
              inputClassName="w-full"
              onValueChange={(event) => {
                let change = {
                  target: {
                    name: "price",
                    value: event.value,
                  },
                };
                formik.handleChange(change);
              }}
              tooltipOptions={{ position: "bottom" }}
            />
            <small id="username1-help" className="block">
              eg: 500
            </small>
          </div>

          {/* purchase_date */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Purchase Date
            </label>
            <Field name="purchase_date">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also formik.values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  <Calendar
                    name="purchase_date"
                    value={formik.values.purchase_date}
                    onChange={(event) => {
                      formik.handleChange(event, "purchase_date");
                    }}
                    onSelect={async (event) => {
                      await setBlockWar(false);
                      return console.log(blockWar);
                    }}
                    monthNavigator
                    yearNavigator
                    dateFormat="dd/mm/yy"
                    yearRange="2010:2050"
                    monthNavigatorTemplate={monthNavigatorTemplate}
                    yearNavigatorTemplate={yearNavigatorTemplate}
                    maxDate={new Date()}
                    showIcon
                    className="w-full"
                    placeholder="Purchase Date"
                    tooltipOptions={{ position: "bottom" }}
                    tooltip="Date asset was bought"
                    {...field}
                  />
                  <small id="username1-help" className="block">
                    eg: 01/01/2020
                  </small>
                  {meta.touched && meta.error && (
                    <ErrorMessage
                      name="purchase_date"
                      component="div"
                      className="error-message mt-1"
                    />
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* warranty_deadline */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Warranty Deadline
            </label>
            <Field name="warranty_deadline">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also formik.values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  <Calendar
                    minDate={formik.values.purchase_date}
                    id="warranty_deadline"
                    name="warranty_deadline"
                    dateFormat="dd/mm/yy"
                    showIcon
                    value={formik.values.warranty_deadline}
                    onChange={(event) =>
                      formik.handleChange(event, "warranty_deadline")
                    }
                    disabled={blockWar}
                    onSelect={async (event) => {
                      await setBlockSer(false);
                      return console.log(blockSer);
                    }}
                    monthNavigator
                    yearNavigator
                    yearRange="2010:2050"
                    monthNavigatorTemplate={monthNavigatorTemplate}
                    yearNavigatorTemplate={yearNavigatorTemplate}
                    placeholder="Warranty Deadline"
                    className="w-full"
                    tooltipOptions={{ position: "bottom" }}
                    tooltip="Date warranty ends"
                    {...field}
                  />
                  <small id="username1-help" className="block">
                    eg: 01/01/2020
                  </small>
                  {meta.touched && meta.error && (
                    <ErrorMessage
                      name="warranty_deadline"
                      component="div"
                      className="error-message mt-1"
                    />
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* service date */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Service Date
            </label>
            <Field name="service_date">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also formik.values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  <Calendar
                    id="service_date"
                    dateFormat="dd/mm/yy"
                    minDate={formik.values.purchase_date}
                    maxDate={formik.values.warranty_deadline}
                    name="service_date"
                    value={formik.values.service_date}
                    onChange={(event) =>
                      formik.handleChange(event, "service_date")
                    }
                    disabled={blockSer}
                    monthNavigator
                    yearNavigator
                    yearRange="2010:2050"
                    monthNavigatorTemplate={monthNavigatorTemplate}
                    yearNavigatorTemplate={yearNavigatorTemplate}
                    showIcon
                    className="w-full"
                    placeholder="Service Date"
                    tooltipOptions={{ position: "bottom" }}
                    tooltip="Date required for servicing asset"
                    {...field}
                  />
                  <small id="username1-help" className="block">
                    eg: 01/01/2020
                  </small>
                  {meta.touched && meta.error && (
                    <ErrorMessage
                      name="service_date"
                      component="div"
                      className="error-message mt-1"
                    />
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* order number */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Purchase Order Number
            </label>
            <Field name="purchase_order_number">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also formik.values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  <InputText
                    id="purchase_order_number"
                    name="purchase_order_number"
                    type="text"
                    value={formik.values.purchase_order_number}
                    placeholder="Purchase Order Number"
                    tooltip="Purchase Order Number of asset"
                    className="w-full"
                    tooltipOptions={{ position: "bottom" }}
                    onChange={(event) =>
                      formik.handleChange(event, "purchase_order_number")
                    }
                    {...field}
                  />
                  <small id="username1-help" className="block">
                    eg: L-123
                  </small>
                  {meta.touched && meta.error && (
                    <ErrorMessage
                      name="purchase_order_number"
                      component="div"
                      className="error-message mt-1"
                    />
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* currecy */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Currency
            </label>
            <AutoCompleteDemo
              isFormik="currency"
              handleChange={formik.handleChange}
              name="currency_id"
              value={formik.values.currency_id}
              tooltip="Currency"
              placeholder="Currency"
              fetchFunction={props.fetchCurrencies}
            />
            <small id="username1-help" className="block">
              eg: Ghana Cedi(GHS)
            </small>
          </div>

          {/* lifespan */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Lifespan
            </label>

            <InputNumber
              min={1}
              id="lifespan"
              name="lifespan"
              inputId="stacked"
              value={formik.values.lifespan}
              onValueChange={(event) => {
                let change = {
                  target: {
                    name: "lifespan",
                    value: event.value,
                  },
                };
                formik.handleChange(change);
              }}
              tooltipOptions={{ position: "bottom" }}
              showButtons
              inputClassName="w-full"
              className="w-full"
              tooltip="Estimated usage span of asset in years"
            />
            <small id="username1-help" className="block">
              eg: 2
            </small>
          </div>

          {/* inventory */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Inventory Name
            </label>
            <AutoCompleteDemo
              isFormik="true"
              name="inventory_id"
              placeholder="Inventory Name"
              tooltip="Name of asset's inventory"
              value={formik.values.inventory_id}
              handleChange={formik.handleChange}
              fetchFunction={props.fetchInventories}
            />
            <small id="username1-help" className="block">
              eg: Store Inventory
            </small>
          </div>

          {/* salvage_amount */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Salvage Price
            </label>

            <InputNumber
              id="salvage_price"
              name="salvage_price"
              mode="decimal"
              minFractionDigits={2}
              min={1.0}
              inputId="stacked"
              value={formik.values.salvage_price}
              onValueChange={(event) => {
                let change = {
                  target: {
                    name: "salvage_price",
                    value: event.value,
                  },
                };
                formik.handleChange(change);
              }}
              showButtons
              inputClassName="w-full"
              className="w-full"
              tooltipOptions={{ position: "bottom" }}
              tooltip="Estimated price after depreciation is complete"
            />
            <small id="username1-help" className="block">
              eg: 100
            </small>
          </div>

          {/* depreciation_algorithm */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Depreciation Type
            </label>
            <Field name="depreciation_algorithm">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also formik.values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  <Dropdown
                    name="depreciation_algorithm"
                    showClear
                    options={depreciationOptions}
                    value={formik.values.depreciation_algorithm}
                    onChange={(selectedOption) => {
                      let event = {
                        target: {
                          name: "depreciation_algorithm",
                          value: selectedOption.value,
                        },
                      };
                      formik.handleChange(event);
                    }}
                    className="w-full"
                    placeholder="Depreciation Type"
                    tooltipOptions={{ position: "bottom" }}
                    tooltip="Asset's depreciation type"
                    {...field}
                  />
                  <small id="username1-help" className="block">
                    eg: Straight Line Depreciation
                  </small>

                  {meta.touched && meta.error && (
                    <ErrorMessage
                      name="depreciation_algorithm"
                      component="div"
                      className="error-message mt-1"
                    />
                  )}
                </div>
              )}
            </Field>
          </div>

          {/* dep_factor */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Depreciation Rate
            </label>

            <InputNumber
              name="dep_factor"
              id="dep_factor"
              min={1}
              inputId="stacked"
              value={formik.values.dep_factor}
              onValueChange={(event) => {
                let change = {
                  target: {
                    name: "dep_factor",
                    value: event.value,
                  },
                };
                formik.handleChange(change);
              }}
              showButtons
              inputClassName="w-full"
              className="w-full"
              tooltipOptions={{ position: "bottom" }}
              tooltip="Percentage of asset depreciation"
            />
            <small id="username1-help" className="block">
              eg: 5
            </small>
          </div>

          {/* Category */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Category Name
            </label>
            <AutoCompleteDemo
              isFormik="true"
              handleChange={formik.handleChange}
              name="category_ids"
              tooltip="Category group of asset"
              placeholder="Category Name"
              fetchFunction={props.fetchCategories}
              value={formik.values.category_ids}
            />
            <small id="username1-help" className="block">
              eg: Hardware
            </small>
          </div>

          {/* supplier */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Supplier Name
            </label>
            <AutoCompleteDemo
              isFormik="true"
              handleChange={formik.handleChange}
              name="vendor_id"
              value={formik.values.vendor_id}
              tooltip="Where the asset was bought from"
              placeholder="Supplier Name"
              fetchFunction={props.fetchVendors}
            />
            <small id="username1-help" className="block">
              eg: Lenovo Ghana
            </small>
          </div>

          {/* description */}
          <div className="field col-4">
            <label htmlFor="" className="block font-normal mb-2">
              Description
            </label>
            <Field name="description">
              {({
                field, // { name, value, onChange, onBlur }
                form, // also formik.values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => (
                <div>
                  <InputTextarea
                    name="description"
                    className="w-full"
                    value={formik.values.description}
                    onChange={(event) =>
                      formik.handleChange(event, "description")
                    }
                    placeholder="Item Description"
                    tooltipOptions={{ position: "bottom" }}
                    tooltip="Brief description about item"
                    {...field}
                  />
                  <small id="username1-help" className="block">
                    eg: Desktop PC Monitor
                  </small>

                  {meta.touched && meta.error && (
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="error-message mt-1"
                    />
                  )}
                </div>
              )}
            </Field>
          </div>
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
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  fetchCategories,
  fetchVendors,
  fetchInventories,
  createAsset,
  fetchCurrencies,
})(DynamicForm);
