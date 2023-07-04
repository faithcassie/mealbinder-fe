import { createSlice } from "@reduxjs/toolkit";

export const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    selectDate: new Date(),
    isLoading: false,
    error: null,
    totalRecipes: null,
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectingDate(state, action) {
      state.isLoading = false;
      state.selectDate = action.payload;
    },
  },
  extraReducers: {},
});
const { actions } = plannerSlice;
export const { selectingDate } = actions;
