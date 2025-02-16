import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isAuthenticated: !!localStorage.getItem("user"),
  error: null,
  loading: false,
  forgotEmailVerified: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logout: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    forgotPasswordStart: (state) => {
      state.forgotEmailVerified = false;
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.user = action.payload;
      state.forgotEmailVerified = true;
      state.loading = false;
      state.error = null;
    },
    forgotPasswordFailure: (state, action) => {
      state.forgotEmailVerified = false;
      state.loading = false;
      state.error = action.payload;
    },
    resetPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.forgotEmailVerified = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    resetPasswordFailure: (state, action) => {
      state.forgotEmailVerified = false;
      state.loading = false;
      state.error = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logoutStart,
  logout,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  setError,
  clearError,
} = AuthSlice.actions;

export default AuthSlice.reducer;
