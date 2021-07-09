import { useTournamentContext } from '../hooks/useTournamentContext';
import { competitionEngine } from 'tods-competition-factory';
import { useEffect, useState } from 'react';
import { Table, Checkbox } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

const { Column, HeaderCell, Cell } = Table;

/*
 * Source: https://rsuitejs.com/components/table/
 */

function RsuiteTable() {
  const { tournamentState } = useTournamentContext();
  const competitionParticipants = tournamentState?.refreshCount
    ? competitionEngine.getCompetitionParticipants({ inContext: true }).competitionParticipants || []
    : [];

  const handleAction = (rowData) => console.log({ rowData });

  const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ marginLeft: '0px', paddingTop: '1px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        style={{ paddingTop: '0px' }}
        checked={checkedKeys.some((item) => item === rowData[dataKey])}
      />
    </Cell>
  );

  const [checkedKeys, setCheckedKeys] = useState([]);

  let checked = false;
  let indeterminate = false;

  if (competitionParticipants.length && checkedKeys.length === competitionParticipants.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < competitionParticipants.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const nextCheckedKeys = checked ? competitionParticipants.map((p) => p.participantId) : [];
    setCheckedKeys(nextCheckedKeys);
  };

  const handleCheck = (value, checked) => {
    const nextCheckedKeys = checked ? [...checkedKeys, value] : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(nextCheckedKeys);
  };

  const [tableHeight, setTableHeight] = useState(window.innerHeight - 100);

  useEffect(() => {
    const handleResize = () => {
      setTableHeight(window.innerHeight - 100);
    };

    window.addEventListener('resize', handleResize, false);
    return () => window.removeEventListener('resize', handleResize, false);
  });

  return (
    <>
      <Table
        wordWrap
        virtualized
        height={tableHeight}
        loading={!competitionParticipants.length}
        data={competitionParticipants || []}
        onRowClick={(data) => {
          console.log(data);
        }}
      >
        <Column width={50} align="center">
          <HeaderCell style={{ padding: 0 }}>
            <div style={{ lineHeight: '40px' }}>
              <Checkbox inline checked={checked} indeterminate={indeterminate} onChange={handleCheckAll} />
            </div>
          </HeaderCell>
          <CheckCell dataKey="participantId" checkedKeys={checkedKeys} onChange={handleCheck} />
        </Column>

        <Column flexGrow={1} align="left" sortable={true} minWidth={200}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="participantName" />
        </Column>

        <Column width={120} resizable={true}>
          <HeaderCell>Type</HeaderCell>
          <Cell dataKey="participantType" />
        </Column>
        <Column width={120} align="right" fixed="right">
          <HeaderCell>Action</HeaderCell>

          <Cell>
            {(rowData) => {
              return (
                <span>
                  <a onClick={() => handleAction(rowData)}> Action </a>
                </span>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </>
  );
}

export default RsuiteTable;
