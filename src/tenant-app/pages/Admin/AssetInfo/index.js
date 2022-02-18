import React, { Component } from 'react';
import { Divider } from 'primereact/divider';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Timeline } from 'primereact/timeline';
import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';
import { Chip } from 'primereact/chip';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';
import { InputNumber } from 'primereact/inputnumber';
import Can from '../../../../shared/casl/can';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { fetchAssetById } from '../../../../shared/redux/actions/assetActions';
class AssetInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: '',
      activeIndex: '',
      disable: true,
      assetDetails: [],
      saveButton: false,
    };
    this.events1 = [
      {
        status: 'Ordered',
        description: 'Osafo requested for HP Lenovo.',
        date: '15/10/2020 10:30',
        icon: 'pi pi-shopping-cart',
        color: '#9C27B0',
        image: 'game-controller.jpg',
      },
      {
        status: 'Processing',
        description: 'Mary processed HP Lenovo for John.',
        date: '15/10/2020 14:00',
        icon: 'pi pi-cog',
        color: '#673AB7',
      },
      {
        status: 'Shipped',
        description: 'Delilah delivered HP Lenovo to Teddy.',
        date: '15/10/2020 16:15',
        icon: 'pi pi-shopping-cart',
        color: '#FF9800',
      },
      {
        status: 'Delivered',
        description: 'Ama received HP Lenovo.',
        date: '16/10/2020 10:00',
        icon: 'pi pi-check',
        color: '#607D8B',
      },
    ];
    // this.enableInput = this.enableInput.bind(this)
    this.events2 = ['2020', '2021', '2022', '2023'];
  }

  async componentDidMount() {
    await this.props.fetchAssetById(localStorage.assetid);

    return this.setState({ assetDetails: this.props.assetinfo[0] });
  }
  enableInput(e) {
    this.setState({
      disable: !this.state.disable,
      saveButton: !this.state.saveButton,
    });
  }
  emptyTemplate() {
    return (
      <div className="p-d-flex p-ai-center p-dir-col">
        <i
          className="pi pi-image p-mt-3 p-p-5"
          style={{
            fontSize: '5em',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-b)',
            color: 'var(--surface-d)',
          }}
        ></i>
        <span
          style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}
          className="p-my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  }

  depreciationTemplate() {
    const data = this.state.assetDetails.depreciation_algorithm;
    if (data === 'straight_line_depreciation') {
      return (
        (
          <React.Fragment>
            <h4>Straight Line Depreciation</h4>
          </React.Fragment>
        ),
        console.log('straight')
      );
    } else {
      return 'Declining Balance Depreciation', console.log('decline');
    }
  }

  render() {
    // const assetDetails=this.props.assetinfo[0]
    // const [activeIndex, setActiveIndex] = useState(0);

    const chooseOptions = {
      icon: 'pi pi-fw pi-images',
      iconOnly: true,
      className: 'custom-choose-btn p-button-rounded p-button-outlined',
    };
    const uploadOptions = {
      icon: 'pi pi-fw pi-cloud-upload',
      iconOnly: true,
      className:
        'custom-upload-btn p-button-success p-button-rounded p-button-outlined',
    };
    const cancelOptions = {
      icon: 'pi pi-fw pi-times',
      iconOnly: true,
      className:
        'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined',
    };

    return (
      <div>
        <div class="">
          <div class="flex">
            <div class="flex-initial flex align-items-center justify-content-center  font-bold text-white m-2 px-5 py-3 border-round">
              <Avatar
                icon="pi pi-user"
                className="p-mr-2"
                size="xlarge"
                shape="circle"
              />
            </div>
            <div class="flex-initial flex align-items-center justify-content-center font-bold text-white m-2 px-5 py-3 border-round ">
              <div>
                <div className="font-medium text-3xl text-900">
                  {this.state.assetDetails['title']}
                  <span>
                    {' '}
                    <div className="flex align-items-center mt-3">
                      <i className="pi pi-users mr-2"></i>
                      <Chip
                        label="Not available"
                        style={{ backgroundColor: '#f9acac' }}
                      />
                    </div>
                  </span>
                </div>

                <div className="flex text-700 ">
                  <div className="mr-5 flex align-items-center mt-3">
                    <i className="pi pi-clock mr-2"></i>
                    <span>Type:Laptop</span>
                  </div>
                  <div className="mr-5 flex align-items-center mt-3">
                    <i className="pi pi-globe mr-2"></i>
                    <span>IMEI: 27321</span>
                  </div>
                  <div className="flex align-items-center mt-3">
                    <i className="pi pi-clock mr-2"></i>
                    <span>Code: {this.state.assetDetails['code']}</span>
                  </div>
                </div>
              </div>
              <Can do="edit" on="Asset">
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
              </Can>
            </div>
          </div>
        </div>

        <Divider style={{ width: '82vw' }} />
        <TabView
          style={{
            backgroundColor: 'aliceblue',
            width: '82vw',
            marginLeft: '15px',
            color: 'black',
          }}
        >
          <TabPanel header="Overview">
            <div className="surface-0">
              <div className="font-medium text-3xl text-900 mb-3">
                Asset Information
              </div>
              <div className="text-500 mb-5">All Details About the Asset</div>
              <ul className="list-none p-0 m-0" style={{ width: '78vw' }}>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 ">
                  <div className="text-500 w-6 md:w-2 font-medium">Name</div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <InputText
                      style={{
                        border: 'none',
                        fontSize: '18px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      disabled={this.state.disable}
                      value={this.state.assetDetails['title']}
                    />
                  </div>
                  <div className="text-500 w-6 md:w-2 font-medium">Code</div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <InputText
                      style={{
                        border: 'none',
                        fontSize: '18px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      disabled={this.state.disable}
                      value={this.state.assetDetails['code']}
                    />
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Serial No.
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <InputText
                      style={{
                        border: 'none',
                        fontSize: '18px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      disabled={this.state.disable}
                      value={this.state.assetDetails['serial_number']}
                    />
                  </div>
                  <div className="text-500 w-6 md:w-2 font-medium">Make</div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <InputText
                      style={{
                        border: 'none',
                        fontSize: '18px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      disabled={this.state.disable}
                      value={this.state.assetDetails['make']}
                    />
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 ">
                  <div className="text-500 w-6 md:w-2 font-medium">Model</div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <InputText
                      style={{
                        border: 'none',
                        fontSize: '18px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      disabled={this.state.disable}
                      value={this.state.assetDetails['model']}
                    />
                  </div>
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Availability
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <InputText
                      style={{
                        border: 'none',
                        fontSize: '18px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      disabled={this.state.disable}
                      value="
                    Not Available"
                    />
                  </div>
                </li>

                <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 ">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Assignee
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <Chip label="Gladys Amara" className="mr-2" />
                  </div>
                  <div className="text-500 w-6 md:w-2 font-medium">Price</div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <InputNumber
                      value={this.state.assetDetails['amount']}
                      mode="currency"
                      locale="en-US"
                      inputId="currency-us"
                      currency="USD"
                      inputStyle={{
                        border: 'none',
                        fontSize: '18px',
                        fontWeight: 'bold',
                      }}
                    ></InputNumber>
                  </div>
                </li>

                <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 ">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Purchase Date
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <Calendar
                      disabled={this.state.disable}
                      inputStyle={{
                        border: 'none',
                        fontSize: '18px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      placeholder={moment(
                        this.state.assetDetails['purchase_date']
                      ).format('DD-MM-YYYY')}
                    ></Calendar>
                  </div>
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Warranty Date
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <Calendar
                      disabled={this.state.disable}
                      inputStyle={{
                        border: 'none',
                        fontSize: '18px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      placeholder={moment(
                        this.state.assetDetails['warranty_date']
                      ).format('DD-MM-YYYY')}
                    ></Calendar>
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 ">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Service Date
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <Calendar
                      disabled={this.state.disable}
                      inputStyle={{
                        border: 'none',
                        fontSize: '18px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      placeholder={moment(
                        this.state.assetDetails['service_date']
                      ).format('DD-MM-YYYY')}
                    ></Calendar>
                  </div>
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Salvage Amount
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <InputNumber
                      value={this.state.assetDetails['salvage_amount']}
                      currency="USD"
                      mode="currency"
                      locale="en-US"
                      inputStyle={{
                        border: 'none',
                        fontSize: '18px',
                        fontWeight: 'bold',
                      }}
                    ></InputNumber>
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 ">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Lifespan
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <InputNumber
                      value={this.state.assetDetails['lifespan']}
                      inputStyle={{
                        border: 'none',
                        fontSize: '18px',
                        fontWeight: 'bold',
                      }}
                    ></InputNumber>
                  </div>
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Depreciation %
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <InputNumber
                      value={this.state.assetDetails['dep_factor']}
                      inputStyle={{
                        border: 'none',
                        fontSize: '18px',
                        fontWeight: 'bold',
                      }}
                    ></InputNumber>
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 ">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Depreciation Type
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <InputText
                      style={{
                        border: 'none',
                        fontSize: '18px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      disabled={this.state.disable}
                      value={this.state.assetDetails['depreciation_algorithm']}
                    />
                  </div>
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Description
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                    <InputText
                      style={{
                        border: 'none',
                        fontSize: '18px',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                      disabled={this.state.disable}
                      value={this.state.assetDetails['description']}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel header="Documents">
            <h5>Template</h5>
            <FileUpload
              ref={el => (this.fileUploadRef = el)}
              name="demo[]"
              url="https://primefaces.org/primereact/showcase/upload.php"
              multiple
              accept="image/*"
              maxFileSize={1000000}
              onUpload={this.onTemplateUpload}
              onSelect={this.onTemplateSelect}
              onError={this.onTemplateClear}
              onClear={this.onTemplateClear}
              headerTemplate={this.headerTemplate}
              itemTemplate={this.itemTemplate}
              emptyTemplate={this.emptyTemplate}
              chooseOptions={chooseOptions}
              uploadOptions={uploadOptions}
              cancelOptions={cancelOptions}
            />
          </TabPanel>
          <TabPanel header="History">
            <div className="card">
              <Timeline
                value={this.events1}
                opposite={item => item.status}
                content={item => (
                  <div>
                    <div>
                      {' '}
                      <medium className="p-text-secondary">
                        {item.description}
                      </medium>
                    </div>
                    <medium className="p-text-secondary">{item.date}</medium>
                  </div>
                )}
              />
            </div>
          </TabPanel>
        </TabView>
      </div>
    );
  }
}
AssetInfo.propTypes = {
  fetchAssetById: PropTypes.func.isRequired,
  assetinfo: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  assetinfo: state.assets.assetinfo,
});

export default connect(mapStateToProps, {
  fetchAssetById,
})(AssetInfo);
