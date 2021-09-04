import React, { useMemo, useState } from 'react';
import { HomeContainer, Logo, PageHeader, Title } from './Home.style';
import logo from 'assets/logo.svg';
import { FormattedMessage } from 'react-intl';
import { useDTGEMembers } from './Home.hooks';
import MembersTable from './MembersTable';
import { MenuItem, Select } from '@material-ui/core';
import groupBy from 'lodash/groupBy';

const generateScolarYear = (year: number) => `${year}/${year + 1}`;
const generateFirstOfJuneForYear = (year: number | string) => `${year}-06-01`;

const Home = (): JSX.Element => {
  const { value: members, loading } = useDTGEMembers();
  const today = new Date();
  const todaysYear = today.getFullYear();
  const hasPassedFirstOfJune =
    today.toISOString().slice(0, 9) > generateFirstOfJuneForYear(todaysYear);
  const [selectedScolarYear, setSelectedScolarYear] = useState<string>(
    hasPassedFirstOfJune ? generateScolarYear(todaysYear) : generateScolarYear(todaysYear - 1),
  );
  const { yearRange, membersBySchoolYear } = useMemo(() => {
    const membersBySchoolYear = groupBy(members, ({ membershipDate }) => {
      const membershipYear = parseInt(membershipDate.slice(0, 4));

      if (
        generateFirstOfJuneForYear(membershipYear - 1) < membershipDate &&
        membershipDate < generateFirstOfJuneForYear(membershipYear)
      ) {
        return generateScolarYear(membershipYear - 1);
      }

      return generateScolarYear(membershipYear);
    });

    return {
      membersBySchoolYear,
      yearRange: Object.keys(membersBySchoolYear),
    };
  }, [members]);

  return (
    <HomeContainer>
      <Logo alt="DTGE logo" src={logo} />
      <PageHeader>
        <Title>
          <FormattedMessage id="home.title" />
        </Title>
        {!loading && (
          <Select
            value={selectedScolarYear}
            onChange={event => setSelectedScolarYear(event.target.value as string)}
          >
            <MenuItem value="">
              <FormattedMessage id="home.all-years" />
            </MenuItem>
            {yearRange.map(year => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        )}
      </PageHeader>
      <MembersTable
        members={
          (selectedScolarYear !== '' ? membersBySchoolYear[selectedScolarYear] : members) ?? []
        }
      />
    </HomeContainer>
  );
};

export default Home;
