import { Container } from "@mui/material";
import React from "react";
import Filter from "./Filter";

const Recipe = () => {
  return (
    <Container>
      <h2>Filter</h2>
      <Filter />
      <h2>pagination</h2>
      <h2>Recipes</h2>
      <h4>Recipe card</h4>
    </Container>
  );
};

export default Recipe;
