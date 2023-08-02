import * as React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { getTagsbyRecipeId, updateTagList } from "../store/slices/recipeSlice";
import {
  addNewTag,
  getAllTags,
  updateSelectedTags,
} from "../store/slices/tagSlice";
import { useParams } from "react-router-dom";

const filter = createFilterOptions();

export default function TagField({ presetValues = [] }) {
  const dispatch = useDispatch();
  const params = useParams();
  const recipeId = params.id;
  // if (recipeId) {
  //   dispatch(getTagsbyRecipeId({ recipeId }));
  // }
  const { tagList } = useSelector((state) => state.tag);

  const [value, setValue] = React.useState(presetValues);

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
        if (typeof option === "string") {
          return option;
        }
        if (option && option.inputValue) {
          return option.inputValue;
        }
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
          setValue(newValue);
          dispatch(addNewTag({ tag: lastTag.inputValue }));
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
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
