import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Can from '../../../../shared/casl/can';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { TenantSchema } from '../../../../shared/utils/validation';
class TenantForm extends Component {
  fileHeader = () => {
    return (
      <div className="p-fileupload-buttonbar">
        <Button label="Select Image" icon="pi pi-plus" />
      </div>
    );
  };
  buttonOptions = {
    className: 'hidden',
  };

  render() {
    const initialValues = {
      title: '',
      sub_domain_id: '',
      description: '',
      phone: '',
      email: '',
      street_address: '',
      postal_address: '',
      digital_address: '',
      logo: '',
      bg_image: '',
    };

    return (
      <>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: '20px', color: '#495057' }}
        >
          Add Tenant
        </h2>
        <Divider style={{ width: '82vw' }} />

        <div style={{ width: '80vw', marginLeft: '20px' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={TenantSchema}
            onSubmit={async values => {
              await new Promise(r => setTimeout(r, 500));
              console.log(JSON.stringify(values, null, 2));
            }}
          >
            {props => {
              const { handleChange, values, errors, onSubmit, setFieldValue } =
                props;

              return (
                <>
                  <Form id="tenantForm">
                    <div
                      style={{
                        display: 'grid',
                        width: '80vw',
                        flexDirection: 'column',
                        gridTemplateColumns: 'repeat(2,1fr',
                      }}
                    >
                      <div class="field col">
                        <label
                          htmlFor="title"
                          className="block font-normal mb-2"
                        >
                          Tenant Name
                        </label>
                        <Field name="title">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <InputText
                                type="text"
                                className="w-full mb-1"
                                placeholder="Tenant Name"
                                {...field}
                              />

                              {meta.touched && meta.error && (
                                <ErrorMessage
                                  name="title"
                                  component="div"
                                  className="error-message"
                                />
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <div class="field col">
                        <label
                          htmlFor="sub_domain_id"
                          className="block font-normal mb-2"
                        >
                          Sub-domain
                        </label>
                        <Field name="sub_domain_id">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <InputText
                                id="sub_domain_id"
                                type="text"
                                className="w-full mb-1"
                                placeholder=" Sub-domain"
                                {...field}
                              />

                              {meta.touched && meta.error && (
                                <ErrorMessage
                                  name="sub_domain_id"
                                  component="div"
                                  className="error-message"
                                />
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <div class="field col">
                        <label
                          htmlFor="email"
                          className="block font-normal mb-2"
                        >
                          Email Address
                        </label>
                        <Field name="email">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <InputText
                                id="email"
                                type="text"
                                className="w-full mb-1"
                                placeholder="Email Address"
                                {...field}
                              />

                              {meta.touched && meta.error && (
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="error-message"
                                />
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <div class="field col">
                        <label
                          htmlFor="phone"
                          className="block font-normal mb-2"
                        >
                          Phone
                        </label>
                        <Field name="phone">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <InputText
                                id="phone"
                                type="text"
                                className="w-full mb-1"
                                placeholder="Phone Number"
                                {...field}
                              />

                              {meta.touched && meta.error && (
                                <ErrorMessage
                                  name="phone"
                                  component="div"
                                  className="error-message"
                                />
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <div class="field col">
                        <label
                          htmlFor="street_address"
                          className="block font-normal mb-2"
                        >
                          Street Address
                        </label>
                        <Field name="street_address">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <InputText
                                id="street_address"
                                type="text"
                                className="w-full mb-1"
                                placeholder="Street Address"
                                {...field}
                              />

                              {meta.touched && meta.error && (
                                <ErrorMessage
                                  name="street_address"
                                  component="div"
                                  className="error-message"
                                />
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div class="field col">
                        <label
                          htmlFor="postal_address"
                          className="block font-normal mb-2"
                        >
                          Postal Address
                        </label>
                        <Field name="postal_address">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <InputText
                                id="postal_address"
                                type="text"
                                className="w-full mb-1"
                                placeholder="Postal Address"
                                {...field}
                              />

                              {meta.touched && meta.error && (
                                <ErrorMessage
                                  name="postal_address"
                                  component="div"
                                  className="error-message"
                                />
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div class="field col">
                        <label htmlFor="basic" className="mb-2 font-normal">
                          Digital Address
                        </label>
                        <Field name="digital_address">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <InputMask
                                id="digital_address"
                                name="digital_address"
                                mask="aa-999-9999"
                                placeholder="AA-001-1010"
                                className="w-full mb-1"
                                {...field}
                              />

                              {meta.touched && meta.error && (
                                <ErrorMessage
                                  name="digital_address"
                                  component="div"
                                  className="error-message"
                                />
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div class="field col">
                        <label
                          htmlFor="description"
                          className="block font-normal mb-2"
                        >
                          Tenant Description
                        </label>
                        <Field name="description">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <InputTextarea
                                id="description"
                                type="text"
                                className="w-full mb-1"
                                placeholder="Tenant Description"
                                {...field}
                              />

                              {meta.touched && meta.error && (
                                <ErrorMessage
                                  name="description"
                                  component="div"
                                  className="error-message"
                                />
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div class="field col">
                        <label htmlFor="logo" className="mb-2 font-normal">
                          Logo
                        </label>
                        <Field name="logo">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div>
                              <FileUpload
                                uploadOptions={this.buttonOptions}
                                cancelOptions={this.buttonOptions}
                                chooseLabel="Select image"
                                onSelect={() => console.log('11')}
                              />
                              {meta.touched && meta.error && (
                                <ErrorMessage
                                  name="digital_address"
                                  component="div"
                                  className="error-message"
                                />
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div class="field col">
                        <label htmlFor="bg_image" className="mb-2 font-normal">
                          Background Image
                        </label>
                        <FileUpload
                          chooseLabel="Select image"
                          uploadOptions={this.buttonOptions}
                          cancelOptions={this.buttonOptions}
                        ></FileUpload>
                      </div>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
          <div
            style={{
              justifyContent: 'center',
              display: 'flex',
              alignContent: 'center',
              width: '80vw',
            }}
          >
            <Button
              label="Add Tenant"
              form="tenantForm"
              type="submit"
              icon="pi pi-plus"
              className="w-4"
            ></Button>
          </div>
        </div>
      </>
    );
  }
}

TenantForm.propTypes = {};

const mapStateToProps = state => ({
  inventories: state.inventories.inventories,
});

export default connect(mapStateToProps, {})(TenantForm);
