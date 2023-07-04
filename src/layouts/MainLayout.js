import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Header />

      <Outlet />
    </Container>
  );
};

export default MainLayout;
