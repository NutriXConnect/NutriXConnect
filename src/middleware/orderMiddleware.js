import axios from "axios";
import { razorpayCheckout } from "./razorpayMiddleware";
import { paymentProcessFailure } from "../redux/slices/PaymentSlice";
import { AxiosErrorHandler } from "./errorMiddleware";

const ORDER_DETAILS_API = `${import.meta.env.VITE_API_URL}/api/order`;

export const createOrder =
  (planId, dietitianId, user, status = "pending") =>
  async (dispatch) => {
    try {
      const response = await axios.post(
        `${ORDER_DETAILS_API}/${planId}`,
        {
          dietitianId,
          userId: user.email,
          status,
        },
        { withCredentials: true }
      );

      dispatch(razorpayCheckout(response.data), user);
    } catch (error) {
      AxiosErrorHandler(error, paymentProcessFailure, dispatch);
      return;
    }
  };
