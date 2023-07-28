import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Stack,
  Typography,
  List,
  ListItem,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, updateRecipeImage } from "../store/slices/recipeSlice";
import AutocompleteField from "./AutocompleteField";
import TagField from "./TagField";
import { ImageUpload } from "../utils/cloudinary";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const [measurement, setMeasurement] = useState("");
  // const [ingredient, setIngredient] = useState("");
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredientList, setIngredientList] = useState([]); // ingredient obj & measurement string
  const { selectedIngredient } = useSelector((state) => state.ingredient);
  const { recipeImage } = useSelector((state) => state.recipe);
  const { selectedTags } = useSelector((state) => state.tag);
  const [combinedArr, setCombinedArr] = useState([]);
  const navigate = useNavigate();

  const combineIngredients = () => {
    const combined = measurement + " " + selectedIngredient.ingredientName;
    const updatedCombinedArr = [...combinedArr, combined];
    setCombinedArr(updatedCombinedArr);
    const newIngredient = {
      measurement,
      ingredient: selectedIngredient._id,
    };
    const updatedIngredientList = [...ingredientList, newIngredient];
    setIngredientList(updatedIngredientList);
    // setIngredient("");
    setMeasurement("");
  };

  // ["1oz beans"] => ["beans", "carrots"]
  const handleChange = (event) => {
    setInstructions(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const deleteIngredient = (index) => {
    const updateCombinedArr = [...combinedArr];
    updateCombinedArr.splice(index, 1);
    setCombinedArr(updateCombinedArr);
  };

  const handleSubmit = () => {
    const tagIds = selectedTags
      .filter((tag) => tag !== null && tag._id !== undefined)
      .map((tag) => ({ tag: tag._id }));

    dispatch(
      createRecipe({
        title,
        ingredientList,
        instructions,
        tagList: tagIds,
        imageUrl: recipeImage,
      })
    );
    dispatch(updateRecipeImage(""));

    navigate("/");
  };

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2} mt={2}>
      <Container sx={{ minHeight: "90vh", width: { xs: "100%", md: "40%" } }}>
        <Typography variant="h5" textAlign="center" pb={5}>
          Create new recipe
        </Typography>
        <FormControl
          sx={{
            width: "100%",
            height: { xs: "35px", md: "50px" },
            display: "flex",
            alignItems: "center",
          }}
        >
          <OutlinedInput
            value={title}
            onChange={handleTitleChange}
            placeholder="Recipe Title"
            sx={{
              width: "100%",
              height: { xs: "35px", md: "50px" },
              backgroundColor: "#ffffffc8",
            }}
            inputProps={{ "aria-label": "Recipe title" }}
          />
        </FormControl>
        <Box sx={{ display: "flex", pt: 3 }}>
          <FormControl
            sx={{
              mr: 2,
              //   pb: 3,
              width: "100px",
              display: "flex",
              alignItems: "center",
            }}
            variant="outlined"
          >
            <OutlinedInput
              sx={{
                height: { xs: "35px", md: "50px" },
                backgroundColor: "#ffffffc8",
                // borderRadius: 15,
              }}
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              name="measurement"
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
            />
            <FormHelperText
              sx={{ color: "black" }}
              id="outlined-weight-helper-text"
            >
              Measurements
            </FormHelperText>
          </FormControl>
          <AutocompleteField />
          <IconButton
            onClick={() => combineIngredients()}
            sx={{
              display: "block",
              position: "relative",
              top: -5,
              "&.MuiButtonBase-root:hover": {
                backgroundColor: "transparent",
              },
            }}
            aria-label="add-to-ingredients"
          >
            <AddCircleIcon
              sx={{
                width: "35px",
                height: "35px",
                color: "#AB6614",
              }}
            />
          </IconButton>
        </Box>
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
            {combinedArr &&
              combinedArr.map((combined, index) => (
                <ListItem key={index}>
                  {combined}
                  <RemoveCircleOutlineIcon
                    onClick={() => deleteIngredient(index)}
                    sx={{
                      display: "block",
                      width: "16px",
                      height: "16px",
                      color: "#AB6614",
                      ml: 2,
                    }}
                  />
                </ListItem>
              ))}
          </List>
        </Box>
        <TagField />
      </Container>
      <Container sx={{ minHeight: "90vh", width: { xs: "100%", md: "60%" } }}>
        <Stack
          direction="row"
          spacing={5}
          sx={{
            justifyContent: "left",
            pt: 3,
          }}
        >
          <ImageUpload />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ backgroundColor: "#AB6614", boxShadow: "none" }}
            >
              Save
            </Button>
            <Button variant="text">Cancel</Button>
          </Box>
        </Stack>
        <Typography variant="subtitle1" sx={{ mt: 5, ml: 5 }}>
          Instructions
        </Typography>
        <TextField
          multiline
          fullWidth
          value={instructions}
          onChange={handleChange}
          sx={{
            height: "400px",
            overflow: "auto",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
            "&::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar
            },
            width: "100%",
            backgroundColor: "#FFFFFFBF",
            py: 3,
            px: 5,
            mt: 2,
          }}
        />
      </Container>
    </Stack>
  );
};

export default CreateRecipe;
