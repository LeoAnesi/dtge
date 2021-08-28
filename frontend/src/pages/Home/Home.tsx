import * as React from 'react';
import { HomeContainer, Logo, Title } from './Home.style';
import logo from 'assets/logo.svg';
import { FormattedMessage } from 'react-intl';
import { useDTGEMembers } from './Home.hooks';
import MembersTable from './MembersTable';

const Home: React.FunctionComponent = () => {
  const { value: members } = useDTGEMembers();

  return (
    <HomeContainer>
      <Logo alt="DTGE logo" src={logo} />
      <Title>
        <FormattedMessage id="home.title" />
      </Title>
      {members !== undefined && <MembersTable members={members} />}
    </HomeContainer>
  );
};

export default Home;
