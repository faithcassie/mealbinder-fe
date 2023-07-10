import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Filter from "../components/Filter";
import RecipeCard from "../components/RecipeCard";
import recipes from "../recipes.json";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../store/slices/recipeSlice";

const HomePage = () => {
  const { recipeList } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes());
  }, []);
  // console.log(recipeList);
  return (
    <Container sx={{ mt: 5 }}>
      <SearchBar />
      <Filter />
      <Grid
        container
        width="100%"
        direction="row"
        mt={3}
        justifyContent="center"
        // sx={{ backgroundColor: "yellow" }}
      >
        {recipeList &&
          recipeList.map((recipe) => (
            <Grid item key={recipe._id} paddingBottom={3} pr={3} mr={5}>
              <RecipeCard key={recipe._id} recipe={recipe} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
