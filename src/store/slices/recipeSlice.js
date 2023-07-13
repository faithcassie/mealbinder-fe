import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../api/apiService";
import { RECIPES_PER_PAGE } from "../../api/config";

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
    recipeImage: "",
    newRecipe: null,
    recipeTotal: null,
    totalPage: null,
    tagsByRecipeId: [],
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
      state.isEditing = action.payload;
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
      const { count, recipes, totalPage } = action.payload;
      state.recipeList = recipes; // ?
      state.recipeTotal = count;
      state.totalPage = totalPage;
    },
    getRecipeDetailsSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.recipeData = action.payload;
    },
    getTagsbyRecipeIdSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.tagsByRecipeId = action.payload;
    },
    updateRecipeSuccess: (state, action) => {
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

export const getRecipes =
  ({ page = 1, limit = RECIPES_PER_PAGE, tag, name }) =>
  async (dispatch) => {
    dispatch(recipeSlice.actions.startLoading());
    try {
      const params = { page, limit, tag, name };
      const response = await apiService.get(`/recipes`, { params });
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
    // console.log(response.data);
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

export const updateRecipe =
  ({ recipeId, title, ingredientList, instructions, tagList, imageUrl }) =>
  async (dispatch) => {
    dispatch(recipeSlice.actions.startLoading());
    try {
      const response = await apiService.put(`/recipes/${recipeId}`, {
        title,
        ingredientList,
        instructions,
        tagList,
        imageUrl,
      });
      dispatch(recipeSlice.actions.updateRecipeSuccess(response.data));
      // dispatch(getRecipes);
    } catch (error) {
      dispatch(recipeSlice.actions.hasError(error.message));
    }
  };

export const getTagsbyRecipeId =
  ({ recipeId }) =>
  async (dispatch) => {
    dispatch(recipeSlice.actions.startLoading());
    try {
      const response = await apiService.get(`/recipes/${recipeId}/tags`);
      dispatch(recipeSlice.actions.getTagsbyRecipeIdSuccess(response.data));
    } catch (error) {
      dispatch(recipeSlice.actions.hasError(error.message));
    }
  };
