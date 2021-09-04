import React, { useMemo, useState } from 'react';
import { HomeContainer, Logo, PageHeader, Title } from './Home.style';
import logo from 'assets/logo.svg';
import { FormattedMessage } from 'react-intl';
import { useDTGEMembers } from './Home.hooks';
import MembersTable from './MembersTable';
import { MenuItem, Select } from '@material-ui/core';

const DTGE_CREATION_YEAR = 2019;
const range = (min: number, max: number): number[] =>
  [...Array(max - min + 1).keys()].map(i => i + min);

const Home = (): JSX.Element => {
  const { value: members } = useDTGEMembers();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number | undefined>(currentYear);
  const yearRange = range(DTGE_CREATION_YEAR, currentYear);

  const filteredMembers = useMemo(
    () =>
      members?.filter(
        member =>
          selectedYear === undefined || member.membershipDate.includes(selectedYear.toString()),
      ) ?? [],
    [members, selectedYear],
  );

  return (
    <HomeContainer>
      <Logo alt="DTGE logo" src={logo} />
      <PageHeader>
        <Title>
          <FormattedMessage id="home.title" />
        </Title>
        <Select
          value={selectedYear}
          onChange={event => setSelectedYear(event.target.value as number)}
        >
          <MenuItem>
            <em>None</em>
          </MenuItem>
          {yearRange.map(year => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </PageHeader>
      <MembersTable members={filteredMembers} />
    </HomeContainer>
  );
};

export default Home;
