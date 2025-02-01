import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  orders: null,
  goals: null,
  error: null,
  loading: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userProfileApiStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },
    getUserProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserProfileDetailsSuccess: (state, actions) => {
      state.profile = action.payload;
      state.error = null;
      state.loading = false;
    },
    updateUserProfileDetailsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUserOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    getUserOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  userProfileApiStart,
  getUserProfileSuccess,
  getUserProfileFailure,
  updateUserProfileDetailsSuccess,
  updateUserProfileDetailsFailure,
  getUserOrdersStart,
  getUserOrdersSuccess,
  getUserOrdersFailure,
} = UserSlice.actions;

export default UserSlice.reducer;
