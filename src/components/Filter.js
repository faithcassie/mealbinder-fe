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
          sx={{
            marginY: 1,
            height: "35px",
          }}
        >
          <Box width="auto" sx={{ justifyContent: "left" }}>
            <MenuItem>
              <CheckBox />
              <p>A fhsdiufa fiuahsdj f awehfeu</p>
            </MenuItem>
            <MenuItem>
              <CheckBox />
              <p>A</p>
            </MenuItem>
            {/* </Stack> */}
          </Box>
        </Select>
      </FormControl>
      {/* <FormControl
        sx={{
          mx: 0,
          minWidth: 120,
          ...sx,
        }}
      >
        <InputLabel id="filter-input">Cuisines</InputLabel>
        <Select
          label="Cuisines"
          sx={{
            marginY: 1,
            height: "35px",
          }}
        >
          <Box width="auto" sx={{ justifyContent: "left" }}>
            <MenuItem>
              <CheckBox />
              <p>A fhsdiufa </p>
            </MenuItem>
            <MenuItem>
              <CheckBox />
              <p>A</p>
            </MenuItem>
          </Box>
        </Select>
      </FormControl> */}
    </Stack>
  );
};

export default Filter;
