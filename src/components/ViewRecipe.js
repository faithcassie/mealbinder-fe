import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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
  updateRecipeImage,
} from "../store/slices/recipeSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ViewRecipe = ({ recipeId, recipeData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(editRecipe(true));
    dispatch(updateRecipeImage(recipeData.imageUrl));
  };
  useEffect(() => {
    dispatch(getRecipeDetails(recipeId));
  }, []);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      paddingTop={5}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container
        sx={{
          minHeight: { xs: "fit-content", md: "90vh" },
          width: { xs: "100%", md: "40%" },
        }}
      >
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
              display: "none",
            },
            width: "100%",
            backgroundColor: "#FFFFFFBF",
            py: 3,
            px: 5,
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
            <Chip
              key={item.tag._id}
              sx={{
                position: "relative",
                zIndex: "100",
              }}
              label={item.tag.tag}
            />
          ))}
        </Stack>
      </Container>
      <Container
        sx={{
          minHeight: "90vh",
          width: { xs: "100%", md: "60%" },
        }}
      >
        <Stack
          spacing={5}
          sx={{
            justifyContent: "center",
            pt: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <img height="200" alt={recipeData.title} src={recipeData.imageUrl} />
          <Box
            sx={{
              width: "40%",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignSelf: "center",
              padding: 3,
              mx: "auto",
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
              display: "none",
            },
            width: "100%",
            backgroundColor: "#FFFFFFBF",
            py: 3,
            px: 5,
            mt: 2,
          }}
        >
          {recipeData.instructions.split("\n\n").map(
            (line, index) =>
              line.trim() !== "" && (
                <div key={index}>
                  <Typography variant="h5">Step {index + 1}</Typography>
                  <p>{line}</p>
                </div>
              )
          )}

          {/* {recipeData.instructions.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))} */}
        </Box>
        <Box
          sx={{
            width: "40%",
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            alignSelf: "center",
            padding: 3,
            mx: "auto",
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
      </Container>
    </Stack>
  );
};

export default ViewRecipe;
