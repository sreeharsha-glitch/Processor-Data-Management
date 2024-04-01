import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


const VISIBLE_FIELDS = [
  'ID', 'name', 'Product Collection', 'Code Name', 'Vertical Segment', 'Status',
  'Lithography', '# of Cores', 'Processor Base Frequency', 'Cache', 'Bus Speed',
  'TDP', 'VID Voltage Range', 'Embedded Options Available', 'Datasheet',
  'Sockets Supported', 'TCASE', 'Processing Die Size', '# of Processing Die Transistors',
  'Low Halogen Options Available', 'Physical Address Extensions', 'ECC Memory Supported',
  'Package Size', 'Intel 64', 'Idle States', 'Enhanced Intel SpeedStep Technology',
  'Intel Demand Based Switching', 'Intel Trusted Execution Technology', 'Execute Disable Bit'
];

const CustomCheckboxFilter = ({ values, onChange }) => {
  const handleCheckboxChange = (value) => {
    onChange(value);
  };

  return (
    <div>
      {values.map(value => (
        <div key={value}>
          <label>
            <input
              type="checkbox"
              value={value}
              onChange={(e) => handleCheckboxChange(e.target.value)}
            />
            {value}
          </label>
        </div>
      ))}
    </div>
  );
};

export default function InitialFilters({ data }) {
  const [filters, setFilters] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value
    }));
  };

  const handleRowSelection = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
    console.log("New Selection:", newSelection);
  };

  /* Added code */
  useEffect(() => {
    console.log("Selected Rows:", selectedRows);
  }, [selectedRows]);

  const rows = Object.keys(data).map(key => {
    const rowData = data[key];
    const row = { id: key };

    row['ID'] = key;
    row['name'] = rowData.name;

    if (rowData.Essentials) {
      Object.entries(rowData.Essentials).forEach(([field, value]) => {
        row[field] = value;
      });
    }

    if (rowData.Performance) {
      Object.entries(rowData.Performance).forEach(([field, value]) => {
        row[field] = value;
      });
    }

    if (rowData['Supplemental Information']) {
      Object.entries(rowData['Supplemental Information']).forEach(([field, value]) => {
        row[field] = value;
      });
    }


    if (rowData['Memory Specifications']) {
      Object.entries(rowData['Memory Specifications']).forEach(([field, value]) => {
        row[field] = value;
      });
    }


    if (rowData['Package Specifications']) {
      Object.entries(rowData['Package Specifications']).forEach(([field, value]) => {
        row[field] = value;
      });
    }


    if (rowData['Advanced Technologies']) {
      Object.entries(rowData['Advanced Technologies']).forEach(([field, value]) => {
        row[field] = value;
      });
    }


    if (rowData['Security & Reliability']) {
      Object.entries(rowData['Security & Reliability']).forEach(([field, value]) => {
        row[field] = value;
      });
    }

    return row;
  });

  const columns = VISIBLE_FIELDS.map(field => ({
    field,
    headerName: field,
    width: 200,
    filterable: true,
    sortable: false,
    filterDropdown: () => (
      <CustomCheckboxFilter
        values={Array.from(new Set(rows.map(row => row[field])))}
        onChange={(value) => handleFilterChange(field, value)}
      />
    )
  }));

  const selectedRowsData = rows.filter(row => selectedRows.includes(row.id));

  return (
    <div style={{ height: 700, width: '100%' }}>
      <div>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
          Intel Management Tools
        </h1>
        <p className="mb-6 ml-[-188px] text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Intel provides a variety of tools and methods to complete similar actions but with different user experiences depending on the needs of the administrator.
        </p>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        checkboxSelection
     
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectedRows(newSelectionModel)
        }}
      />

      <br />


      <div className='ml-[5px] mb-[200px]'>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <b>Selected Rows for Comparison:</b>
          <ul>
  {selectedRowsData.map(row => (
    <li key={row.id}>
  
      <div>
        {VISIBLE_FIELDS.map(field => (
          <div key={field}>
            <span>{field}: </span>
            <span>{row[field]}</span>
          </div>
        ))}
      </div>
      

      <div>
        <b>Selected Rows:</b>
        {selectedRowsData.map(selectedRow => (
          <div key={selectedRow.id}>{selectedRow.name}</div>
        ))}
      </div>
    </li>
  ))}
</ul>


        </Box>

        {console.log(selectedRowsData)}
      </div>
    </div>

  );
}
