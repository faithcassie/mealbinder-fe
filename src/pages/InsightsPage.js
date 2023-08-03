import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import flourImg from "../assets/flour.png";
import { useDispatch, useSelector } from "react-redux";
import { getMealData, getTagData } from "../store/slices/insightSlice";

const InsightsPage = () => {
  const { recipeInsight, mealInsight } = useSelector((state) => state.insight);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTagData());
    dispatch(getMealData());
  }, []);

  let tagData;
  if (recipeInsight.length !== 0) {
    tagData = {
      labels: recipeInsight.map((data) => data.name.tag),
      datasets: [
        {
          data: recipeInsight.map((data) => data.count),
          backgroundColor: [
            "#5DC597",
            "#EDC597",
            "#B4E1FF",
            "#AB87FF",
            "#FFACE4",
          ],
        },
      ],
    };
  }
  let mealData;
  if (mealInsight.length !== 0) {
    mealData = {
      labels: mealInsight.map((data) => data._id),

      datasets: [
        {
          label: "Meals prepped",
          data: mealInsight.map((data) => data.count),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <Container sx={{ pt: 8 }}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#FFFFFFBF",
          mb: 5,
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateY(-5px)",
          boxShadow: "0 0 8px 5px #00000015",
          transitionDuration: "0.3s",
          borderRadius: 18,
        }}
      >
        <img src={flourImg} alt="flour-img" className="illust" />
        <Typography variant="h5">Let's see!</Typography>
      </Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={5}
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            backgroundColor: "#FFFFFFBF",
            transform: "translateY(-5px)",
            boxShadow: "0 0 8px 5px #00000015",
            transitionDuration: "0.3s",
            borderRadius: 18,
            p: 5,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" textAlign="center" pb={3}>
            Recipe Total in Tags
          </Typography>
          {/* pie chart here */}
          {tagData && <PieChart pieData={tagData} />}
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            minHeight: "300px",
            backgroundColor: "#FFFFFFBF",
            p: 5,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            transform: "translateY(-5px)",
            boxShadow: "0 0 8px 5px #00000015",
            transitionDuration: "0.3s",
            borderRadius: 18,
          }}
        >
          <Typography sx={{ pb: 3 }} variant="h5">
            Meals prepped in a week
          </Typography>
          {/* line chart here */}
          {mealData && <BarChart chartData={mealData} />}
        </Box>
      </Stack>
    </Container>
  );
};

export default InsightsPage;
