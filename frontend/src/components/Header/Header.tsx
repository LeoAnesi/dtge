import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import logo from 'assets/logo.svg';
import Link from 'components/Link';
import { PATHS } from 'routes';
import { Logo, HeaderContainer, HeaderLinks } from './Header.style';
import { getUserRoles, getUserToken } from 'redux/Login';
import useSelector from 'redux/useSelector';
import { useLocation } from 'react-router';
import { useLogout } from 'redux/Login/hooks';
import Button from 'components/Button';

const Header: React.FC = () => {
  const isUserLoggedIn = Boolean(useSelector(getUserToken));
  const userRoles = useSelector(getUserRoles);
  const { pathname } = useLocation();

  const [, logout] = useLogout();

  return (
    <HeaderContainer>
      <RouterLink to={PATHS.HOME}>
        <Logo alt="Forge logo" src={logo} />
      </RouterLink>
      {isUserLoggedIn && (
        <HeaderLinks>
          {(userRoles ?? []).includes('admin') && (
            <RouterLink to={PATHS.ADMIN}>
              <Button>
                <FormattedMessage id="header.admin" />
              </Button>
            </RouterLink>
          )}
          <Link as="button" onClick={logout}>
            <FormattedMessage id="header.logout" />
          </Link>
        </HeaderLinks>
      )}
      {!isUserLoggedIn && pathname !== PATHS.LOGIN && (
        <Link as={RouterLink} to={PATHS.LOGIN}>
          <FormattedMessage id="header.login" />
        </Link>
      )}
    </HeaderContainer>
  );
};

export default Header;
