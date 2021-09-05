import React, { useMemo, useState } from 'react';
import { HomeContainer, PageHeader, Title } from './Home.style';
import { FormattedMessage } from 'react-intl';
import { MemberDto, MembershipType, useDTGEMembers } from './Home.hooks';
import MembersTable from './MembersTable';
import { MenuItem, Select } from '@material-ui/core';
import groupBy from 'lodash/groupBy';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DonationsTable from './DonationsTable';

const generateScolarYear = (year: number) => `${year}/${year + 1}`;
const generateFirstOfJuneForYear = (year: number | string) => `${year}-06-01`;
const groupByScholarYear = (memberships: MemberDto[]) =>
  groupBy(memberships, ({ membershipDate }) => {
    const membershipYear = parseInt(membershipDate.slice(0, 4));

    if (
      generateFirstOfJuneForYear(membershipYear - 1) < membershipDate &&
      membershipDate < generateFirstOfJuneForYear(membershipYear)
    ) {
      return generateScolarYear(membershipYear - 1);
    }

    return generateScolarYear(membershipYear);
  });
enum TABS {
  MEMBERSHIP = 'memberships',
  DONATIONS = 'donations',
}

// eslint-disable-next-line complexity
const Home = (): JSX.Element => {
  const { value: memberships, loading } = useDTGEMembers();
  const [selectedTab, setSelectedTab] = useState(TABS.MEMBERSHIP);
  const today = new Date();
  const todaysYear = today.getFullYear();
  const hasPassedFirstOfJune =
    today.toISOString().slice(0, 9) > generateFirstOfJuneForYear(todaysYear);
  const [selectedScolarYear, setSelectedScolarYear] = useState<string>(
    hasPassedFirstOfJune ? generateScolarYear(todaysYear) : generateScolarYear(todaysYear - 1),
  );
  const {
    [MembershipType.MEMBERSHIP]: members,
    [MembershipType.DONATION]: donations,
  } = useMemo(() => groupBy(memberships, 'type'), [memberships]);
  const { yearRange, membersBySchoolYear, donationsBySchoolYear } = useMemo(() => {
    const membersBySchoolYear = groupByScholarYear(members);
    const donationsBySchoolYear = groupByScholarYear(donations);

    return {
      membersBySchoolYear,
      donationsBySchoolYear,
      yearRange: Object.keys(membersBySchoolYear),
    };
  }, [members, donations]);

  return (
    <HomeContainer>
      <Tabs value={selectedTab} onChange={(event, value) => setSelectedTab(value)}>
        {Object.values(TABS).map(tabTranslationKey => (
          <Tab
            key={tabTranslationKey}
            label={<FormattedMessage id={`home.tabs.${tabTranslationKey}`} />}
            value={tabTranslationKey}
          />
        ))}
      </Tabs>
      <PageHeader>
        <Title>
          <FormattedMessage id={`home.title.${selectedTab}`} />
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
      {selectedTab === TABS.MEMBERSHIP && (
        <MembersTable
          members={
            (selectedScolarYear !== '' ? membersBySchoolYear[selectedScolarYear] : members) ?? []
          }
        />
      )}
      {selectedTab === TABS.DONATIONS && (
        <DonationsTable
          donations={
            (selectedScolarYear !== '' ? donationsBySchoolYear[selectedScolarYear] : donations) ??
            []
          }
        />
      )}
    </HomeContainer>
  );
};

export default Home;
