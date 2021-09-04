import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { UserDto } from '../Admin.hooks';
import { MembersTableContainer } from './UsersTable.style';

const columns: GridColDef[] = [
  {
    field: 'email',
    headerName: 'Mail',
    width: 300,
    editable: false,
  },
  {
    field: 'roles',
    headerName: 'Roles',
    width: 200,
    editable: false,
  },
  {
    field: 'association',
    headerName: 'Association',
    type: 'string',
    width: 500,
    editable: false,
  },
];

interface Props {
  users: UserDto[];
}

const MembersTable = ({ users }: Props): JSX.Element => {
  return (
    <MembersTableContainer>
      <DataGrid rows={users} columns={columns} pageSize={20} disableSelectionOnClick />
    </MembersTableContainer>
  );
};

export default MembersTable;
