import axios from "axios";
import {
  getUserProfileFailure,
  userProfileApiStart,
  getUserProfileSuccess,
  updateUserProfileDetailsSuccess,
  updateUserProfileDetailsFailure,
} from "../redux/slices/UserSlice";

const USER_DETAILS_API = `${import.meta.env.VITE_API_URL}/api/user`;

export const getUserProfileDetails = () => async (dispatch) => {
  dispatch(userProfileApiStart());
  try {
    const response = await axios.get(`${USER_DETAILS_API}/details`, {
      withCredentials: true,
    });

    dispatch(getUserProfileSuccess(response.data));
  } catch (err) {
    dispatch(getUserProfileFailure(err.message));
  }
};

export const updateUserProfileDetails = (body) => async (dispatch) => {
  dispatch(userProfileApiStart());
  const reqBody = {
    personal: {
      name: body.name,
      email: body.email,
      age: body.age,
      mobile: body.mobile,
      gender: body.gender,
    },
    fitness: {
      height: body.height,
      weight: body.weight,
    },
  };
  try {
    const response = await axios.patch(`${USER_DETAILS_API}/details`, reqBody, {
      withCredentials: true,
    });

    dispatch(updateUserProfileDetailsSuccess(response.data));
  } catch (err) {
    dispatch(updateUserProfileDetailsFailure(err.message));
  }
};
