import React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import AuthRequire from "./AuthRequire";
import RecipePage from "../pages/RecipePage";
import MainLayout from "../layouts/MainLayout";
// import Planner from "../pages/PlannerPage";
import HomePage from "../pages/HomePage";
import InsightsPage from "../pages/InsightsPage";
import PlannerPage from "../pages/PlannerPage";
import CreateRecipe from "../components/CreateRecipe";
import EditRecipe from "../components/EditRecipe";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        {/* <Route path="recipes" element={<Recipe />} /> */}
        <Route path="recipes/:id" element={<RecipePage />} />
        {/* <Route path="recipes/edit" element={<EditRecipe />} /> */}
        <Route path="recipes/create" element={<CreateRecipe />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="planner" element={<PlannerPage />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
