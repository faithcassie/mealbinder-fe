import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  getAllIngredients,
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

  // useEffect(() => {
  //   dispatch(getAllIngredients());
  // },[]);
  console.log(ingredientArr);
  //   const handleInputChange = (e) => {
  //     handleSearch(e.target.value);
  //   };

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
  const debouncedSearch = debounce(handleSearch, 300);

  const handleAutocompleteChange = (e, newValue) => {
    // maybe add ingredient to database
    if (newValue && newValue.ingredientName.includes("Add")) {
      setOptionTerm({ ingredientName: searchTerm });
      dispatch(addIngredient({ ingredient: searchTerm }));
    }
  };
  console.log(options);

  return (
    <Autocomplete
      sx={{ width: "70%" }}
      value={optionTerm}
      onChange={handleAutocompleteChange}
      inpuValue={searchTerm}
      //   onInputChange={handleInputChange}
      onInputChange={(event, newInputValue) => {
        // console.log(newInputValue);
        handleSearch(newInputValue);
      }}
      options={options}
      getOptionLabel={(option) => (option ? option.ingredientName : "")}
      renderInput={(params) => {
        console.log(params);
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
