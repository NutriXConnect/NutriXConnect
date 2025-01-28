import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
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
  },
});

export const {
  userProfileApiStart,
  getUserProfileSuccess,
  getUserProfileFailure,
  updateUserProfileDetailsSuccess,
  updateUserProfileDetailsFailure,
} = UserSlice.actions;

export default UserSlice.reducer;
