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
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
  },
  {
    field: 'sex',
    headerName: 'Sexe',
    width: 150,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone',
    type: 'string',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Mail',
    type: 'string',
    width: 250,
  },
  {
    field: 'name',
    headerName: 'Formule',
    type: 'string',
    width: 200,
  },
  {
    field: 'association',
    headerName: 'Association',
    type: 'string',
    width: 200,
  },
  {
    field: 'amount',
    headerName: 'Participation',
    type: 'string',
    width: 200,
  },
  {
    field: 'firstMembership',
    headerName: 'Première adhésion',
    type: 'string',
    width: 250,
  },
  {
    field: 'address',
    headerName: 'Adresse',
    type: 'string',
    width: 250,
  },
  {
    field: 'zipCode',
    headerName: 'Code postal',
    type: 'string',
    width: 250,
  },
  {
    field: 'birthDate',
    headerName: 'Date de naissance',
    type: 'string',
    width: 250,
  },
  {
    field: 'originCity',
    headerName: "Ville d'origine",
    type: 'string',
    width: 250,
  },
  {
    field: 'lycee',
    headerName: 'Lycee',
    type: 'string',
    width: 200,
  },
  {
    field: 'universityName',
    headerName: 'École / prépa / Université',
    type: 'string',
    width: 200,
  },
  {
    field: 'classePrepa',
    headerName: 'Classé préparatoire',
    type: 'string',
    width: 200,
  },
  {
    field: 'activityField',
    headerName: "Secteur d'activité",
    type: 'string',
    width: 200,
  },
  {
    field: 'schoolAndTeachingSubject',
    headerName: 'Etablissement et discipline enseignée',
    type: 'string',
    width: 400,
  },
  {
    field: 'cursus',
    headerName: 'Cursus',
    type: 'string',
    width: 200,
  },
  {
    field: 'foreignInternship',
    headerName: "Stage à l'étranger",
    type: 'string',
    width: 200,
  },
  {
    field: 'career',
    headerName: 'Parcours / fonction',
    type: 'string',
    width: 400,
  },
  {
    field: 'associationEncounter',
    headerName: 'Comment as-tu connu DTGE ?',
    type: 'string',
    width: 400,
  },
  {
    field: 'engagement',
    headerName: 'Engagement (indicatif)',
    type: 'string',
    width: 300,
  },
].map(column => ({ ...column, editable: false }));

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
      <StyledCSVLink data={members} headers={csvHeaders} separator=";">
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
