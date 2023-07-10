import * as React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { updateTagList } from "../store/slices/recipeSlice";
import {
  addNewTag,
  getAllTags,
  updateSelectedTags,
} from "../store/slices/tagSlice";

const filter = createFilterOptions();

export default function TagField() {
  const dispatch = useDispatch();
  const { tagList } = useSelector((state) => state.tag);
  const [value, setValue] = React.useState([]);
  React.useEffect(() => {
    dispatch(getAllTags());
  }, []);
  React.useEffect(() => {
    dispatch(updateSelectedTags(value));
  }, [value]);
  return (
    <Autocomplete
      multiple
      limitTags={3}
      id="tags"
      options={tagList}
      getOptionLabel={(option) => {
        // Valu selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // console.log(option);
        // Add "xxx" option created dynamically
        if (option && option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.tag;
      }}
      sx={{
        width: "100%",
        backgroundColor: "#FFFFFFBF",
        mt: 3,
        "& .css-1lndfmx-MuiInputBase-root-MuiOutlinedInput-root": {
          borderRadius: "0",
        },
      }}
      value={value}
      onChange={(event, newValue) => {
        if (newValue.length === 0) {
          setValue(newValue);
          return;
        }
        const lastTag = newValue[newValue.length - 1];
        if (lastTag.tag.includes("Add")) {
          // Create a new value from the user input
          setValue(newValue);
          dispatch(addNewTag({ tag: lastTag.inputValue }));
        } else {
          console.log(newValue);
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        console.log(params);
        console.log(inputValue);
        console.log(options);
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.tag);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            tag: `Add "${inputValue}"`,
          });
        }
        return filtered;
      }}
      renderOption={(props, option) => <li {...props}>{option.tag}</li>}
      renderInput={(params) => (
        <TextField {...params} label="Tags" sx={{ border: "none" }} />
      )}
    />
  );
}
