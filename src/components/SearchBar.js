import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
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
          border: "0.8px solid black",
          // backgroundColor: "yellow",
        }}
      >
        <InputBase
          placeholder="Search for recipes"
          sx={{ ml: 1, flex: 1 }}
          inputProps={{ "aria-label": "search recipe" }}
        />
        <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
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
        <button className="recipe-button">CREATE RECIPE</button>
        <Stack
          sx={{
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
            50
          </Typography>
          <Typography variant="h6">recipes</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SearchBar;
