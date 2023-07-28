import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../api/apiService";

const initialState = {
  ingredientArr: [],
  isLoading: false,
  error: null,
  totalIngredients: null,
  selectedIngredient: null,
};

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateIngredientArrSuccess(state, action) {
      state.ingredientArr = action.payload;
    },
    updateSelectedIngredient(state, action) {
      state.selectedIngredient = action.payload;
    },
    getAllIngredientsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.ingredientArr = action.payload;
    },
    addIngredientSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newIngredient = action.payload;
      state.ingredientArr.push(newIngredient); //obj?
      // state.totalIngredients = count;
      state.selectedIngredient = newIngredient;
    },
  },
  extraReducers: {},
});

export const { updateSelectedIngredient } = ingredientSlice.actions;

export const addIngredient =
  ({ ingredient }) =>
  async (dispatch) => {
    dispatch(ingredientSlice.actions.startLoading());
    try {
      let ingredientName = ingredient;

      const response = await apiService.post("/ingredients", {
        ingredientName,
      });
      dispatch(ingredientSlice.actions.addIngredientSuccess(response.data));
    } catch (error) {
      dispatch(ingredientSlice.actions.hasError(error.message));
      // toast.error(error.message);
    }
  };

export const getAllIngredients = (searchTerm) => async (dispatch) => {
  dispatch(ingredientSlice.actions.startLoading());
  try {
    let params = {};
    if (searchTerm) params.ingredientName = searchTerm;
    const response = await apiService.get("/ingredients", { params });
    dispatch(ingredientSlice.actions.getAllIngredientsSuccess(response.data));
  } catch (error) {
    dispatch(ingredientSlice.actions.hasError(error));
  }
};
// export const updateIngredientArr = ({updatedIngredientArr}) => async (async) => {
//   dispatch(ingredientSlice.actions.startLoading());
//   try {

//   } catch (error) {

//   }
// }
