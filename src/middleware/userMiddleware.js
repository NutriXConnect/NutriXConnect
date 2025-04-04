import axios from "axios";
import {
  getUserProfileFailure,
  userProfileApiStart,
  getUserProfileSuccess,
  updateUserProfileDetailsSuccess,
  updateUserProfileDetailsFailure,
  getUserOrdersStart,
  getUserOrdersSuccess,
  getUserOrdersFailure,
} from "../redux/slices/UserSlice";
import { setPagination } from "../redux/slices/PaginationSlice";
import { AxiosErrorHandler } from "./errorMiddleware";

const USER_DETAILS_API = `${import.meta.env.VITE_API_URL}/api/user`;
const ORDER_DETAILS_API = `${import.meta.env.VITE_API_URL}/api/order`;

export const getUserProfileDetails = () => async (dispatch) => {
  dispatch(userProfileApiStart());
  try {
    const response = await axios.get(`${USER_DETAILS_API}/details`, {
      withCredentials: true,
    });

    dispatch(getUserProfileSuccess(response.data));
  } catch (error) {
    AxiosErrorHandler(error, getUserProfileFailure, dispatch);
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
  } catch (error) {
    AxiosErrorHandler(error, updateUserProfileDetailsFailure, dispatch);
  }
};

export const getUserProfileOrders =
  (page, limit, sortBy = "createdAt") =>
  async (dispatch) => {
    dispatch(getUserOrdersStart());
    try {
      const response = await axios.get(`${ORDER_DETAILS_API}/profile-orders`, {
        params: {
          page,
          limit,
          sort: `${sortBy} asc`,
        },
        withCredentials: true,
      });

      dispatch(getUserOrdersSuccess(response.data.data));
      dispatch(setPagination(response.data.pagination));
    } catch (error) {
      AxiosErrorHandler(error, getUserOrdersFailure, dispatch);
    }
  };
