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
    recipeData: null,
    // tagList: null,
    recipeImage: "",
    newRecipe: null,
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
      state.recipeList.push(newRecipe);
      state.newRecipe = action.payload;
    },
    getRecipesSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.recipeList = action.payload; // ?
    },
    getRecipeDetailsSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.recipeData = action.payload;
    },
    updateRecipeImage: (state, action) => {
      state.recipeImage = action.payload;
    },
  },
  extraReducers: {},
});

export const { editRecipe, updateRecipeImage } = recipeSlice.actions;

export const getRecipes = () => async (dispatch) => {
  dispatch(recipeSlice.actions.startLoading());
  try {
    const response = await apiService.get(`/recipes`);
    dispatch(recipeSlice.actions.getRecipesSuccess(response.data));
    // console.log(response.data);
  } catch (error) {
    dispatch(recipeSlice.actions.hasError(error.message));
  }
};

export const getRecipeDetails = (recipeId) => async (dispatch) => {
  dispatch(recipeSlice.actions.startLoading());
  try {
    const response = await apiService.get(`/recipes/${recipeId}`);
    dispatch(recipeSlice.actions.getRecipeDetailsSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    dispatch(recipeSlice.actions.hasError(error.message));
  }
};

export const createRecipe =
  ({ title, ingredientList, instructions, tagList, imageUrl }) =>
  async (dispatch) => {
    dispatch(recipeSlice.actions.startLoading());
    try {
      const response = await apiService.post("/recipes", {
        title,
        ingredientList,
        instructions,
        tagList,
        imageUrl,
      });
      dispatch(recipeSlice.actions.createRecipeSuccess(response.data));
      // dispatch(getRecipes);
    } catch (error) {
      dispatch(recipeSlice.actions.hasError(error.message));
    }
  };
