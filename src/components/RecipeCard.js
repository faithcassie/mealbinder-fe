import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../store/slices/recipeSlice";

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const { recipeData } = useSelector((state) => state.recipe);
  let recipeId = recipe._id;

  return (
    <Card
      key={recipeId}
      sx={{
        width: "300px",
        minHeight: "300px",
        // borderRadius: "20px",
        border: "solid black 0.7px",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        // backgroundColor: "red",
      }}
    >
      <CardActionArea component={Link} to={`recipes/${recipeId}`}>
        <CardMedia
          component="img"
          height="200px"
          alt={recipe.title}
          image={recipe.imageUrl}
        />
      </CardActionArea>

      <CardContent
        sx={{
          height: "auto",
          ml: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography variant="subtitle1">{recipe.title}</Typography>

        <Stack direction="row" alignItems="center">
          <Link className="link" to={`recipes/${recipeId}`}>
            Details
          </Link>
          <IconButton
            sx={{
              pl: 2,
              "&.MuiButtonBase-root:hover": {
                backgroundColor: "transparent",
                color: "#AB6614",
              },
            }}
            aria-label="add to planner"
          >
            <ControlPointIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
