import { LoginState } from './Login';

export type RootState = Readonly<{
  login: LoginState;
}>;
