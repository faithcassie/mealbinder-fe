import { Stack } from "@mui/material";
import React from "react";
import Menu from "./Menu";
import Logo from "./Logo";
import Bar from "./Bar";

const Header = () => {
  return (
    <Stack
      direction="row"
      spacing="2"
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "20px",
      }}
    >
      <Menu />
      <Stack
        direction="row"
        spacing="2"
        sx={{
          width: "auto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Bar />
        <Logo />
      </Stack>
    </Stack>
  );
};

export default Header;
