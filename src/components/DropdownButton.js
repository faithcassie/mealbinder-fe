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
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{
        width: 200,
        backgroundColor: "#ffffffc8",
        mt: 5,
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
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
              paddingLeft: 2,
            },
          }}
        />
      )}
    />
  );
};

export default DropdownButton;
