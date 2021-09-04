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
import { useAssociations, useGenerateInscriptionLink, useGetUser } from './Admin.hooks';
import MembersTable from './UsersTable';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from 'components/Button';
import CopyToClipboard from 'react-copy-to-clipboard';

const Home: React.FunctionComponent = () => {
  const [{ value: users }, doGetUsers] = useGetUser();
  const { value: associations } = useAssociations();
  const [selectedAssociation, setSelectedAssociation] = useState<string | null>(null);
  const [state, doGenerateInscriptionLink] = useGenerateInscriptionLink();

  useEffect(() => {
    doGetUsers();
  }, [doGetUsers]);

  return (
    <AdminContainer>
      <Logo alt="DTGE logo" src={logo} />
      <Title>
        <FormattedMessage id="admin.title" />
      </Title>
      {users !== undefined && <MembersTable users={users} />}
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
            disabled={selectedAssociation === null || state.loading}
            onClick={() => doGenerateInscriptionLink(selectedAssociation as string)}
          >
            <FormattedMessage id="admin.generateInscriptionLink.submit-button" />
          </Button>
        </GenerateUserContainer>
      )}
      {state.value !== undefined && (
        <CopyToClipboard text={state.value}>
          <StyledCopyToClipboard>
            <LinkToCopy>{state.value}</LinkToCopy>
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
