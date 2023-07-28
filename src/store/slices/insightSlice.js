import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../api/apiService";

export const insightSlice = createSlice({
  name: "insight",
  initialState: {
    isTesting: "",
    isLoading: false,
    error: null,
    recipeInsight: [],
    mealInsight: [],
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getTagDataSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.recipeInsight = action.payload;
    },
    getMealDataSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.mealInsight = action.payload;
    },
  },
  extraReducers: {},
});

const { actions } = insightSlice;
export const { testAction } = actions;

export const getTagData = () => async (dispatch) => {
  dispatch(insightSlice.actions.startLoading());
  try {
    const response = await apiService.get("/insights/recipesbytag");
    dispatch(insightSlice.actions.getTagDataSuccess(response.data));
  } catch (error) {
    dispatch(insightSlice.actions.hasError(error.message));
  }
};

export const getMealData = () => async (dispatch) => {
  dispatch(insightSlice.actions.startLoading());
  try {
    const response = await apiService.get("/insights/mealsbydate");
    dispatch(insightSlice.actions.getMealDataSuccess(response.data));
  } catch (error) {
    dispatch(insightSlice.actions.hasError(error.message));
  }
};
