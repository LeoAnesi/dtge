import { RootState } from 'redux/types';

export const getUserToken = (store: RootState): string | null => store.login.token;
