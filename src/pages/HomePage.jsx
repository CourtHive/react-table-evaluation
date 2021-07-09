import { useTournamentContext } from '../hooks/useTournamentContext';
import { Button, Grid, Paper } from '@material-ui/core';
import { mocksEngine } from 'tods-competition-factory';
import MenuItem from '@material-ui/core/MenuItem';
import TMXSelect from '../components/TMXSelect';
import { useState } from 'react';

import GridOTables from '../Tables/GridOTables';
import BaseTable from '../Tables/BaseTable';
import RsuiteTable from '../Tables/RSuite';
import AGGrid from '../Tables/AGGrid';

import { rows } from '../Tables/comparison';

function HomePage() {
  const {
    tournamentState: { tournamentId },
    setTournamentRecords
  } = useTournamentContext();

  const handleClick = () => {
    if (tournamentId) {
      setTournamentRecords({});
    } else {
      const drawProfiles = [{ drawSize: 32 }];
      const participantsProfile = { participantsCount: 1000, participantType: 'PAIR' };
      const { tournamentRecord } = mocksEngine.generateTournamentRecord({ drawProfiles, participantsProfile });
      setTournamentRecords(tournamentRecord);
    }
  };

  const tableTypes = rows.map(({ name }) => name);
  const tableOptions = tableTypes.map((tableType) => ({ value: tableType }));
  const [selectedTable, setTable] = useState('-');
  const selectTable = (event) => {
    const value = event.target.value;
    setTable(value);
  };

  const handleRowClick = (name) => setTable(name);
  const visitURL = () => {
    const tableData = rows.find((row) => row.name === selectedTable);
    if (tableData?.url) window.open(tableData.url);
  };

  return (
    <div>
      <Grid container direction="row" justifyContent="flex-start">
        <TMXSelect id="table" variant="outlined" value={selectedTable} onChange={selectTable}>
          <MenuItem value={'-'}>
            <b>Feature Comparison</b>
          </MenuItem>
          {tableOptions.map((t) => (
            <MenuItem key={t.value} value={t.value}>
              {t.value}
            </MenuItem>
          ))}
        </TMXSelect>
        {selectedTable === '-' ? null : (
          <Button variant="outlined" onClick={visitURL} style={{ marginLeft: '1em' }}>
            {`Open ${selectedTable} Website`}
          </Button>
        )}
        <Button variant="outlined" onClick={handleClick} style={{ marginLeft: '1em' }}>
          {tournamentId ? 'Clear Data' : 'Load Data'}
        </Button>
      </Grid>
      <Paper style={{ margin: '1em' }}>
        {selectedTable === 'Ag-Grid' ? (
          <AGGrid />
        ) : selectedTable === 'BaseTable' ? (
          <BaseTable />
        ) : selectedTable === 'RSuite' ? (
          <RsuiteTable />
        ) : (
          <GridOTables onClick={handleRowClick} />
        )}
      </Paper>
    </div>
  );
}

export default HomePage;
