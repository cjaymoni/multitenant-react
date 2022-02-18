import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';

import { Field } from 'formik';

export class DropdownDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  render() {
    return (
      <div key={this.props.name}>
        <label className="block font-normal mb-2" htmlFor={this.props.field}>
          {this.props.label}
        </label>
        <div className="field col">
          <Field name={this.props.name}>
            {({ field, form, meta }) => (
              <div>
                <Dropdown
                  {...field}
                  className="flex md:flex-wrap w-full -ml-2"
                  value={this.state.selectedOption}
                  options={this.props.options}
                  tooltip={this.props.tooltip}
                  showClear
                  tooltipOptions={{ position: 'bottom' }}
                  onChange={event => {
                    let change = {
                      target: {
                        name: this.props.name,
                        value: event.target.value,
                      },
                    };
                    this.setState({ selectedOption: change.target.value });
                    this.props.handleChange(change);
                  }}
                  optionLabel="label"
                  placeholder={this.props.placeholder}
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
  }
}
