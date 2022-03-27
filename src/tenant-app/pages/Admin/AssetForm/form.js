import React, { useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { InputText } from "primereact/inputtext";
import { AutoCompleteDemo } from "../../../../shared/components/autocomplete/AutoComplete";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { fetchInventories } from "../../../../shared/redux/actions/inventoryActions";
import { fetchCategories } from "../../../../shared/redux/actions/categoryActions";
import { fetchVendors } from "../../../../shared/redux/actions/vendorActions";
import { connect } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { AssSchema, jsonToFormData } from "../../../../shared/utils/validation";
import { createAsset } from "../../../../shared/redux/actions/assetActions";
import { fetchCurrencies } from "../../../../shared/redux/actions/currencyActions";

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
const initialValues = {
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
};

const Formikform = (props) => {
  const [blockWar, setBlockWar] = useState(true);
  const [blockSer, setBlockSer] = useState(true);
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={AssSchema}
        validateOnChange={true}
        onSubmit={(values) => {
          let it = {
            code: values.code,
            make: values.make,
            title: values.title,
            model: values.model,
            price: values.price,
            lifespan: values.lifespan,
            serial_number: values.serial_number,
            dep_factor: values.dep_factor,
            description: values.description,
            salvage_price: values.salvage_price,
            purchase_date: values.purchase_date / 1000,
            warranty_deadline: values.warranty_deadline / 1000,
            service_date: values.service_date / 1000,
            purchase_order_number: values.purchase_order_number,
            depreciation_algorithm: values.depreciation_algorithm,
            category_ids: values.category_ids.id,
            currency_id: values.currency_id.id,
            vendor_id: values.vendor_id.id,
            inventory_id: values.inventory_id.id,
            author_id: props.user.id,
          };
          props.createAsset(jsonToFormData(it));

          console.log(it);
        }}
      >
        {({ errors, touched, values, handleChange }) => (
          <Form style={{ width: "80vw", marginLeft: "20px" }}>
            <div className="grid w-full">
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
                        value={values.title}
                        tooltip="Name of Asset"
                        className="w-full"
                        tooltipOptions={{ position: "bottom" }}
                        onChange={(event) => handleChange(event, "title")}
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
                        value={values.code}
                        placeholder="Asset Code"
                        tooltip="Unique organization's code for asset"
                        className="w-full"
                        tooltipOptions={{ position: "bottom" }}
                        onChange={(event) => handleChange(event, "code")}
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
                        value={values.serial_number}
                        type="text"
                        placeholder="Serial Number"
                        tooltip="Unique serial number"
                        className="w-full"
                        tooltipOptions={{ position: "bottom" }}
                        onChange={(event) =>
                          handleChange(event, "serial_number")
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
                    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <InputText
                        id="model"
                        name="model"
                        type="text"
                        value={values.model}
                        placeholder="Model"
                        tooltip="Model of asset"
                        className="w-full"
                        tooltipOptions={{ position: "bottom" }}
                        onChange={(event) => handleChange(event, "model")}
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
                    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <InputText
                        type="text"
                        name="make"
                        value={values.make}
                        placeholder="Make"
                        tooltip="Make of asset"
                        className="w-full"
                        tooltipOptions={{ position: "bottom" }}
                        onChange={(event) => handleChange(event, "make")}
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
                  value={values.price}
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
                    handleChange(change);
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
                    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <Calendar
                        name="purchase_date"
                        value={values.purchase_date}
                        onChange={(event) => {
                          handleChange(event, "purchase_date");
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
                    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <Calendar
                        minDate={values.purchase_date}
                        id="warranty_deadline"
                        name="warranty_deadline"
                        dateFormat="dd/mm/yy"
                        showIcon
                        value={values.warranty_deadline}
                        onChange={(event) =>
                          handleChange(event, "warranty_deadline")
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
                    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <Calendar
                        id="service_date"
                        dateFormat="dd/mm/yy"
                        minDate={values.purchase_date}
                        maxDate={values.warranty_deadline}
                        name="service_date"
                        value={values.service_date}
                        onChange={(event) =>
                          handleChange(event, "service_date")
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
                    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <InputText
                        id="purchase_order_number"
                        name="purchase_order_number"
                        type="text"
                        value={values.purchase_order_number}
                        placeholder="Purchase Order Number"
                        tooltip="Purchase Order Number of asset"
                        className="w-full"
                        tooltipOptions={{ position: "bottom" }}
                        onChange={(event) =>
                          handleChange(event, "purchase_order_number")
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
                  handleChange={handleChange}
                  name="currency_id"
                  value={values.currency_id}
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
                  value={values.lifespan}
                  onValueChange={(event) => {
                    let change = {
                      target: {
                        name: "lifespan",
                        value: event.value,
                      },
                    };
                    handleChange(change);
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
                  value={values.inventory_id}
                  handleChange={handleChange}
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
                  value={values.salvage_amount}
                  onValueChange={(event) => {
                    let change = {
                      target: {
                        name: "salvage_amount",
                        value: event.value,
                      },
                    };
                    handleChange(change);
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
                    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <Dropdown
                        name="depreciation_algorithm"
                        showClear
                        options={depreciationOptions}
                        value={values.depreciation_algorithm}
                        onChange={(selectedOption) => {
                          let event = {
                            target: {
                              name: "depreciation_algorithm",
                              value: selectedOption.value,
                            },
                          };
                          handleChange(event);
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
                  value={values.dep_factor}
                  onValueChange={(event) => {
                    let change = {
                      target: {
                        name: "dep_factor",
                        value: event.value,
                      },
                    };
                    handleChange(change);
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
                  handleChange={handleChange}
                  name="category_ids"
                  tooltip="Category group of asset"
                  placeholder="Category Name"
                  fetchFunction={props.fetchCategories}
                  value={values.category_ids}
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
                  handleChange={handleChange}
                  name="vendor_id"
                  value={values.vendor_id}
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
                    form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                  }) => (
                    <div>
                      <InputTextarea
                        name="description"
                        className="w-full"
                        value={values.description}
                        onChange={(event) => handleChange(event, "description")}
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
            <div className="flex -mt-1 mb-8 justify-content-center align-content-center w-full">
              <Button
                type="submit"
                icon="pi pi-plus"
                label="Add New Asset"
                className="w-4 mb-5"
              ></Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
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
})(Formikform);
