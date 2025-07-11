import { createSlice } from "@reduxjs/toolkit";

const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("shikawa-language") || "urdu";
  }
  return "urdu";
};

const languageSlice = createSlice({
  name: "language",
  initialState: {
    currentLanguage: getInitialLanguage(),
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("shikawa-language", action.payload);
      }
    },
    toggleLanguage: (state) => {
      const newLanguage = state.currentLanguage === "urdu" ? "english" : "urdu";
      state.currentLanguage = newLanguage;
      if (typeof window !== "undefined") {
        localStorage.setItem("shikawa-language", newLanguage);
      }
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;