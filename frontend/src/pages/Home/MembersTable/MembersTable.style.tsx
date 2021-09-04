import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';
import Button from 'components/Button';
import { ReactComponent as CSV } from 'assets/csv.svg';
import { CSVLink } from 'react-csv';

export const MembersTableContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > :not(:last-child) {
    margin-bottom: ${getSpacing(2)};
  }
`;

export const StyledCSVLink = styled(CSVLink)`
  text-decoration: none;
  width: fit-content;
`;

export const CSVLogo = styled(CSV)`
  height: 30px;

  /* stylelint-disable-next-line selector-max-type */
  path {
    fill: ${colorUsage.primaryButtonColor};
  }
`;

export const DownloadButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > :not(:last-child) {
    margin-right: ${getSpacing(3)};
  }
`;
