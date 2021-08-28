import * as React from 'react';
import { HomeContainer, Logo, Title } from './Home.style';
import logo from 'assets/logo.svg';
import { FormattedMessage } from 'react-intl';
import { useDTGEMembers } from './Home.hooks';

const Home: React.FunctionComponent = () => {
  const { value } = useDTGEMembers();

  return (
    <HomeContainer>
      <Logo alt="DTGE logo" src={logo} />
      <Title>
        <FormattedMessage id="home.title" />
      </Title>
      {value !== undefined && JSON.stringify(value)}
    </HomeContainer>
  );
};

export default Home;
