import React from "react";
import { useDispatch } from "react-redux";
import DropdownButton from "../components/DropdownButton";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { editRecipe } from "../store/slices/recipeSlice";

const ViewRecipe = ({ id, recipeData }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(editRecipe());
  };

  return (
    <Stack direction="row" spacing={2}>
      <Container sx={{ minHeight: "90vh", width: "40%" }}>
        <Typography variant="h5" textAlign="center" pt={5}>
          {recipeData[Number(id)].title}
        </Typography>
        <Typography variant="subtitle1" textAlign="center" pt={5}>
          {recipeData[id].cooking_time
            ? `Cooking time: ${recipeData[id].cooking_time}`
            : "Cooking time: NaN"}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 5, ml: 5 }}>
          Ingredients
        </Typography>
        <Box
          sx={{
            height: "400px",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar
            },
            width: "100%",
            backgroundColor: "#FFFFFFBF",
            py: 3,
            px: 5,
            mt: 2,
            // borderRadius: 10,
            // border: "solid black 0.9px",
          }}
        >
          <List>
            {recipeData[id].ingredients.map((ingredient) => (
              <ListItem key={ingredient.id}>{ingredient}</ListItem>
            ))}
          </List>
        </Box>
        <Stack direction="row">
          <DropdownButton />
        </Stack>
      </Container>
      <Container sx={{ minHeight: "90vh", width: "60%" }}>
        <Stack
          direction="row"
          spacing={5}
          sx={{
            justifyContent: "left",
            pt: 3,
          }}
        >
          <img
            width="60%"
            alt={recipeData[id].title}
            src={recipeData[id].url}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <Button
              onClick={handleClick}
              variant="contained"
              sx={{ backgroundColor: "#AB6614", boxShadow: "none" }}
            >
              Edit
            </Button>
            <Button variant="text">Cancel</Button>
          </Box>
        </Stack>
        <Typography variant="subtitle1" sx={{ mt: 5, ml: 5 }}>
          Instructions
        </Typography>
        <Box
          sx={{
            height: "400px",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar
            },
            width: "100%",
            backgroundColor: "#FFFFFFBF",
            py: 3,
            px: 5,
            mt: 2,
            // borderRadius: 10,
            // border: "solid black 0.9px",
          }}
        >
          {recipeData[id].instructions}
        </Box>
      </Container>
    </Stack>
  );
};

export default ViewRecipe;
