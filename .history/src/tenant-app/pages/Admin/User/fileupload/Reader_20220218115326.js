import React, { Component } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './columns';
import { SheetJSFT } from './types';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { bulkInsert } from '../../../../../shared/redux/actions/userActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      totalSize: 0,
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  }

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? 'binary' : 'array',
        bookVBA: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        this.props.bulkInsert(JSON.stringify(this.state.data));
        this.props.handleFunction();
        // console.log(JSON.stringify(this.state.data, null, 2));
      });
    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  render() {
    return (
      <div>
        <div class="p-fileupload p-fileupload-advanced p-component">
          <div class="p-fileupload-buttonbar">
            <label htmlFor="file">Select a file to Upload</label>

            <br />
          </div>
          <div class="p-fileupload-content">
            <InputText
              type="file"
              id="file"
              accept={SheetJSFT}
              onChange={this.handleChange}
            />
            <div style={{ height: '2vh' }}>
              <Button
                onClick={this.handleFile}
                style={{
                  position: 'absolute',
                  right: '3%',
                  marginTop: '1%',
                  height: '2.5rem',
                }}
              >
                <span class="p-button-icon p-c pi pi-upload p-button-icon-left"></span>
                <span class="p-button-label p-c">Upload</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExcelReader.propTypes = {
  bulkInsert: PropTypes.func.isRequired,
  handleFunction: PropTypes.func.isRequired,
};

export default connect(null, { bulkInsert })(ExcelReader);
