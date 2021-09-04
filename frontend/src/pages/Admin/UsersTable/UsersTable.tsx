import * as React from 'react';
import { DataGrid, GridColDef, GridRowId, GridRowParams } from '@mui/x-data-grid';
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
  setSelectedRows: (userIds: GridRowId[]) => void;
}

const MembersTable = ({ users, setSelectedRows }: Props): JSX.Element => {
  return (
    <MembersTableContainer>
      <DataGrid
        onSelectionModelChange={newSelection => setSelectedRows(newSelection)}
        checkboxSelection={true}
        isRowSelectable={(params: GridRowParams) => !params.row.roles.includes('admin')}
        rows={users}
        columns={columns}
        pageSize={20}
        disableSelectionOnClick
      />
    </MembersTableContainer>
  );
};

export default MembersTable;
