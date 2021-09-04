import React, { useEffect, useState } from 'react';
import {
  AdminContainer,
  GenerateUserContainer,
  LinkToCopy,
  Logo,
  Title,
  StyledCopyToClipboard,
} from './Admin.style';
import logo from 'assets/logo.svg';
import { FormattedMessage } from 'react-intl';
import {
  useAssociations,
  useDeleteManyUsers,
  useGenerateInscriptionLink,
  useGetUser,
} from './Admin.hooks';
import MembersTable from './UsersTable';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from 'components/Button';
import CopyToClipboard from 'react-copy-to-clipboard';
import { GridRowId } from '@mui/x-data-grid';

const Home: React.FunctionComponent = () => {
  const [{ value: users }, doGetUsers] = useGetUser();
  const { value: associations } = useAssociations();
  const [selectedAssociation, setSelectedAssociation] = useState<string | null>(null);
  const [generateInscriptionLinkState, doGenerateInscriptionLink] = useGenerateInscriptionLink();
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [deleteManyUsersState, doDeleteManyUsers] = useDeleteManyUsers();

  useEffect(() => {
    doGetUsers();
  }, [doGetUsers]);

  return (
    <AdminContainer>
      <Logo alt="DTGE logo" src={logo} />
      <Title>
        <FormattedMessage id="admin.title" />
      </Title>
      <Button
        disabled={selectedRows.length === 0 || deleteManyUsersState.loading}
        onClick={async () => {
          await doDeleteManyUsers(selectedRows);
          await doGetUsers();
        }}
      >
        Delete selected users
      </Button>
      {users !== undefined && <MembersTable users={users} setSelectedRows={setSelectedRows} />}
      {associations !== undefined && (
        <GenerateUserContainer>
          <Autocomplete
            id="association"
            options={associations}
            getOptionLabel={option => option}
            style={{ width: 300 }}
            onChange={(event, value) => setSelectedAssociation(value)}
            renderInput={params => (
              <TextField
                {...params}
                label={<FormattedMessage id="admin.generateInscriptionLink.association" />}
                variant="outlined"
              />
            )}
          />
          <Button
            type="submit"
            disabled={selectedAssociation === null || generateInscriptionLinkState.loading}
            onClick={() => doGenerateInscriptionLink(selectedAssociation as string)}
          >
            <FormattedMessage id="admin.generateInscriptionLink.submit-button" />
          </Button>
        </GenerateUserContainer>
      )}
      {generateInscriptionLinkState.value !== undefined && (
        <CopyToClipboard text={generateInscriptionLinkState.value}>
          <StyledCopyToClipboard>
            <LinkToCopy>{generateInscriptionLinkState.value}</LinkToCopy>
            <Button>
              <FormattedMessage id="admin.generateInscriptionLink.copy" />
            </Button>
          </StyledCopyToClipboard>
        </CopyToClipboard>
      )}
    </AdminContainer>
  );
};

export default Home;
