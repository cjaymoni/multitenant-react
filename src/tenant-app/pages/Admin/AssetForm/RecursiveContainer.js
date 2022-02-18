import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { Field } from "formik";
import { AutoCompleteDemo } from "../../../../shared/components/autocomplete/AutoComplete";
import { DropdownDemo } from "../../../../shared/components/select/Select";

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
const RecursiveContainer = ({ config, formik }) => {
  const builder = (individualConfig) => {
    switch (individualConfig.type) {
      case "text":
        return (
          <div key={individualConfig.name}>
            <label
              htmlFor={individualConfig.field}
              className="block font-normal mb-2"
            >
              {individualConfig.label}
            </label>
            <div className="field col">
              <Field name={individualConfig.name}>
                {({ field, form, meta }) => (
                  <div>
                    <InputText
                      type="text"
                      {...field}
                      placeholder={individualConfig.label}
                      style={{ width: "100%", marginLeft: "-0.5em" }}
                      tooltip={individualConfig.tooltip}
                      tooltipOptions={{ position: "bottom" }}
                      onChange={(event) => {
                        let change = {
                          target: {
                            name: individualConfig.name,
                            value: event.target.value,
                          },
                        };
                        formik.handleChange(change);
                      }}
                    />
                    {meta.touched && meta.error && (
                      <div className="error-message">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>
        );
      case "textarea":
        return (
          <div key={individualConfig.name}>
            <label
              htmlFor={individualConfig.field}
              className="block font-normal mb-2"
            >
              {individualConfig.label}
            </label>
            <div className="field col">
              <Field name={individualConfig.name}>
                {({ field, form, meta }) => (
                  <div>
                    <InputTextarea
                      {...field}
                      type="text"
                      tooltipOptions={{ position: "bottom" }}
                      placeholder={individualConfig.label}
                      tooltip={individualConfig.tooltip}
                      name={individualConfig.field}
                      onChange={(event) => {
                        let change = {
                          target: {
                            name: individualConfig.name,
                            value: event.target.value,
                          },
                        };
                        formik.handleChange(change);
                      }}
                      style={{
                        width: "100%",
                        marginRight: "50px",
                        marginLeft: "-0.5em",
                      }}
                    />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>
        );
      case "number":
        return (
          <div>
            <label
              htmlFor={individualConfig.field}
              className="block font-normal mb-2"
            >
              {individualConfig.label}
            </label>
            <div className="field col">
              <InputNumber
                min={1}
                tooltipOptions={{ position: "bottom" }}
                value={individualConfig.value}
                tooltip={individualConfig.tooltip}
                showButtons
                inputId="stacked"
                name={individualConfig.field}
                className="calClass"
                onValueChange={(event) => {
                  let change = {
                    target: {
                      name: individualConfig.name,
                      value: event.value,
                    },
                  };
                  formik.handleChange(change);
                }}
                style={{
                  width: "100%",
                  marginRight: "50px",
                  marginLeft: "-0.5em",
                }}
              />
            </div>
          </div>
        );
      case "date":
        return (
          <div>
            <label
              htmlFor={individualConfig.field}
              className="block font-normal mb-2"
            >
              {individualConfig.label}
            </label>
            <div className="field col">
              <Field name={individualConfig.name}>
                {({ field, form, meta }) => (
                  <div>
                    <Calendar
                      {...field}
                      yearRange="2010:2050"
                      tooltip={individualConfig.tooltip}
                      tooltipOptions={{ position: "bottom" }}
                      showIcon
                      value={individualConfig.value}
                      name={individualConfig.field}
                      placeholder={individualConfig.label}
                      monthNavigator
                      yearNavigator
                      monthNavigatorTemplate={monthNavigatorTemplate}
                      yearNavigatorTemplate={yearNavigatorTemplate}
                      onChange={(event) => {
                        let change = {
                          target: {
                            name: individualConfig.name,
                            value: event.value,
                          },
                        };
                        formik.handleChange(change);
                      }}
                      style={{
                        width: "100%",
                        marginRight: "50px",
                        marginLeft: "-0.5em",
                      }}
                    />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
            </div>
          </div>
        );
      case "auto-complete":
        return (
          <AutoCompleteDemo
            isFormik="true"
            name={individualConfig.name}
            field={individualConfig.field}
            label={individualConfig.label}
            placeholder={individualConfig.label}
            handleChange={formik.handleChange}
            fetchFunction={individualConfig.function}
            tooltip={individualConfig.tooltip}
          />
        );
      case "select":
        return (
          <DropdownDemo
            options={individualConfig.function}
            name={individualConfig.name}
            field={individualConfig.field}
            label={individualConfig.label}
            placeholder={individualConfig.label}
            handleChange={formik.handleChange}
            tooltip={individualConfig.tooltip}
          />
        );

      case "price":
        return (
          <div>
            <label
              htmlFor={individualConfig.field}
              className="block font-normal mb-2"
            >
              {individualConfig.label}
            </label>
            <div className="field col">
              <InputNumber
                min={1}
                tooltipOptions={{ position: "bottom" }}
                value={individualConfig.value}
                tooltip={individualConfig.tooltip}
                showButtons
                mode="currency"
                currency="GHS"
                inputId="stacked"
                name={individualConfig.field}
                className="calClass"
                onValueChange={(event) => {
                  let change = {
                    target: { name: individualConfig.name, value: event.value },
                  };
                  formik.handleChange(change);
                }}
                style={{
                  width: "100%",
                  marginRight: "50px",
                  marginLeft: "-0.5em",
                }}
              />
            </div>
          </div>
        );
      case "array":
        return (
          <RecursiveContainer
            config={individualConfig.children || []}
            formik={formik}
          />
        );
      default:
        return <div>Unsupported field</div>;
    }
  };

  return (
    <>
      {config.map((c) => {
        return builder(c);
      })}
    </>
  );
};

export default RecursiveContainer;
