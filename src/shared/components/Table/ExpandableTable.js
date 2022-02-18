import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from '../service/ProductService';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';

const ExpandableTable = props => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [miniFilter, setMiniFilter] = useState(null);

  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);
  const isMounted = useRef(false);
  // const productService = new ProductService();
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 1,
    page: 2,
  });
  const [getExpandData, setgetExpandData] = useState(null);

  const [getData, setgetData] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  let loadLazyTimeout = null;
  const dt = useRef(null);
  const mt = useRef(null);
  // useEffect(() => {
  //     if (isMounted.current) {
  //         const summary = expandedRows !== null ? 'All Rows Expanded' : 'All Rows Collapsed';
  //         toast.current.show({severity: 'success', summary: `${summary}`, life: 3000});
  //     }
  // }, [expandedRows]);

  // useEffect(() => {
  //     isMounted.current = true;
  //     productService.getProductsWithOrdersSmall().then(data => setProducts(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]);

  const LoadFunction = fetcht => {
    fetcht({ lazyEvent: JSON.stringify(lazyParams) }).then(data => {
      setTotalRecords(data.payload.bk_size);
      setgetData(data.payload.data);
      setLoading(false);
    });
  };

  const LoadFunction1 = fetcht => {
    fetcht({ lazyEvent: JSON.stringify(lazyParams) }).then(data => {
      setTotalRecords(data.payload.bk_size);
      setgetExpandData(data.payload.data);
      setLoading(false);
    });
  };
  const loadLazyData = () => {
    setLoading(true);
    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }
    //imitate delay of a backend call
    loadLazyTimeout = setTimeout(() => {
      const fetcht = props.fetchFunction;
      const fetcht1 = props.fetchFunction1;

      LoadFunction(fetcht);
      LoadFunction1(fetcht1);
    });
  };

  //   const expandAll = () => {
  //     let _expandedRows = {};
  //     products.forEach(p => (_expandedRows[`${p.id}`] = true));

  //     setExpandedRows(_expandedRows);
  //   };

  const collapseAll = () => {
    setExpandedRows(null);
  };
  const reset = () => {
    setGlobalFilter('');
    setMiniFilter('');
    dt.current.reset();
    mt.current.reset();
  };

  const search = (
    <div className="p-inputgroup flex h-3rem w-5">
      <span className="p-inputgroup-addon">
        <i className="pi pi-search"></i>
      </span>
      <InputText
        type="search"
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
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
  const searchPro = (
    <div className="p-inputgroup flex h-3rem w-5">
      <span className="p-inputgroup-addon">
        <i className="pi pi-search"></i>
      </span>
      <InputText
        type="search"
        value={miniFilter}
        onChange={e => setMiniFilter(e.target.value)}
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
  const rowExpansionTemplate = data => {
    return (
      <>
        <div className="orders-subtable flex justify-content-between flex-wrap md:flex-wrap">
          <h4>
            {props.subtitle} for {data.title}
          </h4>
          {searchPro}
        </div>
        <div>
          <DataTable
            value={getExpandData}
            responsiveLayout="scroll"
            ref={mt}
            dataKey="id"
            globalFilter={miniFilter}
            emptyMessage="No items found."
          >
            {dynamicExColumns}
          </DataTable>
        </div>
      </>
    );
  };
  const mainColumns = props.mainColumns;

  const dynamicColumns = mainColumns.map((col, index) => {
    return (
      <Column
        key={index}
        field={col.field}
        header={col.header}
        body={col.body}
        sortable={true}
      />
    );
  });

  const exColumns = props.exColumns;
  const dynamicExColumns = exColumns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        sortable={true}
      />
    );
  });
  //   const header = (
  //     <div className="table-header-container">
  //       <Button
  //         icon="pi pi-plus"
  //         label="Expand All"
  //         onClick={expandAll}
  //         className="mr-2"
  //       />
  //       <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
  //     </div>
  //   );

  const renderHeader = () => {
    switch (props.subtitle) {
      case 'Assets':
        return (
          <div className="flex flex-wrap justify-content-between md:flex-wrap">
            {/* <h2 className="mt-2 flex">{props.subtitle}</h2> */}
            {search}
          </div>
        );
      case 'Inventories':
        return (
          <div className="flex flex-wrap justify-content-between md:flex-wrap">
            {/* <h2 className="mt-2 flex">{props.subtitle}</h2> */}
            {search}
          </div>
        );
      case 'Decommissioned Assets':
        return (
          <div className="flex flex-wrap justify-content-between md:flex-wrap">
            {/* <h2 className="mt-2 flex">{props.subtitle}</h2> */}
            {search}
          </div>
        );

      default:
        break;
    }
  };

  const header = renderHeader();

  return (
    <div className="datatable-rowexpansion-demo w-full">
      <DataTable
        value={getData}
        expandedRows={expandedRows}
        onRowToggle={e => setExpandedRows(e.data)}
        responsiveLayout="scroll"
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey="id"
        stripedRows
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        paginator
        rows={5}
        ref={dt}
        globalFilter={globalFilter}
        emptyMessage="No items found."
        header={header}
        className={classNames(
          'p-shadow-3',
          'p-datatable-gridlines',
          'p-datatable-responsive-demo',
          'mb-auto'
        )}
        style={{
          width: '76vw',
          marginLeft: '15px',
          marginBottom: '0px',
          marginTop: '0px',
        }}
      >
        <Column expander style={{ width: '3em' }} />
        {dynamicColumns}
      </DataTable>
    </div>
  );
};

ExpandableTable.propTypes = {
  fetchFunction: PropTypes.func.isRequired,
  fetchFunction1: PropTypes.func,
};

export default ExpandableTable;
