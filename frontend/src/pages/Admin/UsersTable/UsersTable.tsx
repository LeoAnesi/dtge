import * as React from 'react';
import { DataGrid, GridRowId, GridRowParams } from '@mui/x-data-grid';
import { UserDto } from '../Admin.hooks';
import { MembersTableContainer } from './UsersTable.style';
import { useColumns } from './UsersTable.hooks';

interface Props {
  users: UserDto[];
  setSelectedRows: (userIds: GridRowId[]) => void;
}

const MembersTable = ({ users, setSelectedRows }: Props): JSX.Element => {
  const columns = useColumns();

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
