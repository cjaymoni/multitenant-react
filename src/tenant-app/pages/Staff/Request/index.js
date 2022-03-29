import React, { Component } from "react";
import CardDemo from "../../../../shared/components/card/CardDemo";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { Calendar } from "primereact/calendar";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import { connect } from "react-redux";
import {
  fetchAvailableAssets,
  fetchAssets,
} from "../../../../shared/redux/actions/assetActions";
import {
  issueRequest,
  fetchUserRequests,
} from "../../../../shared/redux/actions/requestActions";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { RequestSchema } from "../../../../shared/utils/validation";
import { fetchPriorities } from "../../../../shared/redux/actions/recommendationActions";
import { fetchCategoryItems } from "../../../../shared/redux/actions/categoryActions";
import { ListBox } from "primereact/listbox";
import {
  codeBodyTemplate,
  titleBodyTemplate,
  modelBodyTemplate,
  dateBodyTemplate,
  priceBodyTemplate,
  historycolumns,
} from "./const";
import TableUI from "../../../../shared/components/Table/Table";
import { Dropdown } from "primereact/dropdown";
import Can from "../../../../shared/casl/can";
import { InputNumber } from "primereact/inputnumber";
import { AutoComplete } from "primereact/autocomplete";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: false,
      toggler1: false,
      toggler2: false,
      showRequestButton: false,
      bulkRequest: false,
      showReturndate: true,
      showQuantity: true,
      info: [],
      items: [],
      selectedItems: null,
      selectedRow: [],
      list: "",
      historyitems: [],
      cat_id: "",
      infoven: [],
      globalFilter: "",
      historyFilter: null,
      selectedCategory: "",
      department_name: "",
      asset_name: "",
      author_name: "",
      end_date: "",
      pickup_date: "",
      return_date: "",
      start_date: "",
      quantity: "",
      title: "",
      portalPlacement: "bottom",
      options: [],
      isLoading: false,
      optionsLoaded: false,
      categoryoptions: [],
      categoryLoaded: false,
      loading: false,
      selectedPriority: null,
      filteredPriorities: null,
    };
    this.toggle = this.toggle.bind(this);
    this.searchPriority = this.searchPriority.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.handleOpen = this.handleOpen.bind(this);
    this.reset = this.reset.bind(this);
    this.CategoryChange = this.CategoryChange.bind(this);
    this.tableReset = this.tableReset.bind(this);

    this.onRowSelect = this.onRowSelect.bind(this);
    this.onRowUnselect = this.onRowUnselect.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.returnDateView = this.returnDateView.bind(this);
    this.returnQuantityView = this.returnQuantityView.bind(this);
    this.monthNavigatorTemplate = this.monthNavigatorTemplate.bind(this);
    this.yearNavigatorTemplate = this.yearNavigatorTemplate.bind(this);
  }

  componentDidMount() {
    this.props.fetchPriorities();
    // this.props.fetchCategories();
    this.props.fetchUserRequests();
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
  monthNavigatorTemplate(e) {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        style={{ lineHeight: 1 }}
      />
    );
  }

  yearNavigatorTemplate(e) {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={(event) => e.onChange(event.originalEvent, event.value)}
        className="p-ml-2"
        style={{ lineHeight: 1 }}
      />
    );
  }

  async reset() {
    await this.setState({ items: this.props.assets });
    return this.setState({ globalFilter: "" }), this.dt.reset();
  }
  async fetchAssetDetails() {
    return this.props.history.push("/assetinfo");
  }
  returnDateView(rowData) {
    switch (rowData.returnable) {
      case true:
        this.setState({ showReturndate: true });
        break;
      case false:
        this.setState({ showReturndate: false });
        break;
      default:
        this.setState({ showReturndate: true });
    }
  }
  returnQuantityView(rowData) {
    switch (rowData.numerable) {
      case true:
        this.setState({ showQuantity: true });
        break;
      case false:
        this.setState({ showQuantity: false });
        break;
      default:
        this.setState({ showQuantity: true });
    }
  }

  toggle(toggler, rowData) {
    let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
    this.setState({
      [toggler]: !togglerStatus,
      info: rowData,
      infoven: rowData.vendor,
    });
  }

  handleClose() {
    this.setState({ toggler: false });
    this.setState({ toggler1: false });
    this.setState({ toggler2: false });
    this.setState({ bulkRequest: false });
  }

  onCategoryChange(e) {
    this.dt.filter(e.value, "category_name", "in");
    this.setState({ selectedCategory: e.value });
  }

  requestDialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        form="upform"
        onClick={() => this.handleClose()}
      />
    </React.Fragment>
  );

  bulkDialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => {
          this.handleClose();
          this.state.selectedRow.splice(0, this.state.selectedRow.length);
          //  this.dt.onAllRowsSelect()
        }}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => console.log(this.state.selectedRow)}
      />
    </React.Fragment>
  );

  infoDialogFooter = (
    <React.Fragment>
      <Button
        label="Close"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => this.handleClose()}
      />
    </React.Fragment>
  );

  async tableReset() {
    await this.setState({ items: this.props.assets });
    return this.dt.reset();
  }

  CategoryChange(selectedOption) {
    this.loadLazyTimeout = setTimeout(() => {
      this.props
        .fetchCategoryItems(selectedOption.value, {
          lazyEvent: JSON.stringify(this.state.lazyParams),
        })
        .then((data) => {
          this.setState({
            totalRecords: data.totalRecords,
            items: this.props.categoryitems,
            loading: false,
          });
        });
    });
  }

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

  // handleLoadCategory = () => {
  //   let categoryoptions;
  //   setTimeout(() => {
  //     categoryoptions = this.props.categories.map(i => ({
  //       label: i.title,
  //       value: i.id,
  //     }));
  //     this.setState({
  //       categoryLoaded: true,
  //       categoryoptions,
  //       isLoading: false,
  //     });
  //   }, 2000);
  // };

  // maybeLoadCategory = () => {
  //   if (!this.state.categoryLoaded) {
  //     this.setState({ isLoading: true });
  //     this.handleLoadCategory();
  //   }
  // };

  async onRowSelect(event) {
    await this.state.selectedRow.push({
      name: event.data.title,
      code: event.data.code,
    });

    // this.setState({selectedRow:[...selectedRow,list]})
    this.setState({ list: "" });
    return (
      this.state.selectedRow.forEach(function (item, index) {
        console.log(item, index);
      }),
      this.setState({ showRequestButton: true })
    );
  }
  //     await this.state.selectedRow.push({"id":event.data.id,"name":event.data.title,"code":event.data.code})

  //     return this.setState({showRequestButton:true}),console.log(this.state.selectedRow.indexOf(event))
  //     // alert(this.state.selectedRow)
  //   //  alert( `Name: ${event.data.title},${event.data.code}`);
  // }

  onRowUnselect(event) {
    this.state.selectedRow.splice(event, 1);
    this.setState({ selectedRow: this.state.selectedRow });
    //  this.setState({showRequestButton:false});

    // alert(`Product Unselected Name: ${event.data.title}`);
  }
  removeItem = (props) => {
    // this.state.selectedRow.splice(props, 1)
    // this.setState({selectedRow: this.state.selectedRow})
    console.log(this.state.selectedRow.indexOf(props));
  };

  render() {
    const assets = this.props.assets;
    const funccc = this.props.fetchAssets;
    // .filter(i=>(i.status === true));
    const initialValues = {
      priority_id: "",
      start_date: "",
      end_date: "",
      quantity: "",
    };
    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Button
            icon="pi pi-external-link"
            className="p-button-rounded p-button-success"
            onClick={() => {
              this.toggle("toggler", rowData);
              this.returnQuantityView(rowData);
              this.returnDateView(rowData);
            }}
            tooltip="Request For Asset"
            tooltipOptions={{ position: "bottom" }}
          />
        </React.Fragment>
      );
    };
    const assetcolumns = [
      { field: "title", header: "Asset Name" },
      { field: "code", header: "Asset Code" },
      { field: "model", header: "Model" },
      { field: "formatted_price", header: "Price " },
      {
        field: "purchase_date",
        header: "Purchase Date",
        body: dateBodyTemplate,
      },
      { header: "Action(s)", body: actionBodyTemplate },
    ];

    const handleOpen = (toggler) => {
      let togglerStatus = this.state[toggler]; //check the status of the toggle you clicked
      this.setState({
        [toggler]: !togglerStatus,
      });
    };

    return (
      <div>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Request Item
        </h2>
        <br></br>

        <div className="cardFstyle">
          <div className="flex">
            <CardDemo
              title="Total requests"
              icon="pi pi-sort-alt"
              color="#cae6fc"
              iconColor="#2196f3"
              update="1"
              content={this.props.userbooksize || 0}
            ></CardDemo>
          </div>
          <div className="flex">
            <CardDemo
              title="Accepted"
              icon="pi pi-thumbs-up"
              color="#e7cbec"
              iconColor="#9c27b0"
              update="1"
              content={this.props.useraccept.length}
            ></CardDemo>
          </div>
          <div className="flex">
            <CardDemo
              title="Declined"
              icon="pi pi-thumbs-down"
              update="1"
              color="#fde0c2"
              iconColor="#f57c00"
              content={this.props.userdecline.length}
            ></CardDemo>
          </div>
        </div>
        <br></br>
        <div className="datatable-responsive-demo">
          <div>
            <TableUI
              columns={assetcolumns}
              fetchFunction={this.props.fetchAssets}
              style={{
                width: "76vw",
                marginLeft: "15px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
              figment={{
                position: "absolute",
                top: "4%",
                left: "16%",
                height: "35px",
                width: "30%",
              }}
              tableHeader="Assets"
              // addOn="AvailableAsset"
              clickFunction={() => handleOpen("toggler2")}
            />
          </div>
        </div>

        <Dialog
          draggable={false}
          visible={this.state["toggler"]}
          style={{ width: "40vw" }}
          header="Issue Request"
          modal
          className="p-fluid"
          footer={this.requestDialogFooter}
          onHide={this.handleClose}
        >
          <Formik
            validationSchema={RequestSchema}
            validateOnChange={true}
            initialValues={initialValues}
            onSubmit={(values) => {
              const postData = {
                item_id: this.state.info.id,
                author_id: this.props.user.id,
                priority_id: values.priority_id.id,
                department_id: this.props.user.department_id,
                start_date: moment(values.start_date).unix(),
                end_date: moment(values.end_date).unix(),
                quantity: values.quantity,
              };
              this.props.issueRequest(postData);
            }}
          >
            {(props) => {
              const { handleChange, values, errors, onSubmit } = props;
              return (
                <>
                  <Form id="upform">
                    <div className="formgrid grid">
                      <div className="field col-6">
                        <label htmlFor="state">Asset name</label>
                        <InputText
                          id="asset_name"
                          value={this.state.info.title}
                          disabled
                        />
                      </div>
                      <div className="field col-6">
                        <label htmlFor="zip">Asset code</label>
                        <InputText
                          id="asset_code"
                          value={this.state.info.code}
                          disabled
                        />
                      </div>

                      <div className="field col-6">
                        <label htmlFor="pickdate">PickUp Date</label>
                        <br></br>
                        <Calendar
                          minDate={moment().toDate()}
                          id="start_date"
                          name="start_date"
                          placeholder="Pickup Date"
                          dateFormat="dd/mm/yy"
                          showIcon
                          value={values.start_date}
                          onChange={(event) =>
                            handleChange(event, "start_date")
                          }
                          monthNavigator
                          yearNavigator
                          monthNavigatorTemplate={this.monthNavigatorTemplate}
                          yearNavigatorTemplate={this.yearNavigatorTemplate}
                          yearRange="2021:2050"
                          className={errors.start_date ? "p-invalid" : "p-flex"}
                        />
                        <div className="error-message">{errors.start_date}</div>
                      </div>
                      {this.state.showReturndate && (
                        <div className="field col-6">
                          <label htmlFor="returndate">Return Date</label>
                          <br></br>
                          <Calendar
                            minDate={values.start_date}
                            id="end_date"
                            name="end_date"
                            placeholder="Return Date"
                            dateFormat="dd/mm/yy"
                            showIcon
                            value={values.end_date}
                            onChange={(event) =>
                              handleChange(event, "end_date")
                            }
                            monthNavigator
                            yearNavigator
                            monthNavigatorTemplate={this.monthNavigatorTemplate}
                            yearNavigatorTemplate={this.yearNavigatorTemplate}
                            yearRange="2021:2050"
                            className={errors.end_date ? "p-invalid" : "p-flex"}
                          />
                          <div className="error-message">{errors.end_date}</div>
                        </div>
                      )}

                      <div className="field col-6">
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
                          className={
                            errors.priority_id ? 'p-invalid' : 'p-flex'
                          }
                        /> */}
                        <div className="error-message">
                          {errors.priority_id}
                        </div>
                      </div>
                      {this.state.showQuantity && (
                        <div className="field col-6">
                          <label htmlFor="namefItem">Quantity</label>
                          <InputNumber
                            min={1}
                            id="quantity"
                            name="quantity"
                            showButtons
                            placeholder="Request quantity"
                            value={values.quantity}
                            onValueChange={(event) =>
                              handleChange(event, "quantity")
                            }
                          />
                        </div>
                      )}
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["bulkRequest"]}
          style={{ width: "40vw" }}
          header="Issue Bulk Request"
          modal
          className="p-fluid"
          footer={this.bulkDialogFooter}
          onHide={this.handleClose}
        >
          {/* <Formik  
       onSubmit={(values) => {
         const postData={
           item_id:this.state.info.id,
           author_id:this.props.user.id,
           priority_id:values.priority_id.value,
           department_id:this.props.user.department_id,
           start_date:moment(values.start_date).unix(),
           end_date:moment(values.end_date).unix()
         };
         this.props.issueRequest(postData);
        }}
       >
       {props =>{
      
         const{ handleChange, values, errors, onSubmit} = props;
         return(
           <>
           <Form id="upform" > */}
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="pickdate">Selected Items</label>
              <br></br>
              <ListBox
                listStyle={{ height: "auto" }}
                dataKey="id"
                value={this.state.selectedRow}
                options={this.state.selectedRow}
                optionLabel="name"
                // onChange={(e) => console.log(this.state.selectedRow.indexOf(e.value))}

                style={{ width: "35vw" }}
                header="Selected Items"
              ></ListBox>
            </div>
          </div>

          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="pickdate">PickUp Date</label>
              <br></br>
              <Calendar
                minDate={moment().toDate()}
                id="start_date"
                name="start_date"
                placeholder="Pickup Date"
                dateFormat="dd/mm/yy"
                //  value={values.start_date}
                //  onChange={(event) => handleChange(event, "start_date")}
                monthNavigator
                yearNavigator
                yearRange="2021:2050"
                monthNavigatorTemplate={this.monthNavigatorTemplate}
                yearNavigatorTemplate={this.yearNavigatorTemplate}

                //  className={errors.start_date ? "p-invalid" : "p-flex"}
              />
            </div>

            <div className="field col-6">
              <label htmlFor="returndate">Return Date</label>
              <br></br>
              <Calendar
                //  minDate={values.start_date}
                id="end_date"
                name="end_date"
                placeholder="Return Date"
                dateFormat="dd/mm/yy"
                //  value={values.end_date}
                //  onChange={(event) => handleChange(event, "end_date")}
                monthNavigator
                yearNavigator
                yearRange="2021:2050"
                monthNavigatorTemplate={this.monthNavigatorTemplate}
                yearNavigatorTemplate={this.yearNavigatorTemplate}

                //  className={errors.end_date ? "p-invalid" : "p-flex"}
              />
            </div>

            <div className="field col-12">
              <label htmlFor="lastname6">Select Urgency of item</label>
              {/* <Select
                searchable={true}
                onBlurResetsInput={false}
                onCloseResetsInput={false}
                placeholder="Select urgency"
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                menuPortalTarget={document.body}
                //    value={props.values.priority_id}
                //    onChange={selectedOption => {
                //     let event = { target : { name:'priority_id',value: selectedOption,}}
                //     handleChange(event)
                // }}
                labelKey="title"
                valuekey="id"
                autoload={false}
                isLoading={this.state.isLoading}
                options={this.state.options}
                onFocus={this.maybeLoadOptions}
                // className={errors.priority_id ? "p-invalid" : "p-flex"}
              /> */}
              <div className="error-message">{/* {errors.priority_id} */}</div>
            </div>
          </div>
          {/* </Form>
            </>
            )
          }}
          </Formik> */}
        </Dialog>

        <Dialog
          draggable={false}
          visible={this.state["toggler2"]}
          style={{ width: "70vw" }}
          header="Request History"
          modal
          className="p-fluid"
          footer={this.infoDialogFooter}
          onHide={this.handleClose}
        >
          <div className="datatable-responsive-demo">
            <TableUI
              style={{
                width: "65vw",
                marginLeft: ".1px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
              columns={historycolumns}
              fetchFunction={this.props.fetchUserRequests}
              showHeader={true}
              tableHeader="Request History"
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
Request.propTypes = {
  assets: PropTypes.array.isRequired,
  fetchAvailableAssets: PropTypes.func.isRequired,
  issueRequest: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
  fetchPriorities: PropTypes.func.isRequired,
  priorities: PropTypes.array.isRequired,
  // fetchCategories: PropTypes.func.isRequired,
  // categories: PropTypes.array.isRequired,
  fetchUserRequests: PropTypes.func.isRequired,
  userrequests: PropTypes.array.isRequired,
  fetchCategoryItems: PropTypes.func.isRequired,
  categoryitems: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  assets: state.assets.items,
  user: state.auth.user,
  priorities: state.recommendations.priorities,
  // categories: state.categories.categories,
  userrequests: state.requests.userrequests,
  categoryitems: state.categories.categoryitems,
  userbooksize: state.requests.userbooksize,
  useraccept: state.requests.useraccept,
  userdecline: state.requests.userdecline,
});
export default connect(mapStateToProps, {
  fetchAvailableAssets,
  fetchPriorities,
  fetchUserRequests,
  issueRequest,
  fetchAssets,
  fetchCategoryItems,
})(Request);
