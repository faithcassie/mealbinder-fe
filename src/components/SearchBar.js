import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  updateSearchRecipeTitle,
} from "../store/slices/recipeSlice";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recipeTotal, totalPage, searchRecipeTitle } = useSelector(
    (state) => state.recipe
  );
  // const [, setSearchRecipeTitle] = useState("");
  const handleCreateButton = () => {
    navigate("recipes/create", { replace: true });
  };
  const handleSearchRecipe = (event) => {
    dispatch(updateSearchRecipeTitle(event.target.value));
  };
  useEffect(() => {
    dispatch(getRecipes({ name: searchRecipeTitle }));
  }, [searchRecipeTitle]);

  return (
    <Stack
      direction={{ sm: "collumn", md: "row" }}
      spacing={2}
      sx={{
        pt: "30px",
        // backgroundColor: "limegreen",
        alignItems: "center",
      }}
    >
      <Paper
        component="form"
        sx={{
          px: "20px",
          mb: "2rem",
          display: "flex",
          width: { xs: "70%", md: "50%" },
          height: { xs: "35px", md: "50px" },
          borderRadius: 15,
          border: "0.5px solid black",
          boxShadow: "none",
          backgroundColor: "#ffffffc8",
        }}
      >
        <InputBase
          value={searchRecipeTitle}
          onChange={handleSearchRecipe}
          placeholder="Search for recipes"
          sx={{ ml: 1, flex: 1 }}
          inputProps={{ "aria-label": "search recipe" }}
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <Stack
        direction="row"
        spacing={2}
        justifyContent={{ xs: "center", md: "flex-end" }}
        alignItems="center"
        sx={{ width: { xs: "100%", md: "50%" } }}
      >
        <Button
          onClick={handleCreateButton}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#FFFFFFBF",
            width: "100px",
            height: "100px",
            fontWeight: "bold",
            fontSize: "1rem",
            // border: "black solid 0.8px",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 0 8px 5px #00000015",
              transitionDuration: "0.3s",
              backgroundColor: "#F6E7D5",
              color: "#AB6614",
            },
          }}
        >
          CREATE RECIPE
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignSelf: "center",
            textAlign: "center",
            justifyContent: "center",
            borderRadius: "20px",
            backgroundColor: "#F6E7D5",
            width: "100px",
            height: "100px",
            justifySelf: "center",
            // my: "20px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#AB6614", fontWeight: "bold" }}
          >
            {recipeTotal}
          </Typography>
          <Typography variant="subtitle1">recipes</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default SearchBar;
