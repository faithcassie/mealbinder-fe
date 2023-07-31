import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InsightsIcon from "@mui/icons-material/Insights";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useAuth from "../contexts/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/slices/userSlice";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const { avatarUrl } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [avatarUrl, dispatch]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleLogOut = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_API}/auth/logout`,
      {
        credentials: "include",
        mode: "no-cors",
      }
    );
    await auth.logout(() => {
      navigate("/login", { replace: true });
    });
  };
  return (
    <Box sx={{ textAlign: "left", width: "150px" }}>
      <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
        <MenuIcon color="primary" />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            mt: "50px",
            mb: { xs: "100px", md: "50px" },
          }}
        />

        <List>
          <ListItem sx={{ display: { xs: "flex", md: "none" }, my: 0, py: 0 }}>
            <ListItemButton component={Link} to="/insights" className="link">
              <InsightsIcon sx={{ pr: "10px" }} />
              {/* <Link to="/insights" className="link" component={<Insights />}> */}
              Insights
              {/* </Link> */}
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ display: { xs: "flex", md: "none" }, my: 0, py: 0 }}>
            <ListItemButton component={Link} to="/" className="link">
              <MenuBookIcon sx={{ pr: "10px" }} />
              {/* <Link to="/" className="link" component={<Recipe />}> */}
              Recipes
              {/* </Link> */}
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ display: { xs: "flex", md: "none" }, my: 0, py: 0 }}>
            <ListItemButton component={Link} to="/planner" className="link">
              <CalendarTodayIcon sx={{ pr: "10px" }} />
              {/* <Link to="/planner" className="link" component={<Planner />}> */}
              Planner
              {/* </Link> */}
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ my: 0, py: 0 }}>
            <ListItemButton component={Link} to="/" className="link">
              <HomeIcon sx={{ pr: "10px" }} />
              {/* <Link to="/" className="link"> */}
              Dashboard
              {/* </Link> */}
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ my: 0, py: 0 }}>
            <ListItemButton component={Link} to="/myaccount" className="link">
              <AccountCircleIcon sx={{ pr: "10px" }} />
              {/* <Link to="/myaccount" className="link"> */}
              Account
              {/* </Link> */}
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ my: 0, py: 0 }}>
            <ListItemButton component={Link} to="/aboutus" className="link">
              <InfoIcon sx={{ pr: "10px" }} />
              {/* <Link to="/aboutus" className="link"> */}
              About us
              {/* </Link> */}
            </ListItemButton>
          </ListItem>

          <ListItem sx={{ my: 0, py: 0 }}>
            <ListItemButton component={Link} to="/contactus" className="link">
              <EmailIcon sx={{ pr: "10px" }} />
              {/* <Link to="/contactus" className="link"> */}
              Contact us
              {/* </Link> */}
            </ListItemButton>
          </ListItem>
        </List>

        <Button
          onClick={handleLogOut}
          sx={{ mt: "100px" }}
          startIcon={<ExitToAppIcon />}
        >
          Sign out
        </Button>
      </SwipeableDrawer>
    </Box>
  );
};

export default Menu;
