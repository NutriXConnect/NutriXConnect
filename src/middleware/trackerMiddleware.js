import axios from "axios";
import {
  getMealTrackerDataFailure,
  getMealTrackerDataSuccess,
  getWeeklyProgressDataFailure,
  getWeeklyProgressDataSuccess,
  mealTrackerFailure,
  mealTrackerSuccess,
  trackingApiStart,
} from "../redux/slices/TrackingSlice";

const MEAL_TRACKING_API = `${import.meta.env.VITE_API_URL}/api/track`;

export const getMealTrackingDetails =
  (date, userId = "") =>
  async (dispatch) => {
    dispatch(trackingApiStart());
    try {
      date = date.toISOString();
      const response = await axios.get(`${MEAL_TRACKING_API}`, {
        params: {
          userId,
          date,
        },
        withCredentials: true,
      });
      dispatch(getMealTrackerDataSuccess(response.data));
    } catch (error) {
      AxiosErrorHandler(error, getMealTrackerDataFailure, dispatch);
    }
  };

export const getWeeklyProgress = () => async (dispatch) => {
  dispatch(trackingApiStart());
  try {
    const response = await axios.get(`${MEAL_TRACKING_API}/weekly-progress`, {
      withCredentials: true,
    });
    dispatch(getWeeklyProgressDataSuccess(response.data));
  } catch (error) {
    AxiosErrorHandler(error, getWeeklyProgressDataFailure, dispatch);
  }
};

export const trackMealProgress =
  (mealPlanId, mealId, tracked) => async (dispatch, getState) => {
    dispatch(trackingApiStart());
    try {
      const state = getState();
      const trackingId = state.tracker.mealTracker._id;
      const response = await axios.patch(
        `${MEAL_TRACKING_API}/meal`,
        { trackingId, mealPlanId, mealId, tracked },
        { withCredentials: true }
      );
      dispatch(mealTrackerSuccess(response.data));
    } catch (error) {
      AxiosErrorHandler(error, mealTrackerFailure, dispatch);
    }
  };
