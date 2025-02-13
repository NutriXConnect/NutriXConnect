import axios from "axios";
import {
  setDietitians,
  setError,
  setLoading,
  setSelectedDietitian,
  setDietitianPlans,
} from "../redux/slices/DietitainSlice";
import { setPagination } from "../redux/slices/PaginationSlice";
import { AxiosErrorHandler } from "./errorMiddleware";

const DIETITIAN_DETAILS_API = `${import.meta.env.VITE_API_URL}/api/dietitian`;

export const getListings = (page, limit, sortBy) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`${DIETITIAN_DETAILS_API}/listings`, {
      withCredentials: true,
      params: {
        page,
        limit,
        sort: `${sortBy} asc`,
      },
    });
    const data = response.data;

    dispatch(setDietitians(data.data));
    dispatch(setPagination(data.pagination));
  } catch (error) {
    AxiosErrorHandler(error, setError, dispatch);
  }
};

export const getDietitianProfile =
  (id = "", selectFields = "") =>
  async (dispatch) => {
    dispatch(setLoading());
    const params = {};
    if (selectFields) params.select = selectFields;
    if (id) params.id = id;
    try {
      const response = await axios.get(`${DIETITIAN_DETAILS_API}/profile`, {
        params,
        withCredentials: true,
      });
      const data = response.data;

      dispatch(setSelectedDietitian(data));
    } catch (error) {
      AxiosErrorHandler(error, setError, dispatch);
    }
  };

export const updateDietitianProfile = (body) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${DIETITIAN_DETAILS_API}/profile`,
      { ...body },
      {
        withCredentials: true,
      }
    );
    const data = response.data;

    dispatch(setSelectedDietitian(data));
  } catch (error) {
    AxiosErrorHandler(error, setError, dispatch);
  }
};

export const getDietitianProfilePlans = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`${DIETITIAN_DETAILS_API}/plans`, {
      withCredentials: true,
    });
    const data = response.data;

    dispatch(setDietitianPlans(data));
  } catch (error) {
    AxiosErrorHandler(error, setError, dispatch);
  }
};

export const updateDietitianPlan = (plan) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const planId = plan._id;
    delete plan._id;
    const response = await axios.put(
      `${DIETITIAN_DETAILS_API}/plan/${planId}`,
      { ...plan },
      { withCredentials: true }
    );
    dispatch(getDietitianProfilePlans());
  } catch (error) {
    AxiosErrorHandler(error, setError, dispatch);
  }
};

export const createDietitianPlan = (plan) => async (dispatch) => {
  dispatch(setLoading());
  try {
    delete plan._id;
    console.log(plan);
    const response = await axios.post(
      `${DIETITIAN_DETAILS_API}/plans`,
      { ...plan },
      { withCredentials: true }
    );
    dispatch(getDietitianProfilePlans());
  } catch (error) {
    AxiosErrorHandler(error, setError, dispatch);
  }
};

export const deleteDietitianPlan = (planId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await axios.delete(`${DIETITIAN_DETAILS_API}/plan/${planId}`, {
      withCredentials: true,
    });
    dispatch(getDietitianProfilePlans());
  } catch (error) {
    AxiosErrorHandler(error, setError, dispatch);
  }
};
