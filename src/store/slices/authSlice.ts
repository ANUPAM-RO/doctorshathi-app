import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isAuthenticated: boolean;
  checkingSession: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  checkingSession: false,
  loading: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuthLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
      if (action.payload) {
        state.token = action.payload;
      }
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      state.token = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { startAuthLoading, authSuccess, authFailure, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
