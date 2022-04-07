import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import classNames from "classnames";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const DataTableDynamicDemo = (props) => {
  const [products, setProducts] = useState([]);
  const columns = props.columns;
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [globalFilter, setGlobalFilter] = useState(null);

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
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLazyData = () => {
    setLoading(true);

    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }

    //imitate delay of a backend call
    loadLazyTimeout = setTimeout(() => {
      props
        .fetchFunction({ lazyEvent: JSON.stringify(lazyParams) })
        .then((data) => {
          setTotalRecords(data.payload.bk_size);
          setProducts(data.payload.data);
          setLoading(false);
        });
    }, Math.random() * 1000 + 250);
  };
  const onPage = (event) => {
    setLazyParams(event);
  };

  const onSort = (event) => {
    setLazyParams(event);
  };

  const onFilter = (event) => {
    event["first"] = 0;
    setLazyParams(event);
  };
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

  const reset = () => {
    setGlobalFilter("");
    dt.current.reset();
  };
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
    return (
      <div className="flex flex-wrap justify-content-between md:flex-wrap">
        <h2 className="mt-2 flex">{props.tableHeader}</h2>
        {search}
        {props.headData}
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div>
      <DataTable
        value={products}
        lazy
        header={header}
        responsiveLayout="scroll"
        dataKey="id"
        paginator
        first={lazyParams.first}
        rows={5}
        ref={dt}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
        sortField={lazyParams.sortField}
        sortOrder={lazyParams.sortOrder}
        onFilter={onFilter}
        filters={lazyParams.filters}
        loading={loading}
        globalFilter={globalFilter}
        className={classNames(
          "p-shadow-3",
          "p-datatable-gridlines",
          "p-datatable-responsive-demo",
          "mb-auto"
        )}
        style={{
          width: "76vw",
          marginLeft: "15px",
          marginBottom: "0px",
          marginTop: "0px",
        }}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      >
        {dynamicColumns}
      </DataTable>
    </div>
  );
};

export default DataTableDynamicDemo;
