import jwt_decode from 'jwt-decode';
import { PATHS } from 'routes';
import { store } from 'redux/store';
import { getUserToken, userLoggedIn } from 'redux/Login';
import httpClient from './networking/client';
import { history } from './router';

interface AccessToken {
  exp: number;
}

function tokenHasExpired(token: AccessToken): boolean {
  if (!token.exp) return true;

  // Less than 10 seconds remaining => token has expired
  const now = new Date().getTime() / 1000;
  return token.exp - now < 10;
}

/**
 * This function assess the access token is still valid, if not it refreshes it.
 * In case of error during the refresh process it disconnects the user and redirects to the login page.
 */
export const checkToken = async (): Promise<void> => {
  const token = getUserToken(store.getState());

  if (token === null) {
    history.push(PATHS.LOGIN);
    throw new Error('No access token found');
  }

  const parsedToken = jwt_decode<AccessToken>(token);
  if (tokenHasExpired(parsedToken)) {
    try {
      const access = await httpClient.refreshToken();

      store.dispatch(userLoggedIn(access));
    } catch (e) {
      await httpClient.logout();
      history.push(PATHS.LOGIN);
      throw new Error('Unable to refresh access token');
    }
  }
};
