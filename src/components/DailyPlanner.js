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
import AlertMsg from "./AlertMsg";
import { Link as RouterLink } from "react-router-dom";

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
  }, [selectDate]);

  return (
    <Container component="div">
      <Stack direction="row" sx={{ justifyContent: "space-between", pb: 2 }}>
        <Box>
          <Typography variant="subtitle1">Daily planner</Typography>
          <Typography variant="h5">{formattedDate}</Typography>
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
        <Box
          sx={{
            margin: 5,
            width: "auto",
          }}
        >
          <AlertMsg />
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
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {recipeList &&
              recipeList.map((recipe) => (
                <Grid item key={recipe._id} paddingBottom={3}>
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

      <List sx={{ overflow: "scroll", height: "500px" }}>
        {mealListByDate.length === 0 && (
          <Typography variant="subtitle1">Let's create a meal list!</Typography>
        )}
        {mealListByDate &&
          mealListByDate.map((meal) => (
            <ListItem key={meal._id}>
              <img
                width="200px"
                height="150px"
                overflow="hidden"
                alt={meal.recipe.title}
                src={meal.recipe.imageUrl}
              />
              <Typography
                paddingLeft={3}
                variant="body"
                to={`/recipes/${meal.recipe._id}`}
                component={RouterLink}
                sx={{
                  textDecoration: "none",
                  color: "#AB6614",
                  fontWeight: 600,
                }}
              >
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
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </ListItem>
          ))}
      </List>
    </Container>
  );
};

export default DailyPlanner;
