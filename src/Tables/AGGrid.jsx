import { useTournamentContext } from '../hooks/useTournamentContext';
import { competitionEngine } from 'tods-competition-factory';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function AGGrid() {
  const { tournamentState } = useTournamentContext();
  const competitionParticipants = tournamentState?.refreshCount
    ? competitionEngine.getCompetitionParticipants({ inContext: true }).competitionParticipants || []
    : [];

  const defaultColDef = {
    autoHeight: true,
    sortable: true,
    resizable: true,
    filter: true,
    lockVisible: true,
    floatingFilter: false
  };

  const columnDefs = [
    {
      field: 'checkbox',
      width: 40,
      suppressMenu: true,
      checkboxSelection: () => true,
      headerCheckboxSelection: () => true,
      headerCheckboxSelectionFilteredOnly: true
    },
    {
      headerName: 'Name',
      field: 'participantName',
      wrapText: true,
      minWidth: 150,
      initialFlex: 1,
      // floatingFilter: true,
      filterParams: {
        buttons: ['reset']
      }
    },
    {
      headerName: 'Type',
      field: 'participantType'
    },
    {
      headerName: 'Gender',
      field: 'sex',
      cellRenderer: (params) => {
        const sex =
          params.data?.person?.sex ||
          params.data?.individualParticipants
            ?.map(({ person }) => person?.sex)
            .filter((f) => f)
            .join('/');
        return sex && `<span title="the tooltip">${sex}</span>`;
      }
    },
    {
      headerName: 'Nationality',
      field: 'nationality',
      wrapText: true,
      // floatingFilter: true,
      filterParams: {
        buttons: ['reset']
      },
      cellRenderer: (params) => {
        const nationalityCode =
          params.data?.person?.nationalityCode ||
          params.data?.individualParticipants
            ?.map(({ person }) => person?.nationalityCode)
            .filter((f) => f)
            .join('/');
        return nationalityCode && `<span title="the tooltip">${nationalityCode}</span>`;
      }
    }
  ];

  const [gridApi, setGridApi] = useState(null);
  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const [tableHeight, setTableHeight] = useState(window.innerHeight - 100);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => gridApi?.resetRowHeights(), 50);
      setTableHeight(window.innerHeight - 100);
    };

    window.addEventListener('resize', handleResize, false);
    return () => window.removeEventListener('resize', handleResize, false);
  });

  return (
    <>
      <div className="ag-theme-material" style={{ height: tableHeight, width: '100%' }}>
        <AgGridReact
          onGridReady={onGridReady}
          defaultColDef={defaultColDef}
          rowData={competitionParticipants}
          columnDefs={columnDefs}
          rowSelection={'multiple'}
          suppressCellSelection={true}
        />
      </div>
    </>
  );
}

export default AGGrid;
