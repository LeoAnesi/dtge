import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { MemberDto } from '../Home.hooks';
import {
  CSVLogo,
  DownloadButton,
  MembersTableContainer,
  StyledCSVLink,
} from './DonationsTable.style';
import { FormattedMessage } from 'react-intl';

const columns: GridColDef[] = [
  {
    field: 'membershipDate',
    headerName: 'Date',
    width: 200,
    editable: false,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone',
    type: 'string',
    width: 150,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Mail',
    type: 'string',
    width: 250,
    editable: false,
  },
  {
    field: 'association',
    headerName: 'Association',
    type: 'string',
    width: 200,
    editable: false,
  },
  {
    field: 'amount',
    headerName: 'Participation',
    type: 'string',
    width: 200,
    editable: false,
  },
];

interface Props {
  donations: MemberDto[];
}

const MembersTable = ({ donations }: Props): JSX.Element => {
  const csvHeaders = columns.map(column => ({
    label: column.headerName as string,
    key: column.field as string,
  }));

  return (
    <MembersTableContainer>
      <StyledCSVLink data={donations} headers={csvHeaders}>
        <DownloadButton>
          <CSVLogo />
          <span>
            <FormattedMessage id="home.donations.download" />
          </span>
        </DownloadButton>
      </StyledCSVLink>
      <DataGrid rows={donations} columns={columns} pageSize={100} disableSelectionOnClick />
    </MembersTableContainer>
  );
};

export default MembersTable;
