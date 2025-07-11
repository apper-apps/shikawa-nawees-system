import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    isPaymentRequired: true,
    sessionPaid: false,
    tid: null,
    paymentHistory: [],
  },
  reducers: {
    setPaymentRequired: (state, action) => {
      state.isPaymentRequired = action.payload;
    },
    setSessionPaid: (state, action) => {
      state.sessionPaid = action.payload;
    },
    setTid: (state, action) => {
      state.tid = action.payload;
    },
    addPaymentHistory: (state, action) => {
      state.paymentHistory.push(action.payload);
    },
    clearPaymentSession: (state) => {
      state.sessionPaid = false;
      state.tid = null;
    },
  },
});

export const {
  setPaymentRequired,
  setSessionPaid,
  setTid,
  addPaymentHistory,
  clearPaymentSession,
} = paymentSlice.actions;

export default paymentSlice.reducer;