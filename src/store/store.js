import { configureStore } from "@reduxjs/toolkit";
import { recipeSlice } from "./slices/recipeSlice";
import { userSlice } from "./slices/userSlice";
import { plannerSlice } from "./slices/plannerSlice";
import { ingredientSlice } from "./slices/ingredientSlice";

const store = configureStore({
  reducer: {
    ingredient: ingredientSlice.reducer,
    recipe: recipeSlice.reducer,
    planner: plannerSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
