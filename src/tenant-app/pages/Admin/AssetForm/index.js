import React, { Component } from "react";
import { Divider } from "primereact/divider";

import Formikform from "./form";
import DynamicForm from "./const";
class AssetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: "",
      showreturnable: true,
      shownonreturn: false,
    };
    // this.hideComponent = this.hideComponent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.formType = [
      { label: "Returnable", value: "showreturnable" },
      { label: "Non-Returnable", value: "shownonreturn" },
    ];
  }
  componentDidMount() {}

  //   hideComponent(name, e) {
  //     switch (name) {
  //       case "showreturnable":
  //         this.setState({
  //           showreturnable: !this.state.showreturnable,
  //           selectedType: e.value,
  //           shownonreturn: false,
  //         });
  //         break;
  //       case "shownonreturn":
  //         this.setState({
  //           shownonreturn: !this.state.shownonreturn,
  //           selectedType: e.value,
  //           showreturnable: false,
  //         });
  //         break;
  //       default:
  //         this.setState({ showreturnable: false, shownonreturn: false });
  //     }
  //   }

  handleSubmit = async (values, { setErrors }, e) => {
    e.preventDefault();
    console.log("handleSubmit");
  };
  render() {
    const { showreturnable, shownonreturn } = this.state;

    return (
      <>
        <h2
          className="p-mb-3 p-text-bold"
          style={{ marginLeft: "20px", color: "#495057" }}
        >
          Add Asset
        </h2>
        <Divider style={{ width: "82vw" }} />
        {/* <div style={{ marginLeft: "20px" }}>
          <h4 className="block font-normal mb-2">Select Asset Type</h4>

          <Dropdown
            value={this.state.selectedType}
            style={{ width: "250px" }}
            options={this.formType}
            onChange={(e) => this.hideComponent(e.value, e)}
            optionLabel="label"
            placeholder="Select Asset Type"
          />
        </div> */}
        {/* <Divider style={{ width: "82vw" }} /> */}
        {/* <Formikform /> */}
        <DynamicForm />
        {/* {showreturnable && <Formikform assetType="returnable" />} */}

        {/* nom-return */}
        {/* {shownonreturn && <Formikform assetType="non-returnable" />} */}
      </>
    );
  }
}

export default AssetForm;
