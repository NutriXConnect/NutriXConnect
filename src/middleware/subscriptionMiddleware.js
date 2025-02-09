import axios from "axios";
import {
  createDietPlanFailure,
  createDietPlanSuccess,
  getSubscriptionFailure,
  getSubscriptionsFailure,
  getSubscriptionsSuccess,
  getSubscriptionSuccess,
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
  } catch (err) {
    dispatch(
      getSubscriptionsFailure({ statusCode: err.code, message: err.message })
    );
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
    } catch (err) {
      dispatch(
        getSubscriptionFailure({
          statusCsubscriptionLoadingStartode: err.code,
          message: err.message,
        })
      );
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
    } catch (err) {
      dispatch(
        updateSubscriptionFailure({
          statusCode: err.code,
          message: err.message,
        })
      );
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
  } catch (err) {
    dispatch(
      createDietPlanFailure({
        statusCode: err.code,
        message: err.message,
      })
    );
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
  } catch (err) {
    dispatch(
      updateMealsFailure({
        statusCode: err.code,
        message: err.message,
      })
    );
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
    } catch (err) {
      dispatch(
        updateSubscriptionStatusFailure({
          statusCode: err.code,
          message: err.message,
        })
      );
    }
  };
