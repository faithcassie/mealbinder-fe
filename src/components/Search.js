import { IconButton, InputBase, Paper } from "@mui/material";
import {
  getRecipes,
  updateSearchRecipeTitle,
} from "../store/slices/recipeSlice";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const { searchRecipeTitle } = useSelector((state) => state.recipe);
  const handleSearchRecipe = (event) => {
    dispatch(updateSearchRecipeTitle(event.target.value));
  };
  useEffect(() => {
    dispatch(getRecipes({ name: searchRecipeTitle }));
  }, [searchRecipeTitle]);

  return (
    <Paper
      component="form"
      sx={{
        px: "20px",
        display: "flex",
        width: "100%",
        height: { xs: "35px", md: "40px" },
        borderRadius: 15,
        border: "0.8px solid black",
        boxShadow: "none",
      }}
    >
      <InputBase
        value={searchRecipeTitle}
        onChange={handleSearchRecipe}
        placeholder="Search for recipes"
        inputProps={{ "aria-label": "search recipe" }}
      />
      <IconButton type="button" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
