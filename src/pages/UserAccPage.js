import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AvatarUpload } from "../utils/avatarUpload";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, updateCurrentUser } from "../store/slices/userSlice";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UserAccPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { avatarUrl, updatedProfile } = useSelector((state) => state.user);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [country, setCountry] = useState(user.country);
  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleSubmit = () => {
    dispatch(updateCurrentUser({ name, avatarUrl, country }));
  };

  return (
    <Container
      component="div"
      sx={{
        width: "100%",
        minHeight: "fit-content",
        backgroundColor: "#ffffffc8",
        borderRadius: 25,
        mt: 5,
        transform: "translateY(-5px)",
        boxShadow: "0 0 8px 5px #00000015",
        transitionDuration: "0.3s",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ width: "80%", mx: "auto" }}
      >
        <AvatarUpload />
        <Box
          sx={{
            width: "100%",
            minHeight: "fit-content",
            padding: 5,
            ml: { xs: 0, md: 3 },
            my: "auto",
          }}
        >
          <Typography variant="h4" py={3}>
            My Account
          </Typography>
          <TextField
            label="My name"
            variant="outlined"
            sx={{ width: "100%", my: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            sx={{ width: "100%", mb: 2 }}
            value={user.email}
            disabled
            helperText="Email cannot be changed"
          />
          <TextField
            label="Country"
            variant="outlined"
            sx={{ width: "100%", mb: 2 }}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Box>
      </Stack>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box
          sx={{
            width: "fit-content",
            mb: 3,
            padding: 5,
            mx: "auto",
          }}
        >
          <Button variant="text" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#AB6614", m: 3 }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default UserAccPage;
