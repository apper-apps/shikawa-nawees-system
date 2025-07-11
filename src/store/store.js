import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slices/languageSlice";
import templateSlice from "./slices/templateSlice";
import paymentSlice from "./slices/paymentSlice";

export const store = configureStore({
  reducer: {
    language: languageSlice,
    template: templateSlice,
    payment: paymentSlice,
  },
});