import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  selectedSubscription: null,
  infoMessage: "",
  loading: false,
  error: null,
};

const SubscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    subscriptionLoadingStart: (state) => {
      state.infoMessage = "";
      state.loading = true;
      state.error = null;
    },
    getSubscriptionsSuccess: (state, action) => {
      state.loading = false;
      state.users = [...action.payload];
    },
    getSubscriptionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.selectedSubscription = action.payload;
    },
    getSubscriptionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSubscriptionSuccess: (state, action) => {
      state.loading = false;
      state.infoMessage = "Subscription dates updated successfully!";
      state.selectedSubscription = Object.assign(
        {},
        state.selectedSubscription,
        action.payload
      );
    },
    updateSubscriptionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.infoMessage = null;
    },
  },
});

export const {
  subscriptionLoadingStart,
  getSubscriptionsSuccess,
  getSubscriptionsFailure,
  getSubscriptionSuccess,
  getSubscriptionFailure,
  updateSubscriptionSuccess,
  updateSubscriptionFailure,
} = SubscriptionSlice.actions;

export default SubscriptionSlice.reducer;
