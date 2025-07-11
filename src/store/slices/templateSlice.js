import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  initialState: {
    selectedCategory: null,
    selectedTemplate: null,
    formData: {},
    generatedLetter: "",
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
      state.formData = {};
      state.generatedLetter = "";
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setGeneratedLetter: (state, action) => {
      state.generatedLetter = action.payload;
    },
    clearFormData: (state) => {
      state.formData = {};
      state.generatedLetter = "";
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedTemplate,
  updateFormData,
  setGeneratedLetter,
  clearFormData,
} = templateSlice.actions;

export default templateSlice.reducer;