import { createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { APIStatus, SigninPayload, SignupPayload, UserInfo } from '@/types';
import * as UserAPIs from '@/service/user';

type UserState = UserInfo & APIStatus;
const initialState: UserState = {
  user: null,
  accessToken: '',
  error: '',
  loading: false,
};

export const signIn = createAsyncThunk<UserInfo, SigninPayload>('auth/signin', UserAPIs.signIn);
export const signUp = createAsyncThunk<UserInfo, SignupPayload>('auth/signup', UserAPIs.signUp);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.accessToken = '';
    },
    resetError: (state) => {
      state.error = '';
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.loading = false;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.loading = false;
      state.error = 'Email or password is incorrect';
    });

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.user = null;
      state.accessToken = '';
      state.loading = false;
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.user = null;
      state.accessToken = '';
      state.loading = false;
      state.error = 'Account creation failed';
    });
  }
});

export default userSlice.reducer;

export const { signOut, resetError } = userSlice.actions;
