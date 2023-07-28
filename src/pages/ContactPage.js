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
    // Extract form data
    const formData = new FormData(event.target);

    try {
      // Send the form data to the specified URL using fetch
      const response = await fetch(
        "https://formsubmit.co/faithc.nguyen@gmail.com",
        {
          method: "POST",
          body: formData,
        }
      );

      // Check if the form submission was successful (response code 200)
      if (response.ok) {
        setIsSubmitted(true); // Set the submitted state to true
      }
    } catch (error) {
      // Handle fetch error (optional)
      console.error("Error occurred while submitting the form:", error);
    }
  };

  return (
    <Container
      component="div"
      className="contact-form"
      //   maxWidth="sm"
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
            <Typography variant="h4" marginY={5}>
              Contact us
            </Typography>
            <TextField
              id="fname"
              name="fname"
              label="What's your name?"
              required
              sx={{ width: "100%" }}
            />

            <TextField
              fullWidth
              id="email"
              name="email"
              type="email"
              label="Your email?"
              required
              sx={{ marginTop: 2, width: "100%" }}
            />
            <br />
            <TextField
              multiline
              name="message"
              id="message"
              rows={10}
              placeholder="Leave us a message. :)"
              required
              variant="filled"
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
        <Box sx={{ padding: 5 }}>
          <Typography variant="h4">Thank you for your message!</Typography>
          <p>We'll get back to you as soon as possible.</p>
        </Box>
      )}
    </Container>
  );
};

export default ContactPage;
