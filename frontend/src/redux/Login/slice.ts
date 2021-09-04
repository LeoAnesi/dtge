import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

export type LoginState = Readonly<{
  token: string | null;
  user: User | null;
}>;

const initialState: LoginState = { token: null, user: null };

const loginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<{ token: string; user?: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user ?? state.user;
    },
    userLoggedOut: () => initialState,
  },
});

export const { userLoggedIn, userLoggedOut } = loginSlice.actions;
export default loginSlice.reducer;
