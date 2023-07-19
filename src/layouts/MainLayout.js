import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AlertMsg from "../components/AlertMsg";

const MainLayout = () => {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Header />
      <AlertMsg />
      <Outlet />

      <Box
        sx={{
          width: "100%",
          height: "fit-content",
          p: 3,
          mt: 10,
        }}
      >
        <Typography color="black" textAlign="center" variant="subtitle2">
          All rights reserved. 2023
        </Typography>
      </Box>
    </Container>
  );
};

export default MainLayout;
