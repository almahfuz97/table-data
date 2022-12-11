import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './styles.css'

const randomInt = () => {
  return Math.floor(Math.random() * 10);
};
const App = () => {

  const gridRef = useRef();
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    { field: 'id', filter: true },
    { field: 'first_name', filter: true },
    { field: 'last_name', filter: true },
    { field: 'email', filter: true },
    { field: 'gender' },
    { field: 'ip_address', filter: true },
    { field: 'airport code', filter: true },
    { field: 'time', filter: true },
    {
      field: 'status',
    },
    { field: 'mobile' },
    { field: 'area', filter: true },
    { field: 'show', filter: true },
    { field: 'edit', editable: true },
  ]);

  const rowClassRules = useMemo(() => {
    return {
      'status-false': (params) => {
        var sts = params.data.status;
        return sts === false
      },
      'status-true': 'data.status >= true',
    };
  }, []);

  const setDataValue = useCallback(() => {
    gridRef.current.api.forEachNode(function (rowNode) {
      rowNode.setDataValue('status', randomInt());
    });
  }, []);

  const defaultColDef = useMemo(() => ({
    sortable: true
  }));

  const cellClickedListener = useCallback(event => {
    console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetch('MOCK_DATA.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  }, []);



  return (
    <div>
      <div className="ag-theme-alpine" style={{ width: "100%", height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowClassRules={rowClassRules}
          animateRows={true}
          rowSelection='multiple'

          onCellClicked={cellClickedListener}
        />
      </div>
    </div>
  );
};

export default App;
