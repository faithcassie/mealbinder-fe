import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
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
  const { recipeTotal, searchRecipeTitle } = useSelector(
    (state) => state.recipe
  );
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
        alignItems: "center",
      }}
    >
      <Paper
        component="form"
        sx={{
          mb: "2rem",
          display: "flex",
          flexDirection: "row",
          width: { xs: "70%", md: "50%" },
          height: { xs: "40px", md: "50px" },
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
          sx={{ pl: 3, flex: 1 }}
          inputProps={{ "aria-label": "search recipe" }}
        />
        <IconButton sx={{ pr: 3 }} type="button" aria-label="search">
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
            textAlign: "center",
            justifyContent: "center",
            borderRadius: "20px",
            backgroundColor: "#F6E7D5",
            width: "100px",
            height: "100px",
            justifySelf: "center",
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
