import { Container, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";

const DailyPlanner = ({ sx }) => {
  const { selectDate } = useSelector((state) => state.planner);
  //   console.log(selectDate);
  const dateObject = new Date(selectDate);
  const formattedDate = dateObject.toLocaleDateString();
  let mealList = [
    {
      id: 1,
      title: "Miso-Butter Roast Chicken With Acorn Squash Panzanella",
      url: "http://localhost:8000/images/miso-butter-roast-chicken-acorn-squash-panzanella.jpg",
    },
    {
      id: 2,
      title: "Crispy Salt and Pepper Potatoes",
      url: "http://localhost:8000/images/crispy-salt-and-pepper-potatoes-dan-kluger.jpg",
    },
  ];

  return (
    <Container component="div" sx={{ ...sx }}>
      <Typography variant="subtitle1">Daily planner</Typography>
      <Typography variant="h4">{formattedDate}</Typography>
      <List sx={{ overflow: "auto", height: 500 }}>
        {mealList.map((meal) => (
          <ListItem key={meal.id}>
            <img width="30%" alt={meal.title} src={meal.url} />
            <Typography paddingLeft={3} variant="body">
              {meal.title}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DailyPlanner;
