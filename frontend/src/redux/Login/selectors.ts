import { RootState } from 'redux/types';

export const getUserToken = (store: RootState): string | null => store.login.token;

export const getUserRoles = (store: RootState): string[] | undefined => store.login.user?.roles;
