import * as React from 'react';
import { HomeContainer, Logo, Title } from './Home.style';
import logo from 'assets/logo.svg';
import { FormattedMessage } from 'react-intl';

const Home: React.FunctionComponent = () => (
  <HomeContainer>
    <Logo alt="DTGE logo" src={logo} />
    <Title>
      <FormattedMessage id="home.title" />
    </Title>
  </HomeContainer>
);

export default Home;
