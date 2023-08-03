import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  List,
  ListItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  editRecipe,
  updateRecipe,
  updateRecipeImage,
} from "../store/slices/recipeSlice";
import AutocompleteField from "./AutocompleteField";
import { useDispatch, useSelector } from "react-redux";
import { ImageUpload } from "../utils/cloudinary";
import TagField from "./TagField";

const EditRecipe = ({ recipeData }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState(recipeData.title);
  const [measurement, setMeasurement] = useState("");
  const [instructions, setInstructions] = useState(recipeData.instructions);
  const [ingredientList, setIngredientList] = useState(
    recipeData.ingredientList
  );
  const { selectedIngredient } = useSelector((state) => state.ingredient);
  const { recipeImage } = useSelector((state) => state.recipe);
  const { selectedTags } = useSelector((state) => state.tag);
  const [combinedArr, setCombinedArr] = useState([]);
  let updatedIngredientList = ingredientList.map((item) => ({
    measurement: item.measurement,
    ingredient: item.ingredient._id,
  }));

  const combineIngredients = () => {
    const combined = measurement + " " + selectedIngredient.ingredientName;
    const updatedCombinedArr = [...combinedArr, combined];
    setCombinedArr(updatedCombinedArr);
    const newIngredient = {
      measurement,
      ingredient: selectedIngredient,
    };

    const updatedIngredient = {
      measurement,
      ingredient: selectedIngredient._id,
    };

    updatedIngredientList.push(updatedIngredient);
    const displayIngredientList = [...ingredientList, newIngredient];
    setIngredientList(displayIngredientList);
    setMeasurement("");
  };

  const handleChange = (event) => {
    setInstructions(event.target.value);
  };

  const deleteIngredient = (index) => {
    const postIngredientList = [...ingredientList];
    postIngredientList.splice(index, 1);
    setIngredientList(postIngredientList);
  };

  const handleSubmit = () => {
    const tagIds = selectedTags
      .filter((tag) => tag !== null && tag._id !== undefined)
      .map((tag) => ({ tag: tag._id }));

    dispatch(
      updateRecipe({
        recipeId: recipeData._id,
        title,
        ingredientList: updatedIngredientList,
        instructions,
        tagList: tagIds,
        imageUrl: recipeImage,
      })
    );
    dispatch(updateRecipeImage(""));
    dispatch(editRecipe(false));
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <Container
        sx={{
          minHeight: { xs: "fit-content", md: "90vh" },
          width: { xs: "100%", md: "40%" },
        }}
      >
        <Typography variant="h5" textAlign="center" pb={5}>
          Edit your recipe
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
            onChange={handleTitleChange}
            value={title}
            placeholder={recipeData.title}
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
            }}
            aria-label="add-to-ingredients"
          >
            <AddCircleIcon
              sx={{ width: "35px", height: "35px", color: "#AB6614" }}
            />
          </IconButton>
        </Box>
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
          <List>
            {ingredientList.map((item, index) => (
              <ListItem key={item.id}>
                {`${item.measurement} ${item.ingredient.ingredientName}`}
                <RemoveCircleOutlineIcon
                  onClick={() => deleteIngredient(index)}
                  sx={{
                    display: "block",
                    width: "16px",
                    height: "16px",
                    color: "#AB6614",
                    ml: 2,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* tag list */}
        <TagField presetValues={recipeData.tagList.map((item) => item.tag)} />
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
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignSelf: "center",
              padding: 3,
              mx: "auto",
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ backgroundColor: "#AB6614", boxShadow: "none" }}
            >
              Save
            </Button>
            <Button onClick={() => dispatch(editRecipe(false))} variant="text">
              Cancel
            </Button>
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
              display: "none",
            },
            width: "100%",
            backgroundColor: "#FFFFFFBF",
            py: 3,
            px: 5,
            mt: 2,
          }}
        />
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
            onClick={handleSubmit}
            variant="contained"
            sx={{ backgroundColor: "#AB6614", boxShadow: "none" }}
          >
            Save
          </Button>
          <Button onClick={() => dispatch(editRecipe(false))} variant="text">
            Cancel
          </Button>
        </Box>
      </Container>
    </Stack>
  );
};

export default EditRecipe;
