import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import apiService from "../../api/apiService";

const initialState = {
  ingredientArr: [],
  isLoading: false,
  error: null,
  totalIngredients: null,
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
    getAllIngredientsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.ingredientArr = action.payload;
    },
    addIngredientSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { ingredient, count } = action.payload;
      state.ingredientArr.push(ingredient); //obj?
      state.totalIngredients = count;
    },
  },
  extraReducers: {},
});

export const {} = ingredientSlice.actions;

export const addIngredient =
  ({ ingredient }) =>
  async (dispatch) => {
    dispatch(ingredientSlice.actions.startLoading());
    try {
      let ingredientName = ingredient;
      console.log(ingredient);
      const response = await apiService.post("/ingredients", {
        ingredientName,
      });
      console.log(response);
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
    console.log(params);
    const response = await apiService.get("/ingredients", { params });
    dispatch(ingredientSlice.actions.getAllIngredientsSuccess(response.data));
    console.log(response);
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
