import { createSlice } from "@reduxjs/toolkit";

export const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    name: "",
    isDeleted: false,
  },
  reducers: {
    addRecipe: (state, action) => {
      console.log(state);
    },
  },
});
