import { CheckBox } from "@mui/icons-material";
import {
  Box,
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
    const searchTerm = event.target.value.tag;
    let searchTagId = event.target.value._id;
    dispatch(getRecipes({ tag: searchTagId }));
    setSearchTag(searchTerm);
  };
  // console.log(tagList);
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
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
            // width: "100px",
            backgroundColor: "#ffffffc8",
            borderRadius: "18px",
          }}
        >
          <MenuItem value="">None</MenuItem>
          {tagList.map((item) => {
            return (
              <MenuItem key={item._id} value={item}>
                {item.tag}
              </MenuItem>
            );
          })}
          {/* </Box> */}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Filter;
