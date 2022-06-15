import { useHistory } from 'react-router';
import client from 'services/networking/client';
import { PATHS } from 'routes';
import { useDispatch } from 'react-redux';
import { FormValues } from 'pages/Login/service';
import { userLoggedIn, userLoggedOut } from './slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import useAsyncFn, { AsyncFnReturn } from 'react-use/lib/useAsyncFn';

export const useLogout = (): AsyncFnReturn<() => Promise<void>> => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  return useAsyncFn(
    async (): Promise<void> => {
      await client.logout();
      dispatch(userLoggedOut());
      push(PATHS.LOGIN);
    },
  );
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
      const { token, user } = await client.login(values);
      if (token !== undefined) {
        dispatch(userLoggedIn({ token, user }));
        push(PATHS.HOME);
      } else {
        throw new Error('No token in login response body');
      }
    },
    [push, dispatch],
  );
};
