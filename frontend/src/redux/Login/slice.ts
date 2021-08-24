import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoginState = Readonly<{
  token: string | null;
}>;

const initialState: LoginState = { token: null };

const loginSlice = createSlice({
  name: 'Login',
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    userLoggedOut: () => initialState,
  },
});

export const { userLoggedIn, userLoggedOut } = loginSlice.actions;
export default loginSlice.reducer;
