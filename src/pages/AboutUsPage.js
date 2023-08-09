import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        mt: 10,
        minHeight: "100vh",
        width: { xs: "90%", md: "70%" },
        backgroundColor: "#FFFFFFBF",
        padding: { xs: 5, md: 15 },
        transform: "translateY(-5px)",
        boxShadow: "0 0 8px 5px #00000015",
        transitionDuration: "0.3s",
        borderRadius: 20,
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" textAlign="center" mt={3}>
          About us
        </Typography>
        <Typography variant="subtitle1" mt={5}>
          At MealBinder, we believe that cooking should be a joyous experience,
          and meal planning should be effortless. We understand the challenges
          of juggling busy schedules while trying to maintain a healthy and
          delicious diet. That's why we created MealBinder – your all-in-one
          solution for recipe organization and daily meal planning.
        </Typography>
        <Typography variant="h6" mt={5}>
          Who We Are
        </Typography>
        <Typography variant="body" mt={3}>
          MealBinder is a dedicated team of food enthusiasts and tech-savvy
          individuals who are passionate about simplifying your culinary
          journey. Our mission is to empower you to create delightful meals
          while streamlining your kitchen organization. Whether you're a
          seasoned chef or an aspiring home cook, our platform is designed to
          cater to all skill levels and culinary preferences.
        </Typography>
        <Typography variant="h6" mt={5}>
          What We Offer
        </Typography>
        <Typography variant="body" mt={3}>
          With MealBinder, you can bid farewell to scattered recipe cards,
          endless bookmarked websites, and last-minute meal decisions. Our
          platform provides a seamless experience for storing, organizing, and
          accessing your favorite recipes from any device with an internet
          connection. From cherished family recipes passed down through
          generations to exciting new discoveries, our recipe storage system
          ensures that all your culinary inspirations are just a click away.
        </Typography>
        <Typography variant="h6" mt={5}>
          Plan Your Meals with Ease
        </Typography>
        <Typography variant="body" mt={3}>
          Struggling to figure out what to cook for the week? Our intuitive meal
          planning feature takes the stress out of daily meal decisions. Simply
          browse your recipe collection or explore our curated recipe library,
          and with a few clicks, create a personalized meal plan for the entire
          week. Whether you're aiming for a balanced diet, following dietary
          restrictions, or seeking creative culinary adventures, our meal
          planner adapts to your unique preferences.
        </Typography>
        <Typography variant="h6" mt={5}>
          Seamless Integration and Sharing
        </Typography>
        <Typography variant="body" mt={3}>
          MealBinder values the power of connection, so we've made it effortless
          for you to share your favorite recipes with friends, family, or your
          entire cooking community. Collaborate on meal planning with loved
          ones, exchange culinary tips, or simply inspire each other to try new
          dishes. Our platform encourages culinary camaraderie and ensures that
          every meal becomes a shared celebration.
        </Typography>
        <Typography variant="h6" mt={5}>
          Privacy and Security
        </Typography>
        <Typography variant="body" mt={3}>
          We understand that your recipe collection is not just a list of
          ingredients but a representation of your culinary journey and
          treasured memories. Your privacy and security are of utmost importance
          to us. With MealBinder, rest assured that your recipe collection is
          entirely private, and you have full control over who can access your
          shared recipes.
        </Typography>
        <Typography variant="h6" mt={5}>
          Join the MealBinder Community
        </Typography>
        <Typography variant="body" mt={3}>
          We invite you to join our ever-growing community of food enthusiasts
          who are embracing the joy of cooking and the convenience of meal
          planning. Whether you're an individual seeking kitchen organization or
          a culinary group eager to explore new tastes together, MealBinder is
          your go-to platform for a delightful and efficient cooking experience.
        </Typography>
        <Typography variant="body" mt={3}>
          Thank you for choosing MealBinder as your trusted meal planning and
          recipe storage companion. We're excited to embark on this culinary
          journey with you, one delicious meal at a time.
        </Typography>

        <Typography variant="body" mt={3}>
          Happy cooking!
        </Typography>
        <Typography variant="subtitle1" mt={3}>
          The MealBinder Team
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
