import { DateCalendar } from "@mui/x-date-pickers";
import React from "react";
import Calendar from "../components/Calendar";
import { Box, Container, Stack, Typography } from "@mui/material";
import DailyPlanner from "../components/DailyPlanner";

const PlannerPage = () => {
  return (
    <Stack direction={{ xs: "column", md: "row" }}>
      <Container
        sx={{
          width: { xs: "80%", md: "40%" },
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
            minHeight: 150,
            // height: { xs: 100, md: "15%" },
            backgroundColor: "#FFFFFFBF",
            justifyContent: "center",
            mb: 5,
          }}
        >
          <Typography variant="h5" textAlign="center" p={2}>
            Meals I have prepped
          </Typography>
          <Typography variant="h3" textAlign="center" pb={2}>
            200
          </Typography>
        </Box>
        <Calendar />
      </Container>
      <Container
        sx={{
          width: { xs: "80%", md: "60%" },
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
            py: 5,
          }}
        >
          <DailyPlanner sx={{ mx: 2 }} />
        </Box>
      </Container>
    </Stack>
  );
};

export default PlannerPage;
