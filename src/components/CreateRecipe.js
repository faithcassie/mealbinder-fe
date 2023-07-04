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
import DropdownButton from "./DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../store/slices/recipeSlice";
import { addIngredient } from "../store/slices/ingredientSlice";
import AutocompleteField from "./AutocompleteField";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const [measurement, setMeasurement] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredientList, setIngredientList] = useState([]); // ingredient & measurement as a string
  // const [ingredientArr, setIngredientArr] = useState([]); // ingredient only
  const { ingredientArr } = useSelector((state) => state.ingredient);

  const handleAddIngredient = (e) => {
    const { name, value } = e.target;
    if (name === "measurement") {
      setMeasurement(value);
    } else if (name === "ingredient") {
      setIngredient(value);
    }
  };
  // useEffect(() => {
  //   dispatch(getAllIngredients({ filterName }));
  // }, [ingredient]);
  console.log(ingredientArr);
  const combineIngredients = () => {
    const combined = measurement + " " + ingredient;
    const updatedIngredientList = [...ingredientList, combined];
    const newIngredient = { measurement, ingredient };
    let updatedIngredientArr = [...ingredientArr, newIngredient];
    dispatch(addIngredient({ ingredient }));
    setIngredientList(updatedIngredientList);
    setIngredient("");
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
    const updateIngredientList = [...ingredientList];
    updateIngredientList.splice(index, 1);
    const updatedIngredientArr = [...ingredientArr];
    updatedIngredientArr.splice(index, 1);
    // dispatch(updateIngredientArr(updatedIngredientArr));
    setIngredientList(updateIngredientList);
    // setIngredientArr(updatedIngredientArr);
    console.log(ingredientArr);
  };

  useEffect(() => {
    console.log(ingredientArr);
  }, [ingredientArr]);
  const handleSubmit = () => {
    dispatch(createRecipe({ title, measurement, ingredientArr, instructions }));
  };

  return (
    <Stack direction="row" spacing={2} mt={2}>
      <Container sx={{ minHeight: "90vh", width: "40%" }}>
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
              onChange={handleAddIngredient}
            />
            <FormHelperText
              sx={{ color: "black" }}
              id="outlined-weight-helper-text"
            >
              Measurements
            </FormHelperText>
          </FormControl>
          <AutocompleteField />
          {/* <FormControl
            sx={{
              mr: 1,
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
                width: "auto",
              }}
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              name="ingredient"
              value={ingredient}
              onChange={handleAddIngredient}
            />
            <FormHelperText
              sx={{ color: "black" }}
              id="outlined-weight-helper-text"
            >
              Ingredients
            </FormHelperText>
          </FormControl> */}
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
            {ingredientList &&
              ingredientList.map((ingredient, index) => (
                <ListItem key={index}>
                  {ingredient}
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
        <DropdownButton />
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
          <img height={200} width={300} src="" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <Button
              onSubmit={() => handleSubmit()}
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
