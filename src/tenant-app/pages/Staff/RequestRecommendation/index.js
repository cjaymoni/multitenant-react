import React, { Component } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import CardDemo from "../../../../shared/components/card/CardDemo";
import classNames from "classnames";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";
import { Toolbar } from "primereact/toolbar";
import {
  createRecommendation,
  fetchRecommendations,
  fetchUserRecommendations,
  fetchPriorities,
} from "../../../../shared/redux/actions/recommendationActions";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { RecommendationSchema } from "../../../../shared/utils/validation";
import {
  CardData,
  titleBodyTemplate,
  statusBodyTemplate,
  justificationBodyTemplate,
  dateBodyTemplate,
} from "./const";
import TableUI from "../../../../shared/components/Table/Table";
import { AutoComplete } from "primereact/autocomplete";

class RequestRecommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      globalFilter: "",
      toggler: false,
      portalPlacement: "bottom",
      options: [],
      isLoading: false,
      optionsLoaded: false,
      loading: false,
      selectedPriority: null,
      filteredPriorities: null,
      totalRecords: 0,
      lazyParams: {
        first: 0,
        rows: 1,
        page: 2,
      },
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.reset = this.reset.bind(this);
    this.loadLazyData = this.loadLazyData.bind(this);
    this.onPage = this.onPage.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.loadLazyTimeout = null;
    this.searchPriority = this.searchPriority.bind(this);
  }

  reset() {
    this.setState({ globalFilter: "" });
    this.dt.reset();
  }

  componentDidMount() {
    // this.loadLazyData();
    this.props.fetchPriorities();
  }
  searchPriority(event) {
    setTimeout(() => {
      let filteredPriorities;
      if (!event.query.trim().length) {
        filteredPriorities = [...this.props.priorities];
      } else {
        filteredPriorities = this.props.priorities.filter((option) => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredPriorities });
      // console.log(filteredOptions);
    }, 250);
  }
  historycolumns = [
    { field: "title", header: "Device Specification", body: titleBodyTemplate },
    { field: "status", header: "Status", body: statusBodyTemplate },
    {
      field: "justification",
      header: "Justification",
      body: justificationBodyTemplate,
    },
    {
      field: "created_at",
      header: "Date Recommended ",
      body: dateBodyTemplate,
    },
  ];

  loadLazyData() {
    this.setState({ loading: true });

    if (this.loadLazyTimeout) {
      clearTimeout(this.loadLazyTimeout);
    }
    this.loadLazyTimeout = setTimeout(() => {
      this.props
        .fetchUserRecommendations(this.props.user.id, {
          lazyEvent: JSON.stringify(this.state.lazyParams),
        })
        .then((data) => {
          this.setState({
            totalRecords: data.totalRecords,
            items: this.props.userrecommendations,
            loading: false,
          });
        });
    });
  }

  onPage(event) {
    let lazyParams = { ...this.state.lazyParams, ...event };
    this.setState({ lazyParams }, this.loadLazyData);
  }

  onSort(event) {
    let lazyParams = { ...this.state.lazyParams, ...event };
    this.setState({ lazyParams }, this.loadLazyData);
  }

  onFilter(event) {
    let lazyParams = { ...this.state.lazyParams, ...event };
    lazyParams["first"] = 0;
    this.setState({ lazyParams }, this.loadLazyData);
  }
  handleOpen(toggler) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
    });
  }

  handleClose() {
    this.setState({ toggler: false });
  }

  ItemDialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        form="postform"
        onClick={() => this.handleClose()}
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
      />
    </React.Fragment>
  );

  handleLoadOptions = () => {
    let options;
    setTimeout(() => {
      options = this.props.priorities.map((i) => ({
        label: i.title,
        value: i.id,
      }));
      this.setState({
        optionsLoaded: true,
        options,
        isLoading: false,
      });
    }, 2000);
  };

  maybeLoadOptions = () => {
    if (!this.state.optionsLoaded) {
      this.setState({ isLoading: true });
      this.handleLoadOptions();
    }
  };
  render() {
    const userprops = this.props.userrecommendations;
    const initialValues = {
      title: "",
      justification: "",
      description: "",
      priority_id: "",
    };

    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Recommendation
        </h2>
        <br></br>
        <div className="p-grid p-justify-between cardFstyle">
          <div className="p-col-12 p-md-6 p-lg-3">
            <CardDemo
              title="Total Recommended"
              icon="pi pi-shopping-cart"
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
              content={this.props.pagesize}
            ></CardDemo>
          </div>
          <div className="p-col-12 p-md-6 p-lg-3">
            <CardDemo
              title="Approved"
              icon="pi pi-shopping-cart"
              color="#e7cbec"
              iconColor="#9c27b0"
              update="1"
              content={this.props.useraccept.length}
            ></CardDemo>
          </div>
          <div className="p-col-12 p-md-6 p-lg-3">
            <CardDemo
              title="Declined"
              icon="pi pi-shopping-cart"
              content={this.props.userdecline.length}
              update="1"
              color="#fde0c2"
              iconColor="#f57c00"
            ></CardDemo>
          </div>
        </div>

        <br></br>

        <div className="datatable-responsive-demo">
          <div>
            <TableUI
              columns={this.historycolumns}
              fetchFunction={this.props.fetchUserRecommendations}
              tableHeader="Recommendation History"
              clickFunction={() => this.handleOpen("toggler")}
              style={{
                width: "76vw",
                marginLeft: "15px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
              figment={{
                position: "absolute",
                left: "30%",
                top: "4%",
                height: "35px",
                width: "30%",
              }}
            />
          </div>
        </div>

        <Dialog
          draggable={false}
          visible={this.state["toggler"]}
          style={{ width: "45vw" }}
          header="Recommend Asset"
          modal
          className="p-fluid"
          footer={this.ItemDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={RecommendationSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              const postData = {
                title: values.title,
                department_id: this.props.user.department_id,
                justification: values.justification,
                description: values.description,
                author_id: this.props.user.id,
                priority_id: values.priority_id.id,
              };
              this.props.createRecommendation(postData);
            }}
          >
            {(props) => {
              const { handleChange, values, errors, onSubmit } = props;
              return (
                <>
                  <Form id="postform">
                    <div className="formgrid grid">
                      <div className="field col-12">
                        <label htmlFor="firstname6">
                          Device / Equipment Specification
                        </label>
                        <InputText
                          id="title"
                          type="text"
                          name="title"
                          placeholder="Example: (HP OMEN 15)"
                          value={values.title}
                          className={
                            errors.title ? "p-invalid p-d-block" : "p-d-block"
                          }
                          onChange={handleChange("title")}
                        />
                        <div className="error-message mt-1">{errors.title}</div>
                      </div>
                      <div className="field col-12">
                        <label htmlFor="lastname6">
                          Select Urgency of item
                        </label>
                        <AutoComplete
                          name="priority_id"
                          id="priority_id"
                          className="w-full"
                          dropdown
                          suggestions={this.state.filteredPriorities}
                          completeMethod={this.searchPriority}
                          field="title"
                          placeholder="Select urgency level"
                          value={props.values.priority_id}
                          onChange={(selectedOption) => {
                            let event = {
                              target: {
                                name: "priority_id",
                                value: selectedOption.target.value,
                              },
                            };
                            handleChange(event);
                          }}
                        />
                        {/* <Select
                          searchable={true}
                          onBlurResetsInput={false}
                          onCloseResetsInput={false}
                          placeholder="Select urgency"
                          styles={{
                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                          }}
                          menuPortalTarget={document.body}
                          value={props.values.priority_id}
                          onChange={selectedOption => {
                            let event = {
                              target: {
                                name: 'priority_id',
                                value: selectedOption,
                              },
                            };
                            handleChange(event);
                          }}
                          labelKey="title"
                          valuekey="id"
                          autoload={false}
                          isLoading={this.state.isLoading}
                          options={this.state.options}
                          onFocus={this.maybeLoadOptions}
                        /> */}
                        <div className="error-message mt-1">
                          {errors.priority_id}
                        </div>
                      </div>

                      <div className="field col-12">
                        <label htmlFor="firstname6">Justification</label>
                        <InputTextarea
                          id="justification"
                          name="justification"
                          value={values.justification}
                          onChange={handleChange("justification")}
                          className={
                            errors.justification
                              ? "p-invalid p-d-block"
                              : "p-d-block"
                          }
                        />
                        <div className="error-message mt-1">
                          {errors.justification}
                        </div>
                      </div>
                      <div className="field col-12">
                        <label htmlFor="firstname6">Description</label>
                        <InputTextarea
                          id="description"
                          name="description"
                          value={values.description}
                          onChange={handleChange("description")}
                          className={
                            errors.description
                              ? "p-invalid p-d-block"
                              : "p-d-block"
                          }
                        />
                        <div className="error-message mt-1">
                          {errors.description}
                        </div>
                      </div>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </Dialog>
      </div>
    );
  }
}
RequestRecommendation.propTypes = {
  createRecommendation: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
  fetchPriorities: PropTypes.func.isRequired,
  userrecommendations: PropTypes.array.isRequired,
  fetchUserRecommendations: PropTypes.func.isRequired,
  priorities: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  priorities: state.recommendations.priorities,
  userrecommendations: state.recommendations.userrecommendations,
  pagesize: state.recommendations.pagesize,
  useraccept: state.recommendations.useraccept,
  userdecline: state.recommendations.userdecline,
});

export default connect(mapStateToProps, {
  createRecommendation,
  fetchPriorities,
  fetchUserRecommendations,
})(RequestRecommendation);
