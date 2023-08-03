import { Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import Insights from "../pages/InsightsPage";
import Recipe from "../pages/HomePage";
import Planner from "../pages/PlannerPage";

const Bar = () => {
  return (
    <Stack
      direction="row"
      spacing="2"
      sx={{
        justifyContent: "space-evenly",
        display: { xs: "none", md: "flex" },
        width: "300px",
      }}
    >
      <NavLink
        to="/insights"
        className={({ isActive }) => (isActive ? "active" : "dashboard-link")}
        component={<Insights />}
      >
        Insights
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "dashboard-link")}
        component={<Recipe />}
      >
        Recipes
      </NavLink>
      <NavLink
        to="/planner"
        className={({ isActive }) => (isActive ? "active" : "dashboard-link")}
        component={<Planner />}
      >
        Planner
      </NavLink>
    </Stack>
  );
};

export default Bar;
