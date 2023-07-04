import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import InsightData from "../components/sample/InsightData";
import { MealData } from "../components/sample/MealData";
import flourImg from "../assets/flour.png";

const InsightsPage = () => {
  const [tagData, setTagData] = useState({
    labels: InsightData.map((data) => data.tag),
    datasets: [
      {
        // label: "Recipe total in each tag",
        data: InsightData.map((data) => data.counts),
        backgroundColor: [
          "#656565",
          "#EDC597",
          "#B4E1FF",
          "#AB87FF",
          "#FFACE4",
        ],
      },
    ],
  });
  const [mealData, setMealData] = useState({
    labels: MealData.map((data) => data.year),
    datasets: [
      {
        label: "Meals prepped",
        data: MealData.map((data) => data.mealCounts),
      },
    ],
  });

  return (
    <Container sx={{ mt: 10 }}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#FFFFFFBF",
          mb: 5,
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={flourImg} alt="flour-img" className="illust" />
        <Typography variant="h5">Let's see!</Typography>
      </Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ width: "auto" }}
      >
        <Box
          sx={{
            maxWidth: 500,
            backgroundColor: "#FFFFFFBF",
            p: 5,
          }}
        >
          <Typography variant="h5" textAlign="center" pb={3}>
            Recipe Total in Tags
          </Typography>
          <PieChart pieData={tagData} />
        </Box>
        <Box sx={{ width: "100%", backgroundColor: "#FFFFFFBF", p: 3 }}>
          <Typography variant="h5">Meals prepped in Years</Typography>
          <LineChart chartData={mealData} />
        </Box>
      </Stack>
    </Container>
  );
};

export default InsightsPage;
