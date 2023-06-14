import { configureStore } from "@reduxjs/toolkit";
import { recipeSlice } from "./slices/recipeSlice";
import { userSlice } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    recipe: recipeSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
