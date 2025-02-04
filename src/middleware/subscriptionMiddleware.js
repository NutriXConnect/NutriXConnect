import axios from "axios";
import {
  getSubscriptionFailure,
  getSubscriptionsFailure,
  getSubscriptionsSuccess,
  getSubscriptionSuccess,
  subscriptionLoadingStart,
  updateSubscriptionFailure,
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
        getSubscriptionFailure({ statusCode: err.code, message: err.message })
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
