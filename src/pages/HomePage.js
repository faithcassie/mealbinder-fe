import { Container, Grid, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import Filter from "../components/Filter";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../store/slices/recipeSlice";
import { motion } from "framer-motion";

const HomePage = () => {
  const { recipeList, totalPage } = useSelector((state) => state.recipe);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes({ page }));
  }, [page]);

  return (
    <Container
      sx={{ mt: 5 }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SearchBar />
      <Filter />
      <Grid
        container
        width="100%"
        direction="row"
        mt={3}
        justifyContent="center"
      >
        {recipeList &&
          recipeList.map((recipe) => (
            <Grid item key={recipe._id} paddingBottom={3}>
              <RecipeCard isHome={true} key={recipe._id} recipe={recipe} />
            </Grid>
          ))}
      </Grid>
      <Pagination
        sx={{
          py: 3,
          display: "flex",
          justifyContent: "center",
        }}
        count={totalPage}
        page={page}
        onChange={(e, page) => setPage(page)}
        showFirstButton
        showLastButton
      />
    </Container>
  );
};

export default HomePage;
