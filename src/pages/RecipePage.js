import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import recipes from "../recipes.json";
// import TagsButton from "../components/TagsButton";
import ViewRecipe from "../components/ViewRecipe";
import { useSelector } from "react-redux";
import EditRecipe from "../components/EditRecipe";

const RecipePage = () => {
  const { isEditing } = useSelector((state) => state.recipe);
  const { id } = useParams();
  let recipeData = recipes.data;

  return isEditing ? (
    <EditRecipe id={id} recipeData={recipeData} />
  ) : (
    <ViewRecipe id={id} recipeData={recipeData} />
  );
};

export default RecipePage;
