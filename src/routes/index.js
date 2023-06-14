import React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import AuthRequire from "./AuthRequire";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layouts/MainLayout";
import Recipe from "../components/Recipe";
import Insights from "../components/Insights";
import Planner from "../components/Planner";

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
        <Route index element={<Recipe />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/planner" element={<Planner />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
