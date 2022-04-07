import React, { Component } from "react";
import PropTypes from "prop-types";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { connect } from "react-redux";
import {
  fetchConfigurations,
  updateConfiguration,
} from "../../../../shared/redux/actions/envActions";
import { ToggleButton } from "primereact/togglebutton";
class EnvConfigurations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configurations: {},
      panelCollapsed: true,
      mailPanelCollapsed: true,
      redisPanelCollapsed: true,
      awsPanelCollapsed: true,
      apsPanelCollapsed: true,
      timersPanelCollapsed: false,
      BASE_URL: "",
      ADMIN_EMAIL: "",
      VERIFICATION_PATH: "",
      TENANT_ACTIVATION_PATH: "",
      EMAIL_CODE_DURATION_IN_MINUTES: "",
      ACCESS_TOKEN_DURATION_IN_MINUTES: "",
      REFRESH_TOKEN_DURATION_IN_MINUTES: "",
      PASSWORD_RESET_TOKEN_DURATION_IN_MINUTES: "",
      ACCOUNT_VERIFICATION_TOKEN_DURATION_IN_MINUTES: "",
      TWILIO_PHONE_NUMBER: "",
      TWILIO_AUTH_TOKEN: "",
      TWILIO_ACCOUNT_SID: "",
      MAIL_USERNAME: "",
      MAIL_PASSWORD: "",
      MAIL_FROM: "",
      MAIL_PORT: "",
      MAIL_SERVER: "",
      MAIL_FROM_NAME: "",
      MAIL_TLS: "",
      MAIL_SSL: "",
      USE_CREDENTIALS: "",
      VALIDATE_CERTS: "",
      DEFAULT_MAIL_SUBJECT: "",
      REDIS_HOST: "",
      REDIS_PORT: "",
      REDIS_PASSWORD: "",
      REDIS_USER: "",
      REDIS_NODE: "",
      REDIS_MAX_RETRIES: "",
      REDIS_RETRY_INTERVAL: "",
      USE_S3: "",
      AWS_ACCESS_KEY_ID: "",
      AWS_SECRET_ACCESS_KEY: "",
      AWS_DEFAULT_ACL: "",
      AWS_STORAGE_BUCKET_NAME: "",
      AWS_S3_OBJECT_CACHE_CONTROL: "",
      APS_COALESCE: "",
      APS_MAX_INSTANCES: "",
      APS_MISFIRE_GRACE_TIME: "",
      APS_THREAD_POOL_MAX_WORKERS: "",
      APS_PROCESS_POOL_MAX_WORKERS: "",
      saveButton: false,
      disable: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchConfigurations();

    return (
      this.setState({ configurations: this.props.configurations || {} }),
      console.log(this.state.configurations)
    );
  }
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
  }
  enableInput(e) {
    this.setState({
      disable: !this.state.disable,
      saveButton: !this.state.saveButton,
    });
  }
  updateConfiguration() {
    const payload = {
      BASE_URL: this.state.BASE_URL || this.state.configurations.BASE_URL,
      ADMIN_EMAIL:
        this.state.ADMIN_EMAIL || this.state.configurations.ADMIN_EMAIL,
      VERIFICATION_PATH:
        this.state.VERIFICATION_PATH ||
        this.state.configurations.VERIFICATION_PATH,
      TENANT_ACTIVATION_PATH:
        this.state.TENANT_ACTIVATION_PATH ||
        this.state.configurations.TENANT_ACTIVATION_PATH,
      EMAIL_CODE_DURATION_IN_MINUTES:
        this.state.EMAIL_CODE_DURATION_IN_MINUTES ||
        this.state.configurations.EMAIL_CODE_DURATION_IN_MINUTES,
      ACCESS_TOKEN_DURATION_IN_MINUTES:
        this.state.ACCESS_TOKEN_DURATION_IN_MINUTES ||
        this.state.configurations.ACCESS_TOKEN_DURATION_IN_MINUTES,
      REFRESH_TOKEN_DURATION_IN_MINUTES:
        this.state.REFRESH_TOKEN_DURATION_IN_MINUTES ||
        this.state.configurations.REFRESH_TOKEN_DURATION_IN_MINUTES,
      PASSWORD_RESET_TOKEN_DURATION_IN_MINUTES:
        this.state.PASSWORD_RESET_TOKEN_DURATION_IN_MINUTES ||
        this.state.configurations.PASSWORD_RESET_TOKEN_DURATION_IN_MINUTES,
      ACCOUNT_VERIFICATION_TOKEN_DURATION_IN_MINUTES:
        this.state.ACCOUNT_VERIFICATION_TOKEN_DURATION_IN_MINUTES ||
        this.state.configurations
          .ACCOUNT_VERIFICATION_TOKEN_DURATION_IN_MINUTES,
      TWILIO_PHONE_NUMBER:
        this.state.TWILIO_PHONE_NUMBER ||
        this.state.configurations.TWILIO_PHONE_NUMBER,
      TWILIO_AUTH_TOKEN:
        this.state.TWILIO_AUTH_TOKEN ||
        this.state.configurations.TWILIO_AUTH_TOKEN,
      TWILIO_ACCOUNT_SID:
        this.state.TWILIO_ACCOUNT_SID ||
        this.state.configurations.TWILIO_ACCOUNT_SID,
      MAIL_USERNAME:
        this.state.MAIL_USERNAME || this.state.configurations.MAIL_USERNAME,
      MAIL_PASSWORD:
        this.state.MAIL_PASSWORD || this.state.configurations.MAIL_PASSWORD,
      MAIL_FROM: this.state.MAIL_FROM || this.state.configurations.MAIL_FROM,
      MAIL_PORT: this.state.MAIL_PORT || this.state.configurations.MAIL_PORT,
      MAIL_SERVER:
        this.state.MAIL_SERVER || this.state.configurations.MAIL_SERVER,
      MAIL_FROM_NAME:
        this.state.MAIL_FROM_NAME || this.state.configurations.MAIL_FROM_NAME,
      MAIL_TLS: this.state.MAIL_TLS || this.state.configurations.MAIL_TLS,
      MAIL_SSL: this.state.MAIL_SSL || this.state.configurations.MAIL_SSL,
      USE_CREDENTIALS:
        this.state.USE_CREDENTIALS || this.state.configurations.USE_CREDENTIALS,
      VALIDATE_CERTS:
        this.state.VALIDATE_CERTS || this.state.configurations.VALIDATE_CERTS,
      DEFAULT_MAIL_SUBJECT:
        this.state.DEFAULT_MAIL_SUBJECT ||
        this.state.configurations.DEFAULT_MAIL_SUBJECT,
      REDIS_HOST: this.state.REDIS_HOST || this.state.configurations.REDIS_HOST,
      REDIS_PORT: this.state.REDIS_PORT || this.state.configurations.REDIS_PORT,
      REDIS_PASSWORD:
        this.state.REDIS_PASSWORD || this.state.configurations.REDIS_PASSWORD,
      REDIS_USER: this.state.REDIS_USER || this.state.configurations.REDIS_USER,
      REDIS_NODE: this.state.REDIS_NODE || this.state.configurations.REDIS_NODE,
      REDIS_MAX_RETRIES:
        this.state.REDIS_MAX_RETRIES ||
        this.state.configurations.REDIS_MAX_RETRIES,
      REDIS_RETRY_INTERVAL:
        this.state.REDIS_RETRY_INTERVAL ||
        this.state.configurations.REDIS_RETRY_INTERVAL,
      USE_S3: this.state.USE_S3 || this.state.configurations.USE_S3,
      AWS_ACCESS_KEY_ID:
        this.state.AWS_ACCESS_KEY_ID ||
        this.state.configurations.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY:
        this.state.AWS_SECRET_ACCESS_KEY ||
        this.state.configurations.AWS_SECRET_ACCESS_KEY,
      AWS_DEFAULT_ACL:
        this.state.AWS_DEFAULT_ACL || this.state.configurations.AWS_DEFAULT_ACL,
      AWS_STORAGE_BUCKET_NAME:
        this.state.AWS_STORAGE_BUCKET_NAME ||
        this.state.configurations.AWS_STORAGE_BUCKET_NAME,
      AWS_S3_OBJECT_CACHE_CONTROL:
        this.state.AWS_S3_OBJECT_CACHE_CONTROL ||
        this.state.configurations.AWS_S3_OBJECT_CACHE_CONTROL,
      APS_COALESCE:
        this.state.APS_COALESCE || this.state.configurations.APS_COALESCE,
      APS_MAX_INSTANCES:
        this.state.APS_MAX_INSTANCES ||
        this.state.configurations.APS_MAX_INSTANCES,
      APS_MISFIRE_GRACE_TIME:
        this.state.APS_MISFIRE_GRACE_TIME ||
        this.state.configurations.APS_MISFIRE_GRACE_TIME,
      APS_THREAD_POOL_MAX_WORKERS:
        this.state.APS_THREAD_POOL_MAX_WORKERS ||
        this.state.configurations.APS_THREAD_POOL_MAX_WORKERS,
      APS_PROCESS_POOL_MAX_WORKERS:
        this.state.APS_PROCESS_POOL_MAX_WORKERS ||
        this.state.configurations.APS_PROCESS_POOL_MAX_WORKERS,
    };
  }
  render() {
    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Environment Configurations
        </h2>
        <Divider style={{ width: "82vw" }} />
        <div className=" flex justify-content-end">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            className="p-button-text"
            onClick={this.enableInput.bind(this)}
          />
          {this.state.saveButton && (
            <Button
              label="Save"
              icon="pi pi-check"
              id="saveButton"
              className="p-button-text"
              onClick={this.enableInput.bind(this)}
            />
          )}
        </div>
        <div style={{ width: "80vw", marginLeft: "20px" }}>
          <div
            style={{
              display: "grid",
              width: "80vw",
              flexDirection: "column",
              gridTemplateColumns: "repeat(2,1fr",
            }}
          >
            <div class="field col">
              <label htmlFor="title" className="block font-normal mb-2">
                Base URL
              </label>
              <InputText
                type="text"
                className="w-full mb-1"
                placeholder="Base URL"
                disabled={this.state.disable}
                defaultValue={this.state.configurations.BASE_URL}
              />
            </div>
            <div class="field col">
              <label htmlFor="title" className="block font-normal mb-2">
                Admin Email
              </label>
              <InputText
                type="text"
                className="w-full mb-1"
                placeholder=" Admin Email"
                disabled={this.state.disable}
                defaultValue={this.state.configurations.ADMIN_EMAIL}
              />
            </div>
            <div class="field col">
              <label htmlFor="title" className="block font-normal mb-2">
                Verification Path
              </label>
              <InputText
                type="text"
                className="w-full mb-1"
                placeholder="Verification Path"
                disabled={this.state.disable}
                defaultValue={this.state.configurations.VERIFICATION_PATH}
              />
            </div>
            <div class="field col">
              <label htmlFor="title" className="block font-normal mb-2">
                Tenant Activation Path
              </label>
              <InputText
                type="text"
                className="w-full mb-1"
                placeholder="Tenant Activation Path"
                disabled={this.state.disable}
                defaultValue={this.state.configurations.TENANT_ACTIVATION_PATH}
              />
            </div>
          </div>
          <Fieldset
            className="mt-3"
            legend="Timers"
            toggleable
            disabled={this.state.disable}
            collapsed={this.state.timersPanelCollapsed}
            onToggle={(e) => this.setState({ timersPanelCollapsed: e.value })}
          >
            <div className="grid w-full">
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Email Code Duration
                </label>
                <InputText
                  type="text"
                  keyfilter="int"
                  className="w-full mb-1"
                  placeholder="Email Code Duration"
                  disabled={this.state.disable}
                  defaultValue={
                    this.state.configurations.EMAIL_CODE_DURATION_IN_MINUTES
                  }
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Access Token Duration
                </label>
                <InputText
                  keyfilter="int"
                  type="text"
                  className="w-full mb-1"
                  placeholder="Access Token Duration"
                  disabled={this.state.disable}
                  defaultValue={
                    this.state.configurations.ACCESS_TOKEN_DURATION_IN_MINUTES
                  }
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Refresh Token Duration
                </label>
                <InputText
                  type="text"
                  className="w-full mb-1"
                  placeholder="Refresh Token Duration"
                  disabled={this.state.disable}
                  keyfilter="int"
                  defaultValue={
                    this.state.configurations.REFRESH_TOKEN_DURATION_IN_MINUTES
                  }
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Password Reset Token Duration
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  keyfilter="int"
                  className="w-full mb-1"
                  placeholder="Password Reset Token Duration"
                  defaultValue={
                    this.state.configurations
                      .PASSWORD_RESET_TOKEN_DURATION_IN_MINUTES
                  }
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Account Verification Token Duration
                </label>
                <InputText
                  keyfilter="int"
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Account Verification Token Duration"
                  defaultValue={
                    this.state.configurations
                      .ACCOUNT_VERIFICATION_TOKEN_DURATION_IN_MINUTES
                  }
                />
              </div>
            </div>
          </Fieldset>

          <Fieldset
            legend="Twillo"
            toggleable
            className="mt-3"
            collapsed={this.state.panelCollapsed}
            onToggle={(e) => this.setState({ panelCollapsed: e.value })}
          >
            <div className="grid w-full">
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Twillo Phone Number
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Twillo Phone Number"
                  defaultValue={this.state.configurations.TWILIO_PHONE_NUMBER}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Twillo Auth Token
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Twillo Auth Token"
                  defaultValue={this.state.configurations.TWILIO_AUTH_TOKEN}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Twillo Account SID
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Twillo Account SID"
                  defaultValue={this.state.configurations.TWILIO_ACCOUNT_SID}
                />
              </div>
            </div>
          </Fieldset>

          <Fieldset
            className="mt-3"
            legend="Mail"
            toggleable
            collapsed={this.state.mailPanelCollapsed}
            onToggle={(e) => this.setState({ mailPanelCollapsed: e.value })}
          >
            <div className="grid w-full">
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Mail Username
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Mail Username"
                  defaultValue={this.state.configurations.MAIL_USERNAME}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Mail Password
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Mail Password"
                  defaultValue={this.state.configurations.MAIL_PASSWORD}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Mail From
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Mail From"
                  defaultValue={this.state.configurations.MAIL_FROM}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Mail Port
                </label>
                <InputText
                  keyfilter="int"
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Mail Port"
                  defaultValue={this.state.configurations.MAIL_PORT}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Mail Server
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Mail Server"
                  defaultValue={this.state.configurations.MAIL_SERVER}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Mail From Name
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  defaultValue={this.state.configurations.MAIL_FROM_NAME}
                  placeholder="Mail From Name"
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Mail TLS
                </label>
                <ToggleButton
                  disabled={this.state.disable}
                  checked={this.state.configurations.MAIL_TLS}
                  // onChange={(e) => setChecked1(e.defaultValue)}
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Mail SSL
                </label>
                <ToggleButton
                  disabled={this.state.disable}
                  checked={this.state.configurations.MAIL_SSL}
                  // onChange={(e) => setChecked1(e.defaultValue)}
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Use Credentials
                </label>
                <ToggleButton
                  disabled={this.state.disable}
                  checked={this.state.configurations.USE_CREDENTIALS}
                  // onChange={(e) => setChecked1(e.defaultValue)}
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Validate Certificates
                </label>
                <ToggleButton
                  disabled={this.state.disable}
                  checked={this.state.configurations.VALIDATE_CERTS}
                  // onChange={(e) => setChecked1(e.defaultValue)}
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Default Mail Subject
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  defaultValue={this.state.configurations.DEFAULT_MAIL_SUBJECT}
                  placeholder="Default Mail Subject"
                />
              </div>
            </div>
          </Fieldset>

          <Fieldset
            className="mt-3"
            legend="Redis"
            toggleable
            collapsed={this.state.redisPanelCollapsed}
            onToggle={(e) => this.setState({ redisPanelCollapsed: e.value })}
          >
            <div className="grid w-full">
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Redis Host
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Redis Host"
                  defaultValue={this.state.configurations.REDIS_HOST}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Redis Port
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Redis Port"
                  keyfilter="int"
                  defaultValue={this.state.configurations.REDIS_PORT}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Redis Password
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Redis Password"
                  defaultValue={this.state.configurations.REDIS_PASSWORD}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Redis Username
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Redis Username"
                  defaultValue={this.state.configurations.REDIS_USER}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Redis Node
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Redis Node"
                  keyfilter="int"
                  defaultValue={this.state.configurations.REDIS_NODE}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Number of Max Retries
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  keyfilter="int"
                  placeholder="Number of Max Retries"
                  defaultValue={this.state.configurations.REDIS_MAX_RETRIES}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Retry Interval
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="Retry Interval"
                  keyfilter="int"
                  defaultValue={this.state.configurations.REDIS_RETRY_INTERVAL}
                />
              </div>
            </div>
          </Fieldset>

          <Fieldset
            className="mt-3"
            legend="AWS"
            toggleable
            collapsed={this.state.awsPanelCollapsed}
            onToggle={(e) => this.setState({ awsPanelCollapsed: e.value })}
          >
            <div className="grid w-full">
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  Use S3 Bucket
                </label>
                <ToggleButton
                  disabled={this.state.disable}
                  checked={this.state.configurations.USE_S3}
                  // onChange={(e) => setChecked1(e.defaultValue)}
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  AWS Access Key ID
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="AWS Access Key ID"
                  defaultValue={this.state.configurations.AWS_ACCESS_KEY_ID}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  AWS Secret Access Key
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="AWS Secret Access Key"
                  defaultValue={this.state.configurations.AWS_SECRET_ACCESS_KEY}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  AWS Default ACL
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="AWS Default ACL"
                  defaultValue={this.state.configurations.AWS_DEFAULT_ACL}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  AWS Storage Bucket Name
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="AWS Storage Bucket Name"
                  defaultValue={
                    this.state.configurations.AWS_STORAGE_BUCKET_NAME
                  }
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  AWS S3 Object Cache Control
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  className="w-full mb-1"
                  placeholder="AWS S3 Object Cache Control"
                  defaultValue={
                    this.state.configurations.AWS_S3_OBJECT_CACHE_CONTROL
                  }
                />
              </div>
            </div>
          </Fieldset>

          <Fieldset
            className="mt-3"
            legend="APS"
            toggleable
            collapsed={this.state.apsPanelCollapsed}
            onToggle={(e) => this.setState({ apsPanelCollapsed: e.value })}
          >
            <div className="grid w-full">
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  APS Coalesce
                </label>
                <ToggleButton
                  disabled={this.state.disable}
                  checked={this.state.configurations.APS_COALESCE}
                  // onChange={(e) => setChecked1(e.defaultValue)}
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  APS Max Instances
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  keyfilter="int"
                  className="w-full mb-1"
                  placeholder="APS Max Instances"
                  defaultValue={this.state.configurations.APS_MAX_INSTANCES}
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  APS Misfire Grace Period
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  keyfilter="int"
                  className="w-full mb-1"
                  placeholder="APS Misfire Grace Period"
                  defaultValue={
                    this.state.configurations.APS_MISFIRE_GRACE_TIME
                  }
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  APS Thread Pool Max Workers
                </label>
                <InputText
                  disabled={this.state.disable}
                  keyfilter="int"
                  type="text"
                  className="w-full mb-1"
                  placeholder="APS Thread Pool Max Workers"
                  defaultValue={
                    this.state.configurations.APS_THREAD_POOL_MAX_WORKERS
                  }
                />
              </div>
              <div class="field col-6">
                <label htmlFor="title" className="block font-normal mb-2">
                  APS Process Pool Max Workers
                </label>
                <InputText
                  disabled={this.state.disable}
                  type="text"
                  keyfilter="int"
                  className="w-full mb-1"
                  placeholder="APS Process Pool Max Workers"
                  defaultValue={
                    this.state.configurations.APS_PROCESS_POOL_MAX_WORKERS
                  }
                />
              </div>
            </div>
          </Fieldset>
        </div>
      </div>
    );
  }
}

EnvConfigurations.propTypes = {
  fetchConfigurations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  configurations: state.configurations.configurations,
});
export default connect(mapStateToProps, { fetchConfigurations })(
  EnvConfigurations
);
