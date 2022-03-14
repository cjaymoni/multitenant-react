import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "./Table.css";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { typeSelect } from "../../../tenant-app/pages/Staff/Request/const";
import Can from "../../casl/can";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchCategoryItemsN,
} from "../../../shared/redux/actions/categoryActions";
import { AutoComplete } from "primereact/autocomplete";
import withRouter from "../../routes/withRouter";
import { useLocation } from "react-router-dom";

const TableUI = (props) => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [getData, setgetData] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStat, setSelectedStat] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectectedOption] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(null);

  const location = useLocation();

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
  });
  const dt = useRef(null);
  let loadLazyTimeout = null;

  useEffect(() => {
    loadLazyData();

    props.fetchCategories().then((data) => setOptions(data.payload.data));
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const searchOption = (event) => {
    setTimeout(() => {
      let _filteredCountries;
      if (!event.query.trim().length) {
        _filteredCountries = [...options];
      } else {
        _filteredCountries = options.filter((country) => {
          return country.title
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredOptions(_filteredCountries);
    }, 250);
  };

  const LoadFunction = (fetcht) => {
    fetcht({ lazyEvent: JSON.stringify(lazyParams) }).then((data) => {
      setTotalRecords(data.payload.bk_size);
      setgetData(data.payload.data);
      setLoading(false);
    });
  };

  const LoadAvailableFunction = (fetcht) => {
    fetcht({ lazyEvent: JSON.stringify(lazyParams) }).then((data) => {
      setTotalRecords(data.payload.bk_size);
      setgetData(data.payload.data.filter((m) => m.available === true));
      setLoading(false);
    });
  };

  const CategoryChange = (selectedOption) => {
    setLoading(true);
    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }
    loadLazyTimeout = setTimeout(() => {
      props
        .fetchCategoryItemsN(selectedOption.id, {
          lazyEvent: JSON.stringify(lazyParams),
        })
        .then((data) => {
          setTotalRecords(data.payload.bk_size);
          setgetData(data.payload.data.filter((m) => m.available === true));
          setLoading(false);
        });
    });
  };
  const loadLazyData = () => {
    setLoading(true);
    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }
    //imitate delay of a backend call
    loadLazyTimeout = setTimeout(() => {
      if (
        JSON.parse(localStorage.role) === "Head of Department" &&
        location.pathname === "/recommendation"
      ) {
        const fetcht = props.fetchFunction1;
        LoadFunction(fetcht);
      } else if (
        JSON.parse(localStorage.role) === "Head of Department" &&
        location.pathname === "/requestlist"
      ) {
        const fetcht = props.fetchFunction1;
        LoadFunction(fetcht);
      } else if (
        JSON.parse(localStorage.role) === "Head of Department" &&
        props.addOn === "AvailableAsset"
      ) {
        const fetcht = props.fetchFunction;
        LoadAvailableFunction(fetcht);
      } else if (
        location.pathname === "/inventoryinfo" &&
        props.addOn === "NonInventoryAsset"
      ) {
        const fetcht = props.fetchFunction;
        const nonid = JSON.parse(localStorage.getItem("inv_id"));
        fetcht({ lazyEvent: JSON.stringify(lazyParams) }).then((data) => {
          setTotalRecords(data.payload.bk_size);
          setgetData(data.payload.data.filter((m) => m.inventory_id !== nonid));
          setLoading(false);
        });
      } else if (
        JSON.parse(localStorage.role) === "Staff" &&
        props.addOn === "AvailableAsset"
      ) {
        const fetcht = props.fetchFunction;
        LoadAvailableFunction(fetcht);
      } else {
        const fetcht = props.fetchFunction;
        LoadFunction(fetcht);
      }
    });
  };

  // const onPage = event => {
  //   let _lazyParams = { ...lazyParams, ...event };
  //   setLazyParams(_lazyParams);
  // };
  const onPage = (event) => {
    setLazyParams(event);
  };
  // const onSort = event => {
  //   let _lazyParams = { ...lazyParams, ...event };
  //   setLazyParams(_lazyParams);
  // };
  const onSort = (event) => {
    setLazyParams(event);
  };
  // const onFilter = event => {
  //   let _lazyParams = { ...lazyParams, ...event };
  //   _lazyParams['first'] = 0;
  //   setLazyParams(_lazyParams);
  // };
  const onFilter = (event) => {
    event["first"] = 0;
    setLazyParams(event);
  };

  const reset = () => {
    setSelectedType(null);
    setGlobalFilter("");
    dt.current.reset();
  };

  const onTypeChange = (e) => {
    dt.current.filter(e.value, "action", "equals");
    setSelectedType(e.value);
  };
  const columns = props.columns;

  const search = (
    <div className="p-inputgroup flex h-3rem w-5">
      <span className="p-inputgroup-addon">
        <i className="pi pi-search"></i>
      </span>
      <InputText
        type="search"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search ..."
      />
      <Button
        tooltip="Clear"
        icon="pi pi-filter-slash"
        className="p-button-info"
        onClick={reset}
      />
    </div>
  );

  const renderHeader = () => {
    switch (props.tableHeader) {
      case "Assets":
        return (
          <div className="flex flex-wrap justify-content-between md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
            <div className="flex w-3 h-3rem">
              <AutoComplete
                value={selectedOption}
                suggestions={filteredOptions}
                completeMethod={searchOption}
                field="title"
                dropdown
                placeholder="Select Category"
                onChange={(e) => {
                  setSelectectedOption(e.value);
                  CategoryChange(e.value);
                }}
                tooltipOptions={{ position: "bottom" }}
                tooltip="Search by Item Category"
              />
            </div>
            {/* {this.state.showRequestButton &&( */}

            {/* <Button
                    style={{position:"absolute", left:"73%", top:'4%'}}
                 label="Request"
                 tooltip="Bulk Request"
                 icon ="pi pi-external-link"
                 className="p-button-raised p-button-outlined"
                 onClick={()=>{this.handleOpen("bulkRequest");
                console.log(this.state.selectedRow)}}
                 >
               </Button> */}

            {/* )} */}

            <Button
              label="History"
              icon="pi pi-clock"
              className=" flex p-button-raised p-button-outlined h-3rem"
              tooltipOptions={{ position: "bottom" }}
              tooltip="View Request History"
              onClick={() => props.clickFunction()}
            ></Button>
            <Button
              icon="pi pi-refresh"
              tooltip="Refresh List"
              tooltipOptions={{ position: "bottom" }}
              className=" flex p-button-raised p-button-outlined h-3rem"
              // style={{ position: 'absolute', right: '1%' }}
              onClick={() => loadLazyData()}
            ></Button>
          </div>
        );

      case "Manage Inventories":
        return (
          <div className="flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
            <Can do="add" on="Inventories">
              <Button
                label="Inventory"
                icon="pi pi-plus"
                className="flex h-3rem p-button-raised p-button-outlined"
                onClick={() => props.clickFunction()}
              ></Button>
            </Can>
          </div>
        );

      case "Assets List":
        return (
          <div className=" flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
            <Can do="add" on="Asset">
              <Button
                icon="pi pi-plus"
                label="Asset"
                className="flex  p-button-raised p-button-outlined h-3rem"
                onClick={() => props.clickFunction()}
              ></Button>
            </Can>
          </div>
        );

      case "Consumables List":
        return (
          <div className=" flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
            <Can do="add" on="Asset">
              <Button
                icon="pi pi-plus"
                label="Consumables"
                className="flex  p-button-raised p-button-outlined h-3rem"
                onClick={() => props.clickFunction()}
              ></Button>
            </Can>
          </div>
        );

      case "Recommendation History":
        return (
          <div className="flex  flex-wrap md:flex-wrap  justify-content-between">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}

            <div className="flex h-3rem">
              <Dropdown
                options={["Active", "Accepted", "Declined", "Delivered"]}
                onChange={(e) => {
                  setSelectedType(e.value);
                  setGlobalFilter(e.target.value);
                }}
                placeholder="Status"
                value={selectedType}
                className="p-column-filter"
                showClear
                tooltipOptions={{ position: "bottom" }}
                tooltip="Sort by Status"
              />
            </div>

            <Button
              icon="pi pi-plus"
              tooltip="New Recommendation"
              label="New"
              tooltipOptions={{ position: "bottom" }}
              className="p-button-raised p-button-outlined h-3rem flex"
              onClick={() => props.clickFunction()}
            />
          </div>
        );

      case "Request History":
        return (
          <div className="flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>

            <Dropdown
              className="flex w-6  h-3rem"
              placeholder="Select status"
              options={typeSelect}
              showClear
              value={selectedType}
              optionLabel="label"
              onChange={(e) => {
                setGlobalFilter(e.value);
                setSelectedType(e.value);
              }}
            />
            {/* <Select
                options={typeSelect}
                value={selectedType}
                placeholder="Select status"
                onChange={e => setGlobalFilter(e.value)}
              /> */}
          </div>
        );

      case "Manage Departments":
        return (
          <div className="flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}

            <Can do="add" on="Department">
              <Button
                icon="pi pi-plus"
                label="Department"
                className="flex h-3rem p-button-raised p-button-outlined"
                onClick={() => props.clickFunction()}
              ></Button>
            </Can>
          </div>
        );

      case "Manage Locations":
        return (
          <div className=" flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}

            <Can do="add" on="Location">
              <Button
                icon="pi pi-plus"
                label=" Location"
                className="flex h-3rem p-button-raised p-button-outlined"
                onClick={() => props.clickFunction()}
              ></Button>
            </Can>
          </div>
        );

      case "Departments in location":
        return (
          <div className="flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="flex mt-2">{props.tableHeader}</h2>
            {search}
          </div>
        );

      case "Transfer Asset":
        return (
          <div className="flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
          </div>
        );

      case "Transfer Inventory":
        return (
          <div className="flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
          </div>
        );

      case "Manage Users":
        return (
          <div className="flex justify-content-between  flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
            <div className="flex h-3rem">
              <Dropdown
                onChange={(e) => {
                  setSelectedType(e.value);
                  setGlobalFilter(e.target.value);
                }}
                placeholder="User type"
                options={[
                  "Staff",
                  "Store Manager",
                  "Facility Manager",
                  "Head of Department",
                  "Head of Entity",
                ]}
                value={selectedType}
                className="p-column-filter"
                showClear
              />
            </div>
            <Can do="add" on="User">
              <Button
                icon="pi pi-plus"
                label="User"
                className="flex h-3rem p-button-raised p-button-outlined"
                onClick={() => props.clickFunction()}
              />
              <Button
                icon="pi pi-file"
                tooltip="Upload file"
                tooltipOptions={{ position: "bottom" }}
                className="flex h-3rem p-button-raised p-button-outlined"
                onClick={() => props.clickFunction1()}
              />
            </Can>
            {/* <Can do="add" on="User">
                  
                </Can> */}
          </div>
        );

      case "Manage Categories":
        return (
          <div className=" flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
            <Can do="add" on="Categories">
              <Button
                icon="pi pi-plus"
                label="Category"
                className="p-button-raised p-button-outlined flex h-3rem"
                onClick={() => props.clickFunction()}
              ></Button>
            </Can>
          </div>
        );

      case "Items in Category":
        return (
          <div className="flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
          </div>
        );

      case "Manage Vendors":
        return (
          <div className="flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
            <Can do="add" on="Suppliers">
              <Button
                icon="pi pi-plus"
                label=" Vendor"
                className="flex h-3rem p-button-raised p-button-outlined "
                onClick={() => props.clickFunction()}
              ></Button>
            </Can>
          </div>
        );

      case "Recommendations":
        return (
          <div className="flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
            <Dropdown
              onChange={(e) => {
                setSelectedType(e.value);
                setGlobalFilter(e.target.value);
              }}
              placeholder="Urgency"
              options={["High", "Medium", "Low"]}
              value={selectedType}
              className="p-column-filter flex h-3rem"
              showClear
            />
            <Dropdown
              onChange={(e) => {
                setSelectedStat(e.value);
                setGlobalFilter(e.target.value);
              }}
              placeholder="Status"
              value={selectedStat}
              options={["Pending", "Accepted", "Declined"]}
              className="p-column-filter flex h-3rem"
              showClear
            />
            <Can do="add" on="Recommendation">
              <Button
                tooltip="Add Recommendation"
                tooltipOptions={{ position: "bottom" }}
                icon="pi pi-plus"
                label="New"
                className="flex h-3rem p-button-raised p-button-outlined"
                onClick={() => props.clickFunction()}
              />
            </Can>
          </div>
        );

      case "Manage Requests":
        return (
          <div className="flex  justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}

            <Dropdown
              onChange={(e) => {
                setSelectedType(e.value);
                setGlobalFilter(e.target.value);
              }}
              value={selectedType}
              options={[
                "Created",
                "Accepted",
                "Declined",
                "Ready",
                "Picked",
                "Returned",
                "Completed",
              ]}
              showClear
              placeholder="Select a Status"
              className="p-column-filter flex h-3rem"
            />
          </div>
        );

      case "Manage Tenants":
        return (
          <div className="flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}

            <Button
              label="Tenant"
              icon="pi pi-plus"
              className="flex h-3rem p-button-raised p-button-outlined "
              onClick={() => props.clickFunction()}
            ></Button>
          </div>
        );

      case "Assets In Inventory":
        return (
          <div className="flex justify-content-between flex-wrap md:flex-wrap">
            <h2 className="mt-2 flex">{props.tableHeader}</h2>
            {search}
            <Can do="edit" on="Inventory">
              <Button
                label="Asset"
                icon="pi pi-plus"
                className="flex h-3rem p-button-raised p-button-outlined"
                onClick={() => props.clickFunction()}
              ></Button>
            </Can>
          </div>
        );
      default:
        break;
    }
  };
  const header = renderHeader();
  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
      />
    );
  });

  return (
    <div>
      <div className="datatable-responsive-demo">
        <DataTable
          first={lazyParams.first}
          totalRecords={totalRecords}
          onPage={onPage}
          onSort={onSort}
          sortMode="multiple"
          multiSortMeta={props.multiSortMeta}
          loading={loading}
          ref={dt}
          filters={onFilter}
          emptyMessage="No items found."
          globalFilter={globalFilter}
          value={getData}
          className={classNames(
            "p-shadow-3",
            "p-datatable-gridlines",
            "p-datatable-responsive-demo",
            "mb-auto"
          )}
          dataKey="id"
          header={header}
          paginator
          rows={5}
          style={props.style}
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        >
          {dynamicColumns}
        </DataTable>
      </div>
    </div>
  );
};

TableUI.propTypes = {
  fetchFunction: PropTypes.func.isRequired,
  fetchFunction1: PropTypes.func,
  user: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  categories: state.categories.categories,
});

export default connect(mapStateToProps, {
  fetchCategories,
  fetchCategoryItemsN,
})(withRouter(TableUI));
