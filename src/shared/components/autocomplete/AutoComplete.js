import React, { Component } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { ErrorMessage, Field } from "formik";

export class AutoCompleteDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selectedOption: null,
      filteredOptions: null,
    };

    this.searchOption = this.searchOption.bind(this);
    this.searchCurrency = this.searchCurrency.bind(this);
    this.countryservice = props.fetchFunction;
  }

  componentDidMount() {
    this.props.fetchFunction().then((data) => {
      this.setState({ options: data.payload.data });
    });
  }

  searchOption(event) {
    setTimeout(() => {
      let filteredOptions;
      if (!event.query.trim().length) {
        filteredOptions = [...this.state.options];
      } else {
        filteredOptions = this.state.options.filter((option) => {
          return option.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredOptions });
      // console.log(filteredOptions);
    }, 250);
  }

  searchCurrency(event) {
    setTimeout(() => {
      let filteredOptions;
      if (!event.query.trim().length) {
        filteredOptions = [...this.state.options];
      } else {
        filteredOptions = this.state.options.filter((option) => {
          return option.currency
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      this.setState({ filteredOptions });
      // console.log(filteredOptions);
    }, 250);
  }

  render() {
    if (this.props.isFormik === "true") {
      return (
        <div key={this.props.name}>
          {/* <label className="block font-normal mb-2" htmlFor={this.props.field}>
            {this.props.label}
          </label> */}
          {/* <div className="field col"> */}
          <Field name={this.props.name}>
            {({ field, form, meta }) => (
              <div>
                <AutoComplete
                  {...field}
                  className="w-full"
                  value={this.state.selectedOption}
                  suggestions={this.state.filteredOptions}
                  completeMethod={this.searchOption}
                  field="title"
                  dropdown
                  tooltip={this.props.tooltip}
                  tooltipOptions={{ position: "bottom" }}
                  placeholder={this.props.placeholder}
                  onChange={(event) => {
                    // let change = {
                    //   target: {
                    //     name: this.props.name,
                    //     value: event.target.value,
                    //   },
                    // };
                    // console.log(event.target.name);
                    this.setState({ selectedOption: event.target.value });
                    this.props.handleChange(event);
                  }}
                />
                {meta.touched && meta.error && (
                  <ErrorMessage
                    name={this.props.name}
                    component="div"
                    className="error-message mt-1"
                  />
                )}
              </div>
            )}
          </Field>
        </div>
        // </div>
      );
    } else if (this.props.isFormik === "currency") {
      return (
        <div key={this.props.name}>
          {/* <label className="block font-normal mb-2" htmlFor={this.props.field}>
            {this.props.label}
          </label> */}
          {/* <div className="field col"> */}
          <Field name={this.props.name}>
            {({ field, form, meta }) => (
              <div>
                <AutoComplete
                  {...field}
                  className="w-full"
                  value={this.state.selectedOption}
                  suggestions={this.state.filteredOptions}
                  completeMethod={this.searchOption}
                  field="currency"
                  dropdown
                  tooltip={this.props.tooltip}
                  tooltipOptions={{ position: "bottom" }}
                  placeholder={this.props.placeholder}
                  onChange={(event) => {
                    // let change = {
                    //   target: {
                    //     name: this.props.name,
                    //     value: event.target.value,
                    //   },
                    // };
                    // console.log(event.target.name);
                    this.setState({ selectedOption: event.target.value });
                    this.props.handleChange(event);
                  }}
                />
                {meta.touched && meta.error && (
                  <ErrorMessage
                    name={this.props.name}
                    component="div"
                    className="error-message mt-1"
                  />
                )}
              </div>
            )}
          </Field>
        </div>
        // </div>
      );
    } else {
      return (
        <AutoComplete
          className="w-full"
          suggestions={this.state.filteredOptions}
          completeMethod={this.searchOption}
          field="title"
          dropdown
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(event) => {
            let change = {
              target: {
                name: this.props.name,
                value: event.target.value,
              },
            };
            this.setState({ selectedOption: change.target.value });
            this.props.handleChange(change);
          }}
          tooltip={this.props.tooltip}
          tooltipOptions={{ position: "bottom" }}
        />
      );
    }
  }
}
