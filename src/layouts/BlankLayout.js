import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";
import React from "react";

function BlankLayout() {
  return (
    // <Stack minHeight="100vh" justifyContent="center" alignItems="center">
    <Stack minHeight="100vh" alignItems="center">
      <Logo sx={{ pt: "50px", width: 200 }} />
      <Outlet />
    </Stack>
  );
}
export default BlankLayout;
