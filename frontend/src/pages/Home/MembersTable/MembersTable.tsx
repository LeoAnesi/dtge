import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { MemberDto } from '../Home.hooks';
import {
  CSVLogo,
  DownloadButton,
  MembersTableContainer,
  StyledCSVLink,
} from './MembersTable.style';
import { FormattedMessage } from 'react-intl';

const columns: GridColDef[] = [
  {
    field: 'membershipDate',
    headerName: 'Membership Date',
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
  {
    field: 'lycee',
    headerName: 'Lycee',
    type: 'string',
    width: 200,
    editable: false,
  },
  {
    field: 'universityName',
    headerName: 'École / prépa / Université',
    type: 'string',
    width: 200,
    editable: false,
  },
  {
    field: 'classePrepa',
    headerName: 'Classé préparatoire',
    type: 'string',
    width: 200,
    editable: false,
  },
  {
    field: 'activityField',
    headerName: "Secteur d'activité",
    type: 'string',
    width: 200,
    editable: false,
  },
  {
    field: 'cursus',
    headerName: 'Cursus',
    type: 'string',
    width: 200,
    editable: false,
  },
];

interface Props {
  members: MemberDto[];
}

const MembersTable = ({ members }: Props): JSX.Element => {
  const csvHeaders = columns.map(column => ({
    label: column.headerName as string,
    key: column.field as string,
  }));

  return (
    <MembersTableContainer>
      <StyledCSVLink data={members} headers={csvHeaders}>
        <DownloadButton>
          <CSVLogo />
          <span>
            <FormattedMessage id="home.members.download" />
          </span>
        </DownloadButton>
      </StyledCSVLink>
      <DataGrid rows={members} columns={columns} pageSize={100} disableSelectionOnClick />
    </MembersTableContainer>
  );
};

export default MembersTable;
