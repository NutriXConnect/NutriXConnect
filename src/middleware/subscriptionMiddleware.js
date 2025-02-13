import axios from "axios";
import {
  createDietPlanFailure,
  createDietPlanSuccess,
  getSubscriptionFailure,
  getSubscriptionsFailure,
  getSubscriptionsSuccess,
  getSubscriptionSuccess,
  getUserSubscriptionDetailsFailure,
  getUserSubscriptionDetailsSuccess,
  subscriptionLoadingStart,
  updateMealsFailure,
  updateMealsSuccess,
  updateSubscriptionFailure,
  updateSubscriptionStatusFailure,
  updateSubscriptionStatusSuccess,
  updateSubscriptionSuccess,
} from "../redux/slices/SubscriptionSlice";

const SUBSCRIPTION_API_URL = `${import.meta.env.VITE_API_URL}/api/subscription`;
export const getSubscriptionsList = () => async (dispatch) => {
  dispatch(subscriptionLoadingStart());
  try {
    const response = await axios.get(`${SUBSCRIPTION_API_URL}/users`, {
      withCredentials: true,
    });
    dispatch(getSubscriptionsSuccess(response.data));
  } catch (error) {
    AxiosErrorHandler(error, getSubscriptionsFailure, dispatch);
  }
};

export const getSubscriptionPageDetails =
  (subscriptionId) => async (dispatch) => {
    dispatch(subscriptionLoadingStart());
    try {
      const response = await axios.get(`${SUBSCRIPTION_API_URL}/page`, {
        params: { subscription: subscriptionId },
        withCredentials: true,
      });
      dispatch(getSubscriptionSuccess(response.data));
    } catch (error) {
      AxiosErrorHandler(error, getSubscriptionFailure, dispatch);
    }
  };

export const updateSubscriptionDates =
  (startDate, subscriptionId) => async (dispatch) => {
    dispatch(subscriptionLoadingStart());
    try {
      const response = await axios.patch(
        `${SUBSCRIPTION_API_URL}/dates/${subscriptionId}`,
        { startDate },
        {
          withCredentials: true,
        }
      );
      dispatch(updateSubscriptionSuccess(response.data));
    } catch (error) {
      AxiosErrorHandler(error, updateSubscriptionFailure, dispatch);
    }
  };
subscriptionLoadingStart;

export const createDietPlan = (user, subscription) => async (dispatch) => {
  dispatch(subscriptionLoadingStart());
  try {
    const response = await axios.post(
      `${SUBSCRIPTION_API_URL}/diet-plan`,
      { user, subscription },
      {
        withCredentials: true,
      }
    );
    dispatch(createDietPlanSuccess(response.data));
  } catch (error) {
    AxiosErrorHandler(error, createDietPlanFailure, dispatch);
  }
};

export const updateMeals = (meals, dietPlanId) => async (dispatch) => {
  dispatch(subscriptionLoadingStart());
  try {
    const response = await axios.put(
      `${SUBSCRIPTION_API_URL}/meals`,
      { mealPlan: meals, dietPlanId },
      {
        withCredentials: true,
      }
    );
    dispatch(updateMealsSuccess(response.data));
  } catch (error) {
    AxiosErrorHandler(error, updateMealsFailure, dispatch);
  }
};

export const updateSubscriptionStatus =
  (subscriptionId, status) => async (dispatch) => {
    dispatch(subscriptionLoadingStart());
    try {
      const response = await axios.patch(
        `${SUBSCRIPTION_API_URL}/status`,
        { status, subscriptionId },
        {
          withCredentials: true,
        }
      );
      dispatch(updateSubscriptionStatusSuccess(response.data));
    } catch (error) {
      AxiosErrorHandler(error, updateSubscriptionStatusFailure, dispatch);
    }
  };

//User facing subscription API methods
export const getUserSubscriptionDetails = () => async (dispatch) => {
  dispatch(subscriptionLoadingStart());
  try {
    const response = await axios.get(`${SUBSCRIPTION_API_URL}/user`, {
      withCredentials: true,
    });
    dispatch(getUserSubscriptionDetailsSuccess(response.data));
  } catch (error) {
    AxiosErrorHandler(error, getUserSubscriptionDetailsFailure, dispatch);
  }
};
