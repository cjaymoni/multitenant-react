import React from "react";

import { InputText } from "primereact/inputtext";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loginUser,
  requestReset,
  verifyEmail,
} from "../../../../shared/redux/actions/authActions";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { LoginSchema } from "../../../../shared/utils/validation";
import { Checkbox } from "primereact/checkbox";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // this.setState({ submitted: true });
    const { email, password } = this.state;
    const userDetails = { email, password };

    this.props.loginUser(userDetails);
  }

  render() {
    const bgImg = process.env.PUBLIC_URL + "default_bg.jpg";
    const cpLogo = "src/assets/aiti-logo.png";

    return (
      <>
        <div className="flex bg-purple-50">
          <div
            className="flex w-6 h-screen "
            style={{
              backgroundImage: `url("${bgImg}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "left-center",
              // 'linear-gradient(90deg, rgba(9,4,106,1) 0%, rgba(9,44,121,1) 21%, rgba(0,212,255,1) 100%)',
            }}
            // style={{
            //   width: '50vw',
            //   height: '100vh',

            //   backgroundImage: `url("${bgImg}")`,
            //   backgroundRepeat: 'no-repeat',
            //   backgroundSize: '100% 100%',
            //   backgroundAttachment: 'fixed',
            // }}
          ></div>
          <div
            className="flex w-6 h-screen bg-purple-50"
            // style={{ backgroundColor: '#f8f9fa' }}
          >
            <div className="w-11 ml-4 mt-5">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={this.handleSubmit()}
              >
                {(errors, status, touched, isSubmitting) => (
                  <div className="flex align-items-center justify-content-center mt-8 ">
                    <div className="surface-card p-3 shadow-8 border-round w-9 mt-6 bg-purple-50">
                      <div className="text-center mb-2">
                        <img
                          src={process.env.PUBLIC_URL + "aiti-logo.png"}
                          alt="logo"
                          height={50}
                          className="mb-2"
                        />
                        <div className="text-500 text-2xl font-medium mb-1">
                          E-ASSET MANAGEMENT
                        </div>
                      </div>

                      <Form>
                        <div className="email">
                          <label
                            htmlFor="email"
                            className="block text-900 font-medium mb-2"
                          >
                            Email
                          </label>
                          <Field name="email">
                            {({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                              meta,
                            }) => (
                              <div>
                                <InputText
                                  type="text"
                                  name="email"
                                  className="w-full mb-1"
                                  placeholder="Email"
                                  value={this.state.email}
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
                        <div className="password">
                          <label
                            htmlFor="password"
                            className="block text-900 font-medium mb-2"
                          >
                            Password
                          </label>
                          <Field name="password">
                            {({
                              field, // { name, value, onChange, onBlur }
                              form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                              meta,
                            }) => (
                              <div>
                                <InputText
                                  type="password"
                                  className="w-full mb-1"
                                  placeholder="Password"
                                  name="password"
                                  value={this.state.password}
                                  {...field}
                                />

                                {meta.touched && meta.error && (
                                  <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="error-message"
                                  />
                                )}
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className="flex w-full justify-content-between mb-2">
                          <div className="flex">
                            <Checkbox
                              id="rememberme"
                              // onChange={(e) => setChecked(e.checked)}
                              // checked={checked}
                              binary
                              className="mr-2"
                            />
                            <label htmlFor="rememberme" className="flex">
                              Remember me
                            </label>
                          </div>
                          <div className="flex">
                            <a
                              onClick={() => this.handleOpen()}
                              className="font-medium no-underline text-blue-500 text-right cursor-pointer"
                            >
                              Forgot your password?
                            </a>
                          </div>
                        </div>

                        <div className="col-12">
                          <Button
                            label="Sign In"
                            icon="pi pi-user"
                            type="submit"
                            className="w-full "
                            disabled={isSubmitting}
                          />
                        </div>
                        {status && (
                          <div className={"alert alert-danger"}>{status}</div>
                        )}
                      </Form>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <Dialog
          draggable={false}
          visible={this.state["confirmResDialog"]}
          style={{ width: "35vw" }}
          header="Request Password Reset"
          modal
          className="p-fluid"
          footer={this.ResetDialogFooter}
          onHide={this.handleClose}
        >
          <div className="confirmation-content">
            <i className="pi pi-envelope mr-2" style={{ fontSize: "1.5rem" }} />

            <span>Enter Email Address</span>
            <InputText
              id="useremail"
              name="useremail"
              onChange={(event) => this.handleInputChange(event, "useremail")}
              value={this.state.useremail}
            />
          </div>
        </Dialog>
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  requestReset: PropTypes.func.isRequired,
  verifyEmail: PropTypes.func.isRequired,
};

export default connect(null, {
  loginUser,
})(Login);
