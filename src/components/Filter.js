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
import React from "react";

const Filter = ({ sx }) => {
  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 100, ...sx }}>
        <InputLabel id="filter-input">Filters by</InputLabel>
        <Select>
          <Box
            width="auto"
            sx={{ backgroundColor: "lightcoral", justifyContent: "left" }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column">
                <Typography variant="h5">Tags</Typography>
                <MenuItem>
                  <CheckBox />
                  <p>A</p>
                </MenuItem>
                <MenuItem>
                  <CheckBox />
                  <p>A</p>
                </MenuItem>
              </Stack>

              <Typography variant="h5">Cuisines</Typography>
              <Typography variant="h5">Ingredients</Typography>
            </Stack>
          </Box>
        </Select>
      </FormControl>
    </>
  );
};

export default Filter;
