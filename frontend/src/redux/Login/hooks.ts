import { useHistory } from 'react-router';
import client from 'services/networking/client';
import { PATHS } from 'routes';
import { useDispatch } from 'react-redux';
import * as Sentry from '@sentry/browser';
import jwt_decode from 'jwt-decode';
import { FormValues } from 'pages/Login/service';
import { userLoggedIn } from './slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { AsyncFnReturn } from 'react-use/lib/useAsyncFn';

export const useLogout = (): AsyncFnReturn<(...args: Record<string, never>[]) => Promise<void>> => {
  const { push } = useHistory();

  return useTypedAsyncFn<Record<string, never>>(async () => {
    await client.logout();
    push(PATHS.LOGIN);
  }, [push]);
};

export const useLogin = (): AsyncFnReturn<(
  ...args: {
    values: FormValues;
  }[]
) => Promise<void>> => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  return useTypedAsyncFn<{ values: FormValues }>(
    async ({ values }) => {
      const token: string | undefined = await client.login(values);
      if (token !== undefined) {
        dispatch(userLoggedIn(token));
        Sentry.configureScope(scope => {
          scope.setUser({
            email: values.email,
            ...jwt_decode(token),
          });
        });
        push(PATHS.HOME);
      } else {
        throw new Error('No token in login response body');
      }
    },
    [push, dispatch],
  );
};
