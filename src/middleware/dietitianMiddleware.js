import axios from "axios";
import {
  setDietitians,
  setError,
  setLoading,
  setSelectedDietitian,
} from "../redux/slices/DietitainSlice";

const DIETITIAN_DETAILS_API = `${import.meta.env.VITE_API_URL}/api/dietitian`;

export const getListings = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`${DIETITIAN_DETAILS_API}/listings`, {
      withCredentials: true,
    });
    const data = response.data;

    dispatch(setDietitians(data.data));
  } catch (e) {
    dispatch(setError(e));
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
