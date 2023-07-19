import { configureStore } from "@reduxjs/toolkit";
import { recipeSlice } from "./slices/recipeSlice";
import { userSlice } from "./slices/userSlice";
import { plannerSlice } from "./slices/plannerSlice";
import { ingredientSlice } from "./slices/ingredientSlice";
import { tagSlice } from "./slices/tagSlice";
import { insightSlice } from "./slices/insightSlice";

const store = configureStore({
  reducer: {
    ingredient: ingredientSlice.reducer,
    recipe: recipeSlice.reducer,
    planner: plannerSlice.reducer,
    user: userSlice.reducer,
    tag: tagSlice.reducer,
    insight: insightSlice.reducer,
  },
});

export default store;
