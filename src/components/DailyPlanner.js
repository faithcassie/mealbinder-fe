import PostAddIcon from "@mui/icons-material/PostAdd";
import {
  Box,
  Container,
  Dialog,
  Grid,
  IconButton,
  List,
  ListItem,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import Filter from "./Filter";
import { getRecipes } from "../store/slices/recipeSlice";
import RecipeCard from "./RecipeCard";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { getPlannerByDate, updateMealList } from "../store/slices/plannerSlice";

const DailyPlanner = ({ sx }) => {
  const [open, setOpen] = useState(false);
  const { recipeList, totalPage } = useSelector((state) => state.recipe);
  const { mealListByDate } = useSelector((state) => state.planner);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes({ page }));
  }, [page]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { selectDate } = useSelector((state) => state.planner);
  const dateObject = new Date(selectDate);
  const formattedDate = dateObject.toLocaleDateString();
  useEffect(() => {
    dispatch(
      getPlannerByDate({ date: selectDate.toISOString().split("T")[0] })
    );
  }, [selectDate, dispatch]);
  // console.log(mealListByDate);
  return (
    <Container component="div" sx={{ ...sx }}>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Box>
          <Typography variant="subtitle1">Daily planner</Typography>
          <Typography variant="h4">{formattedDate}</Typography>
        </Box>
        <IconButton
          onClick={handleClickOpen}
          sx={{
            paddingRight: "2rem",
            ":hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <PostAddIcon
            sx={{ color: "#AB6614", width: "30px", height: "30px" }}
          />
        </IconButton>
      </Stack>
      <Dialog fullWidth maxWidth open={open} onClose={handleClose}>
        <Box sx={{ margin: 4, width: "fit-content" }}>
          <Stack
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: "2rem",
              width: "fit-content",
            }}
          >
            {/* SEARCH */}
            <Search />
            <IconButton
              sx={{ position: "absolute", right: "1rem" }}
              onClick={handleClose}
            >
              <CloseIcon sx={{ width: "30px", height: "30px" }} />
            </IconButton>
          </Stack>
          <Filter />
          <Grid
            container
            width="100%"
            direction="row"
            mt={3}
            justifyContent="center"
          >
            {recipeList &&
              recipeList.map((recipe) => (
                <Grid item key={recipe._id} paddingBottom={3} pr={3} mr={5}>
                  <RecipeCard isHome={false} key={recipe._id} recipe={recipe} />
                </Grid>
              ))}
          </Grid>
          <Pagination
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "center",
            }}
            count={totalPage}
            page={page}
            onChange={(e, page) => setPage(page)}
            showFirstButton
            showLastButton
          />
        </Box>
      </Dialog>

      <List sx={{ overflow: "auto", height: 500 }}>
        {mealListByDate.length === 0 && (
          <Typography variant="subtitle1">Let's create a meal list!</Typography>
        )}
        {mealListByDate &&
          mealListByDate.map((meal) => (
            <ListItem key={meal._id}>
              <img
                width="30%"
                alt={meal.recipe.title}
                src={meal.recipe.imageUrl}
              />
              <Typography paddingLeft={3} variant="body">
                {meal.recipe.title}
              </Typography>
              <RemoveCircleOutlineIcon
                onClick={() => {
                  dispatch(
                    updateMealList({
                      recipeId: meal.recipe._id,
                      date: selectDate.toISOString().split("T")[0],
                    })
                  );
                }}
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
    </Container>
  );
};

export default DailyPlanner;
