import { useTournamentContext } from '../hooks/useTournamentContext';
import BaseTable, { AutoResizer } from 'react-base-table';
import { competitionEngine } from 'tods-competition-factory';

import 'react-base-table/styles.css';

/*
 * Source: https://autodesk.github.io/react-base-table/examples/default
 */

function ReactBaseTable() {
  const { tournamentState } = useTournamentContext();
  const competitionParticipants = tournamentState?.refreshCount
    ? competitionEngine.getCompetitionParticipants({ inContext: true }).competitionParticipants || []
    : [];

  const Gender = ({ gender }) => (
    <div
      style={{
        backgroundColor: gender === 'MALE' ? 'lightblue' : gender === 'FEMALE' ? 'pink' : 'lightgreen',
        color: 'white',
        borderRadius: '3px',
        width: '20px',
        height: '20px',
        fontSize: '16px',
        fontWeight: 'bold',
        lineHeight: '20px',
        textAlign: 'center'
      }}
      gender={gender}
    >
      {gender === 'male' ? '♂' : '♀'}
    </div>
  );

  const columns = [
    {
      title: 'Name',
      dataKey: 'participantName',
      align: 'left',
      width: 50,
      flexGrow: 1,
      resizeable: true,
      sortable: true,
      key: 'column-1'
    },
    {
      title: 'Type',
      dataKey: 'participantType',
      flexGrow: 0,
      width: 200,
      resizeable: true,
      sortable: true,
      key: 'column-2'
    },
    {
      title: 'Gender',
      align: 'center',
      flexGrow: 0,
      width: 200,
      resizeable: true,
      sortable: true,
      key: 'column-3',
      cellRenderer: ({ rowData }) => {
        const gender =
          rowData?.person?.sex ||
          rowData?.individualParticipants
            ?.map(({ person }) => person?.sex)
            .filter((f) => f)
            .join('/');
        return <Gender gender={gender} />;
      }
    },
    {
      title: 'Nationality',
      align: 'center',
      flexGrow: 0,
      width: 200,
      resizeable: true,
      sortable: true,
      key: 'column-4',
      cellRenderer: ({ rowData }) => {
        const nationalityCode =
          rowData?.person?.nationalityCode ||
          rowData?.individualParticipants
            ?.map(({ person }) => person?.nationalityCode)
            .filter((f) => f)
            .join('/');
        return nationalityCode;
      }
    }
  ];

  return (
    <>
      <div style={{ width: '100%', height: '90vh' }}>
        <AutoResizer>
          {({ width, height }) => (
            <BaseTable
              columns={columns}
              data={competitionParticipants}
              width={width}
              height={height}
              disabled={!competitionParticipants.length}
            ></BaseTable>
          )}
        </AutoResizer>
      </div>
    </>
  );
}

export default ReactBaseTable;
