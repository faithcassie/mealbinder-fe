import React, { useEffect } from "react";
import Calendar from "../components/Calendar";
import { Box, Container, Stack, Typography } from "@mui/material";
import DailyPlanner from "../components/DailyPlanner";
import { useSelector } from "react-redux";

const PlannerPage = () => {
  const { totalMealPrep } = useSelector((state) => state.planner);

  return (
    <Stack direction={{ xs: "column", md: "row" }} sx={{ pt: 3 }}>
      <Container
        sx={{
          width: { xs: "100%", md: "40%" },
          height: "auto",
          display: "flex",
          pt: 3,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFFBF",
            justifyContent: "center",
            mb: 5,
            p: 3,
            transform: "translateY(-5px)",
            boxShadow: "0 0 8px 5px #00000015",
            transitionDuration: "0.3s",
            borderRadius: 18,
          }}
        >
          <Typography variant="h6" textAlign="center" p={2}>
            Meals I have prepped
          </Typography>
          <Typography variant="h3" textAlign="center" pb={2}>
            {totalMealPrep}
          </Typography>
        </Box>
        <Calendar />
      </Container>
      <Container
        sx={{
          width: { xs: "100%", md: "60%" },
          height: "auto",
          display: "flex",
          pt: 3,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#FFFFFFBF",
            justifyContent: "center",
            minHeight: 500,
            height: "100%",
            px: { xs: 2, md: 5 },
            py: 6,
            transform: "translateY(-5px)",
            boxShadow: "0 0 8px 5px #00000015",
            transitionDuration: "0.3s",
            borderRadius: 18,
          }}
        >
          <DailyPlanner />
        </Box>
      </Container>
    </Stack>
  );
};

export default PlannerPage;
