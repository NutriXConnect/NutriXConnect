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
} from "../redux/slices/AuthSlice";

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
    dispatch(loginFailure("Login failed. Please try again."));
  }
};

export const signup = (request) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const response = await axios.post(`${AUTH_API}/user`, request);
    const user = response.data;
    dispatch(signupSuccess(user));
  } catch (error) {
    dispatch(signupFailure(error));
  }
};

export const signout = () => async (dispatch) => {
  try {
    const response = await axios.get(`${AUTH_API}/auth/logout`);
    localStorage.removeItem("user");
    dispatch(logout());
  } catch (error) {
    dispatch(setError(error));
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
    if (error.status == 404) {
      dispatch(
        forgotPasswordFailure("Email address not found. Please Signup.")
      );
    } else {
      dispatch(
        forgotPasswordFailure("Failed to validate Email address. Try again.")
      );
    }
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
    if (error.status == 404) {
      dispatch(resetPasswordFailure("User not found."));
    } else {
      dispatch(resetPasswordFailure("Failed to reset password. Try again."));
    }
  }
};
