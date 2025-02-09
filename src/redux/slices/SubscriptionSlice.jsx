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
      state.infoMessage = "Some error occured. Please try again later.";
    },
    createDietPlanSuccess: (state, action) => {
      state.loading = false;
      state.infoMessage = "Diet plan created successfully!";
      state.selectedSubscription = Object.assign(
        {},
        state.selectedSubscription,
        { dietPlan: action.payload }
      );
    },
    createDietPlanFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.infoMessage =
        "Some error occurred while creating a new plan. Please try again later";
    },
    updateMealsSuccess: (state, action) => {
      state.loading = false;
      state.infoMessage = "Meal plan updated successfully!";
      state.selectedSubscription = Object.assign(
        {},
        state.selectedSubscription,
        { dietPlan: action.payload }
      );
    },
    updateMealsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.infoMessage =
        "Some error occurred while updating meals. Please try again later.";
    },
    updateSubscriptionStatusSuccess: (state, action) => {
      state.loading = false;
      state.infoMessage = "Subscription status updated successfully!";
      state.selectedSubscription = Object.assign(
        {},
        state.selectedSubscription,
        { status: action.payload }
      );
    },
    updateSubscriptionStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.infoMessage =
        "Some error occurred while updating subscription status. Please try again later.";
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
  createDietPlanSuccess,
  createDietPlanFailure,
  updateMealsSuccess,
  updateMealsFailure,
  updateSubscriptionStatusSuccess,
  updateSubscriptionStatusFailure,
} = SubscriptionSlice.actions;

export default SubscriptionSlice.reducer;
