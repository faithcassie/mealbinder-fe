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

import { createNewPlan } from "../store/slices/plannerSlice";

const RecipeCard = ({ isHome, recipe }) => {
  const dispatch = useDispatch();
  const { selectDate } = useSelector((state) => state.planner);
  let recipeId = recipe._id;

  return (
    <Card
      key={recipeId}
      sx={{
        width: "300px",
        minHeight: "300px",
        borderRadius: 8,
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        backgroundColor: "#FFFFFFBF",
        margin: 2,
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 0 8px 5px #00000015",
          transitionDuration: "0.3s",
        },
      }}
    >
      <CardMedia
        component="img"
        height="230px"
        sx={{ padding: 4 }}
        alt={recipe.title}
        image={recipe.imageUrl}
      />
      <CardContent
        sx={{
          padding: 0,
          ml: 4,
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
            onClick={() => {
              if (isHome) {
                // console.log(isHome);

                return;
              } else {
                dispatch(
                  createNewPlan({
                    mealList: [
                      {
                        recipe: `${recipeId}`,
                      },
                    ],
                    date: selectDate.toISOString().split("T")[0],
                  })
                );
              }
            }}
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
