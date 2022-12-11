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

// import React, { useCallback, useMemo, useRef, useState } from 'react';
// import { render } from 'react-dom';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import './styles.css';

// const App = () => {
//   const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
//   const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
//   const [rowData, setRowData] = useState();
//   const [columnDefs, setColumnDefs] = useState([
//     { field: 'athlete', pinned: 'left' },
//     { field: 'age', pinned: 'left' },
//     {
//       field: 'country',
//       colSpan: (params) => {
//         const country = params.data.country;
//         if (country === 'Russia') {
//           // have all Russia age columns width 2
//           return 2;
//         } else if (country === 'United States') {
//           // have all United States column width 4
//           return 4;
//         } else {
//           // all other rows should be just normal
//           return 1;
//         }
//       },
//     },
//     { field: 'year' },
//     { field: 'date' },
//     { field: 'sport' },
//     { field: 'gold' },
//     { field: 'silver' },
//     { field: 'bronze' },
//     { field: 'total' },
//   ]);
//   const defaultColDef = useMemo(() => {
//     return {
//       width: 150,
//       resizable: true,
//     };
//   }, []);

//   const onGridReady = useCallback((params) => {
//     fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
//       .then((resp) => resp.json())
//       .then((data) => setRowData(data));
//   }, []);

//   return (
//     <div style={containerStyle}>
//       <div style={gridStyle} className="ag-theme-alpine">
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={columnDefs}
//           defaultColDef={defaultColDef}
//           onGridReady={onGridReady}
//         ></AgGridReact>
//       </div>
//     </div>
//   );
// };

// export default App;