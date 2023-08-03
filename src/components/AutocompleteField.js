import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  getAllIngredients,
  updateSelectedIngredient,
} from "../store/slices/ingredientSlice";
import debounce from "lodash.debounce";

const AutocompleteField = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [optionTerm, setOptionTerm] = useState({
    ingredientName: "",
  });
  const { ingredientArr } = useSelector((state) => state.ingredient);
  const [options, setOptions] = useState([]);

  const handleSearch = async (searchTerm) => {
    dispatch(getAllIngredients(searchTerm));

    if (ingredientArr.length === 0) {
      setOptions([{ ingredientName: `Add "${searchTerm}"` }]);
      setSearchTerm(searchTerm);
    } else {
      setOptions(ingredientArr);
    }

    if (searchTerm.length === 0) {
      setOptions([]);
    }
  };
  const debouncedSearch = debounce(handleSearch, 300, { trailing: true });

  const handleAutocompleteChange = (e, newValue) => {
    if (newValue && newValue.ingredientName.includes("Add")) {
      setOptionTerm({ ingredientName: searchTerm });
      dispatch(addIngredient({ ingredient: searchTerm }));
    } else {
      dispatch(updateSelectedIngredient(newValue));
    }
  };

  return (
    <Autocomplete
      sx={{ width: "70%" }}
      value={optionTerm}
      onChange={handleAutocompleteChange}
      inpuValue={searchTerm}
      onInputChange={(event, newInputValue) => {
        debouncedSearch(newInputValue);
      }}
      options={options}
      getOptionLabel={(option) => (option ? option.ingredientName : "")}
      renderInput={(params) => {
        return (
          <TextField
            sx={{ backgroundColor: "#ffffffc8" }}
            {...params}
            label="Ingredients"
            variant="outlined"
          />
        );
      }}
    />
  );
};

export default AutocompleteField;
