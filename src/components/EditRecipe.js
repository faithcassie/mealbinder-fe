import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DropdownButton from "./DropdownButton";

const EditRecipe = ({ id, recipeData }) => {
  const [title, setTitle] = React.useState(recipeData[id].title);
  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  return (
    <Stack direction="row" spacing={2}>
      <Container sx={{ minHeight: "90vh", width: "50%" }}>
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
            onChange={handleChange}
            value={title}
            placeholder={recipeData[id].title}
            // sx={{ ml: 1, flex: 1 }}
            sx={{
              width: "100%",
              height: { xs: "35px", md: "50px" },
              backgroundColor: "#ffffffc8",
              // borderRadius: 15,
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
            />
            <FormHelperText
              sx={{ color: "black" }}
              id="outlined-weight-helper-text"
            >
              Measurements
            </FormHelperText>
          </FormControl>
          <FormControl
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
                width: "300px",
              }}
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
            <FormHelperText
              sx={{ color: "black" }}
              id="outlined-weight-helper-text"
            >
              Ingredients
            </FormHelperText>
          </FormControl>
          <IconButton
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
            // borderRadius: 10,
            // border: "solid black 0.9px",
          }}
        >
          <List>
            {recipeData[id].ingredients.map((ingredient) => (
              <ListItem
                key={ingredient.id}
                secondaryAction={
                  <IconButton aria-label="delete">
                    <DeleteOutlineIcon />
                  </IconButton>
                }
              >
                {ingredient}
              </ListItem>
            ))}
          </List>
        </Box>
        <DropdownButton />
      </Container>
      <Container sx={{ minHeight: "90vh", width: "50%" }}>
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

export default EditRecipe;
