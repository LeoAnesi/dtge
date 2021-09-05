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
import TabPannel from 'components/TabPannel';
import StatisticsTable from './StatisticsTable';

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
  STATS = 'stats',
}

const Home = (): JSX.Element => {
  const { value: memberships, loading } = useDTGEMembers();
  const [selectedTab, setSelectedTab] = useState(TABS.MEMBERSHIP);
  const today = new Date();
  const todaysYear = today.getFullYear();
  const hasPassedFirstOfJune =
    today.toISOString().slice(0, 10) >= generateFirstOfJuneForYear(todaysYear);
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
  const selectedMembers = useMemo(
    () => (selectedScolarYear !== '' ? membersBySchoolYear[selectedScolarYear] : members) ?? [],
    [selectedScolarYear, membersBySchoolYear, members],
  );
  const selectedDonations = useMemo(
    () => (selectedScolarYear !== '' ? donationsBySchoolYear[selectedScolarYear] : donations) ?? [],
    [selectedScolarYear, donationsBySchoolYear, donations],
  );

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
        {!loading && selectedTab !== TABS.STATS && (
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
      <TabPannel value={TABS.MEMBERSHIP} selectedValue={selectedTab}>
        <MembersTable members={selectedMembers} />
      </TabPannel>
      <TabPannel value={TABS.DONATIONS} selectedValue={selectedTab}>
        <DonationsTable donations={selectedDonations} />
      </TabPannel>
      <TabPannel value={TABS.STATS} selectedValue={selectedTab}>
        <StatisticsTable />
      </TabPannel>
    </HomeContainer>
  );
};

export default Home;
