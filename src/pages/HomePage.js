import { Container, Grid } from "@mui/material";
import React from "react";
import Filter from "../components/Filter";
import RecipeCard from "../components/RecipeCard";
import recipes from "../recipes.json";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { isCreating } = useSelector((state) => state.recipe);
  // console.log(recipes);
  return (
    <Container sx={{ mt: 5 }}>
      <SearchBar />
      <Filter />
      <Grid
        container
        width="100%"
        direction="row"
        justifyContent="left"
        mt={3}
        // sx={{ backgroundColor: "yellow" }}
      >
        {recipes &&
          recipes.data.map((recipe) => (
            <Grid item key={recipe.id} paddingBottom={3} pr={3}>
              <RecipeCard key={recipe.id} value={recipe} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
