import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import React from "react";

let options = [];

const filter = createFilterOptions();

const DropdownButton = () => {
  const [value, setValue] = React.useState(null);
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.title
        );
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="tags"
      options={options}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{
        width: 200,
        backgroundColor: "#ffffffc8",
        // borderRadius: "30px",
        mt: 5,
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          // borderRadius: "30px",
          //   border: "solid black 0.8px",
          border: "none",
        },
        "& .Mui-focused": { pl: 3 },
        "& .MuiInputLabel-shrink": { pl: -2 },
      }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          InputLabelProps={{
            sx: {
              paddingLeft: 2, // Increase the left padding value as needed
            },
          }}
        />
      )}
    />
  );
};

export default DropdownButton;
