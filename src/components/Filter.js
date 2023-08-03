import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllTags } from "../store/slices/tagSlice";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../store/slices/recipeSlice";

const Filter = ({ sx }) => {
  const dispatch = useDispatch();
  const { tagList } = useSelector((state) => state.tag);
  const [searchTag, setSearchTag] = useState("");
  useEffect(() => {
    dispatch(getAllTags());
  }, []);
  const handleChange = (event) => {
    let searchTerm = event.target.value;
    let searchTagId = tagList.find((obj) => obj.tag === searchTerm);
    if (!searchTagId) {
      searchTagId = {};
    }
    dispatch(getRecipes({ tag: searchTagId._id }));
    setSearchTag(searchTerm);
  };

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        pl: 2,
        pt: 3,
      }}
    >
      <Typography variant="subtitle1">Filter by: </Typography>
      <FormControl
        sx={{
          mx: 3,
          minWidth: 100,

          ...sx,
        }}
      >
        <InputLabel id="filter-input">Tags</InputLabel>
        <Select
          label="Tags"
          value={searchTag}
          onChange={handleChange}
          sx={{
            marginY: 1,
            height: "35px",
            backgroundColor: "#ffffffc8",
            borderRadius: "18px",
          }}
        >
          <MenuItem value="None">None</MenuItem>
          {tagList.map((item) => {
            return (
              <MenuItem key={item._id} value={item.tag}>
                {item.tag}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Filter;
