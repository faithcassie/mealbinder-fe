import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../api/apiService";

export const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    isDeleted: false,
    isEditing: false,
    isLoading: false,
    error: null,
    totalRecipes: null,
    recipeList: [],
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    editRecipe: (state, action) => {
      state.isEditing = true;
    },

    createRecipeSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      const newRecipe = action.payload;
      state.recipeList[newRecipe._id] = newRecipe;
    },
  },
  extraReducers: {},
});

export const { editRecipe } = recipeSlice.actions;

export const getRecipes =
  ({ userId }) =>
  async (dispatch) => {
    dispatch(recipeSlice.actions.startLoading());
    try {
      const response = await apiService.get(`/recipes`);
    } catch (error) {
      dispatch(recipeSlice.actions.hasError(error.message));
    }
  };

export const createRecipe =
  ({ title, measurement, ingredientList, instructions }) =>
  async (dispatch) => {
    dispatch(recipeSlice.actions.startLoading());
    try {
      const response = await apiService.post("/recipes", {
        title,
        measurement,
        ingredientList,
        instructions,
      });
      // dispatch(createRecipeSuccess(response.data));
      // dispatch(getRecipes);
    } catch (error) {
      dispatch(recipeSlice.actions.hasError(error.message));
    }
  };
