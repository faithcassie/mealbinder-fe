import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../api/apiService";

export const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    selectDate: new Date(),
    isLoading: false,
    error: null,
    totalMealPrep: null,
    plannersByDate: {},
    mealListByDate: [],
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      if (state.error === "Get planner not found") {
        state.mealListByDate = [];
      }
    },
    selectingDate(state, action) {
      state.isLoading = false;
      state.selectDate = action.payload;
    },
    createNewPlanSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newPlanner = action.payload;
      state.mealListByDate = newPlanner.mealList;
    },
    getPlannerByDateSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { planner, mealCount } = action.payload;
      state.mealListByDate = planner.mealList;
      state.totalMealPrep = mealCount;
    },
    updateMealListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatePlanner = action.payload;
      state.mealListByDate = updatePlanner.mealList;
    },
  },
  extraReducers: {},
});
const { actions } = plannerSlice;
export const { selectingDate } = actions;

export const createNewPlan =
  ({ mealList, date }) =>
  async (dispatch) => {
    dispatch(plannerSlice.actions.startLoading);
    try {
      const response = await apiService.post("/planners", {
        mealList,
        date,
      });
      dispatch(plannerSlice.actions.createNewPlanSuccess(response.data));
    } catch (error) {
      dispatch(plannerSlice.actions.hasError(error.message));
    }
  };

export const getPlannerByDate =
  ({ date }) =>
  async (dispatch) => {
    dispatch(plannerSlice.actions.startLoading);
    try {
      const params = { date };
      const response = await apiService.get("/planners", { params });
      dispatch(plannerSlice.actions.getPlannerByDateSuccess(response.data));
    } catch (error) {
      dispatch(plannerSlice.actions.hasError(error.message));
    }
  };

export const updateMealList =
  ({ recipeId, date }) =>
  async (dispatch) => {
    dispatch(plannerSlice.actions.startLoading);
    try {
      const response = await apiService.put("/planners", { date, recipeId });
      dispatch(plannerSlice.actions.updateMealListSuccess(response.data));
    } catch (error) {
      dispatch(plannerSlice.actions.hasError(error.message));
    }
  };
