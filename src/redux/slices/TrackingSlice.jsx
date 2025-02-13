import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mealTracker: null,
  weeklyProgress: null,
  monthlyTracker: null,
  loading: false,
  error: null,
};

const TrackerSlice = createSlice({
  name: "tracker",
  initialState,
  reducers: {
    trackingApiStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMealTrackerDataSuccess: (state, action) => {
      state.mealTracker = action.payload;
      state.loading = false;
    },
    getMealTrackerDataFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getWeeklyProgressDataSuccess: (state, action) => {
      state.weeklyProgress = action.payload;
      state.loading = false;
    },
    getWeeklyProgressDataFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    mealTrackerSuccess: (state, action) => {
      state.mealTracker = action.payload;
      state.loading = false;
    },
    mealTrackerFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  trackingApiStart,
  getMealTrackerDataSuccess,
  getMealTrackerDataFailure,
  getWeeklyProgressDataSuccess,
  getWeeklyProgressDataFailure,
  mealTrackerSuccess,
  mealTrackerFailure,
} = TrackerSlice.actions;

export default TrackerSlice.reducer;
