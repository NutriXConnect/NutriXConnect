import axios from "axios";

import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  forgotPasswordSuccess,
  forgotPasswordStart,
  forgotPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  setError,
  logoutStart,
} from "../redux/slices/AuthSlice";
import { AxiosErrorHandler } from "./errorMiddleware";

const AUTH_API = `${import.meta.env.VITE_API_URL}/api`;

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      `${AUTH_API}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    const userDetails = response.data;

    localStorage.setItem("user", JSON.stringify(userDetails));

    dispatch(loginSuccess(userDetails));
  } catch (error) {
    AxiosErrorHandler(error, loginFailure, dispatch);
  }
};

export const signup = (request) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const response = await axios.post(`${AUTH_API}/user`, request);
    const user = response.data;
    dispatch(signupSuccess(user));
  } catch (error) {
    console.log(error);
    AxiosErrorHandler(error, signupFailure, dispatch);
  }
};

export const signout = () => async (dispatch) => {
  dispatch(logoutStart());
  try {
    const response = await axios.get(`${AUTH_API}/auth/logout`);
    localStorage.removeItem("user");
    dispatch(logout());
  } catch (error) {
    console.log(error);
    AxiosErrorHandler(error, setError, dispatch);
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordStart());
  try {
    const response = await axios.patch(`${AUTH_API}/auth/forgot-password`, {
      email,
    });
    if (response.status == 200) {
      const data = response.data;
      dispatch(forgotPasswordSuccess(data.userId));
    }
  } catch (error) {
    AxiosErrorHandler(error, forgotPasswordFailure, dispatch);
  }
};

export const resetPassword = (otp, userId, newPassword) => async (dispatch) => {
  dispatch(resetPasswordStart());
  try {
    const response = await axios.patch(
      `${AUTH_API}/auth/reset-password/${userId}`,
      {
        otp: otp,
        password: newPassword,
      }
    );
    dispatch(resetPasswordSuccess("Password reset successful."));
  } catch (error) {
    AxiosErrorHandler(error, resetPasswordFailure, dispatch);
  }
};
