import axios from "axios";
import {
  setDietitians,
  setError,
  setLoading,
  setSelectedDietitian,
} from "../redux/slices/DietitainSlice";
import { setPagination } from "../redux/slices/PaginationSlice";

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
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const getDietitianProfile = (dietitianId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(
      `${DIETITIAN_DETAILS_API}/profile/${dietitianId}`,
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    // console.log(response);

    dispatch(setSelectedDietitian(data));
  } catch (e) {
    dispatch(setError(e));
  }
};
