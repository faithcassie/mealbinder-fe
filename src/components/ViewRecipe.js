import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DropdownButton from "../components/DropdownButton";
import {
  Box,
  Button,
  Chip,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  editRecipe,
  getRecipeDetails,
  updateRecipe,
  updateRecipeImage,
} from "../store/slices/recipeSlice";
import { useNavigate } from "react-router-dom";

const ViewRecipe = ({ recipeId, recipeData }) => {
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(editRecipe(true));
    dispatch(updateRecipeImage(recipeData.imageUrl));
  };
  useEffect(() => {
    dispatch(getRecipeDetails(recipeId));
  }, []);

  return (
    <Stack direction="row" spacing={2} paddingTop={5}>
      <Container sx={{ minHeight: "90vh", width: "40%" }}>
        <Typography variant="h4" textAlign="center" pt={5}>
          {recipeData.title}
        </Typography>
        <Typography variant="h6" sx={{ mt: 5, ml: 5 }}>
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
          }}
        >
          <List>
            {recipeData.ingredientList.map((item) => (
              <ListItem
                key={item._id}
              >{`${item.measurement} ${item.ingredient.ingredientName}`}</ListItem>
            ))}
          </List>
        </Box>
        <Typography variant="h6" sx={{ mt: 5, ml: 5 }}>
          Tags
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            backgroundColor: "#FFFFFFBF",
            width: "100%",
            height: "auto",
            paddingLeft: 5,
            paddingY: 2,
            position: "relative",
          }}
        >
          {recipeData.tagList.map((item) => (
            // console.log(item.tag);
            <Chip
              key={item.tag._id}
              sx={{
                // backgroundColor: "red",
                position: "relative",
                zIndex: "100",
              }}
              label={item.tag.tag}
            />
          ))}
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
          <img height="200" alt={recipeData.title} src={recipeData.imageUrl} />
          <Box
            sx={{
              // width: "40%",
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
            <Button onClick={() => navigate("/")} variant="text">
              Back
            </Button>
          </Box>
        </Stack>
        <Typography variant="h6" sx={{ mt: 5, ml: 5 }}>
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
          }}
        >
          {recipeData.instructions.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </Box>
      </Container>
    </Stack>
  );
};

export default ViewRecipe;
