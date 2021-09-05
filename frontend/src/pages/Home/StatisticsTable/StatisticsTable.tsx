import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  CSVLogo,
  DownloadButton,
  MembersTableContainer,
  StyledCSVLink,
  TableHeader,
} from './StatisticsTable.style';
import { FormattedMessage } from 'react-intl';
import { useGetStats } from './StatisticsTable.hooks';
import { useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';

const columns: GridColDef[] = [
  {
    field: 'association',
    headerName: 'Association',
    width: 300,
  },
  {
    field: 'membershipsNumber',
    headerName: "Nombre d'Adhésions",
    width: 250,
    type: 'number',
  },
  {
    field: 'membershipsAmount',
    headerName: 'Adhésions €',
    type: 'number',
    width: 200,
  },
  {
    field: 'donationsNumber',
    headerName: 'Nombre de dons',
    type: 'number',
    width: 250,
  },
  {
    field: 'donationsAmount',
    headerName: 'Dons €',
    type: 'number',
    width: 200,
  },
  {
    field: 'total',
    headerName: 'Total €',
    type: 'number',
    width: 200,
  },
];

const MembersTable = (): JSX.Element => {
  const { value: stats } = useGetStats();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const csvHeaders = columns.map(column => ({
    label: column.headerName as string,
    key: column.field as string,
  }));

  if (stats === undefined) {
    return <></>;
  }

  const displayedStats = stats[selectedMonth];

  return (
    <MembersTableContainer>
      <TableHeader>
        <StyledCSVLink data={displayedStats} headers={csvHeaders}>
          <DownloadButton>
            <CSVLogo />
            <span>
              <FormattedMessage id="home.statistics.download" />
            </span>
          </DownloadButton>
        </StyledCSVLink>
        <Select
          value={selectedMonth}
          onChange={event => setSelectedMonth(event.target.value as string)}
        >
          {Object.keys(stats).map(yearAndMonth => (
            <MenuItem key={yearAndMonth} value={yearAndMonth}>
              {yearAndMonth}
            </MenuItem>
          ))}
        </Select>
      </TableHeader>
      <DataGrid
        rows={displayedStats.map(row => ({ ...row, id: row.association }))}
        columns={columns}
        pageSize={100}
        disableSelectionOnClick
      />
    </MembersTableContainer>
  );
};

export default MembersTable;
