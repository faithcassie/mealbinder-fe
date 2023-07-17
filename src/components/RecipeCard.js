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
        // border: "solid black 0.7px",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        backgroundColor: "#FFFFFFBF",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 0 8px 5px #00000015",
          transitionDuration: "0.3s",
        },
      }}
    >
      {/* <CardActionArea
        sx={{ "&:hover": { backgroundColor: "transparent" } }}
        component={Link}
        to={`recipes/${recipeId}`}
      > */}
      <CardMedia
        component="img"
        height="230px"
        sx={{ padding: 4 }}
        alt={recipe.title}
        image={recipe.imageUrl}
      />
      {/* </CardActionArea> */}
      <CardContent
        sx={{
          // height: "fit-content",
          padding: 0,
          ml: 4,
          // mb: 3,
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
                console.log(isHome);
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
