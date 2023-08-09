import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import AuthRequire from "./AuthRequire";
import RecipePage from "../pages/RecipePage";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import InsightsPage from "../pages/InsightsPage";
import PlannerPage from "../pages/PlannerPage";
import CreateRecipe from "../components/CreateRecipe";
import AboutUsPage from "../pages/AboutUsPage";
import UserAccPage from "../pages/UserAccPage";
import ContactPage from "../pages/ContactPage";
import { AnimatePresence } from "framer-motion";

const Router = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AuthRequire>
              <MainLayout />
            </AuthRequire>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="recipes/:id" element={<RecipePage />} />
          <Route path="recipes/create" element={<CreateRecipe />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="planner" element={<PlannerPage />} />
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path="myaccount" element={<UserAccPage />} />
          <Route path="contactus" element={<ContactPage />} />
        </Route>
        <Route element={<BlankLayout />}>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
