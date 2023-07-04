import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link } from "react-router-dom";

const RecipeCard = ({ value }) => {
  // console.log(value.id);
  let key = value.id;
  return (
    <Card
      key={key}
      sx={{
        maxWidth: "250px",
        minHeight: "300px",
        // borderRadius: "20px",
        border: "solid black 0.7px",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        // backgroundColor: "red",
      }}
    >
      <CardActionArea component={Link} to={`recipes/${key}`}>
        <CardMedia
          component="img"
          height="200px"
          alt={value.title}
          image={value.url}
        />
      </CardActionArea>

      <CardContent
        sx={{
          height: "auto",
          ml: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Typography variant="subtitle1">{value.title}</Typography>

        <Stack direction="row" alignItems="center">
          <Link className="link" to={`recipes/${key}`}>
            Details
          </Link>
          <IconButton sx={{ pl: 2 }} aria-label="add to planner">
            <ControlPointIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
