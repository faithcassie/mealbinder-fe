import { Textarea } from "@mui/joy";
import {
  Box,
  Button,
  Container,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch(
        "https://formsubmit.co/faithc.nguyen@gmail.com",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
    }
  };

  return (
    <Container
      component="div"
      className="contact-form"
      sx={{
        backgroundColor: "#FFFFFFBF",
        transform: "translateY(-5px)",
        boxShadow: "0 0 8px 5px #00000015",
        transitionDuration: "0.3s",
        padding: { xs: 0, md: 5 },
        width: "80%",
        mx: "auto",
        borderRadius: 15,
        mt: 5,
      }}
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <Box sx={{ padding: 5 }}>
            <Typography variant="h3" marginY={5}>
              Contact us
            </Typography>
            <TextField
              name="fname"
              label="What's your name?"
              required
              sx={{ width: "100%" }}
            />

            <TextField
              fullWidth
              name="email"
              type="email"
              label="Your email?"
              required
              sx={{ marginTop: 2, width: "100%" }}
            />

            <TextField
              multiline
              name="message"
              rows={10}
              label="Leave us a message. :) "
              required
              sx={{ marginTop: 2, width: "100%" }}
            />
            <br />
            <Button
              sx={{ my: 3, backgroundColor: "#AB6614" }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      ) : (
        <Box sx={{ padding: 6, height: "500px" }}>
          <Typography variant="h4">Thank you for your message!</Typography>
          <p>We'll get back to you as soon as possible.</p>
        </Box>
      )}
    </Container>
  );
};

export default ContactPage;
