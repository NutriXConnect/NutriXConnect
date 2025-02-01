import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentResponse: null,
  error: null,
};

const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentProcessStarted: (state) => {
      state.error = null;
    },
    paymentProcessSuccess: (state, action) => {
      state.paymentResponse = action.payload;
    },
    paymentProcessFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  paymentProcessStarted,
  paymentProcessSuccess,
  paymentProcessFailure,
} = PaymentSlice.actions;

export default PaymentSlice.reducer;
