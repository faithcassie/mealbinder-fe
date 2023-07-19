import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
      console.log(action.payload);
    },
    selectingDate(state, action) {
      state.isLoading = false;
      state.selectDate = action.payload;
    },
    createNewPlanSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { planner, mealCount } = action.payload;
      state.mealListByDate = planner.mealList;
      state.totalMealPrep = mealCount;
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
      const { planner, mealCount } = action.payload;
      state.mealListByDate = planner.mealList;
      state.totalMealPrep = mealCount;
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
    const currentDate = new Date(); // Get the current date

    if (new Date(date) < currentDate) {
      dispatch(
        plannerSlice.actions.hasError(
          "Date cannot be older than the current date"
        )
      );
      toast.info("Sorry, you cannot add a meal to a previous day.");
      return;
    }
    try {
      const response = await apiService.post("/planners", {
        mealList,
        date,
      });
      dispatch(plannerSlice.actions.createNewPlanSuccess(response.data));
      toast.success("Recipe added to planner successfully.");
    } catch (error) {
      dispatch(plannerSlice.actions.hasError(error.message));
      if (error.message === "Recipe exists") {
        toast.info("Recipe already existed.");
      }
      // toast.error(error.message);
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
      toast.success("Update planner successfully.");
    } catch (error) {
      dispatch(plannerSlice.actions.hasError(error.message));
    }
  };
