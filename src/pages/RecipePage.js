import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import recipes from "../recipes.json";
import ViewRecipe from "../components/ViewRecipe";
import { useDispatch, useSelector } from "react-redux";
import EditRecipe from "../components/EditRecipe";
import { getRecipeDetails } from "../store/slices/recipeSlice";
import { Container } from "@mui/material";

const RecipePage = () => {
  const { recipeData, isEditing } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  const params = useParams();
  const recipeId = params.id;
  useEffect(() => {
    dispatch(getRecipeDetails(recipeId));
  }, []);

  if (isEditing && recipeData) {
    return <EditRecipe id={recipeId} recipeData={recipeData} />;
  } else if (recipeData) {
    return <ViewRecipe recipeId={recipeId} recipeData={recipeData} />;
  }

  return;
};

export default RecipePage;
