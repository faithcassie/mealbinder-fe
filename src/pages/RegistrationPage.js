import { Box, Button, Stack, Typography, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAuth from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { FormProvider } from "../components/form/FormProvider";
import { FTextField } from "../components/form/FTextField";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

const RegistrationPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    // console.log(name);
    try {
      await auth.register({ name, email, password }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: { lg: 500, xs: 300 },
          height: 500,
          borderRadius: "45px",
          backgroundColor: "background.paper",
          border: 0.8,
          pt: 6,
        }}
      >
        <Typography variant="h6" align="center">
          Let's start your journey!
        </Typography>
        {!!errors.responseError && (
          <Alert severity="error">{errors.responseError.message}</Alert>
        )}
        <Stack alignItems="center" paddingTop="20px">
          <FTextField
            name="name"
            label="Full name*"
            variant="standard"
            sx={{ width: { lg: "60%", xs: "70%" }, py: "20px" }}
          />
          <FTextField
            name="email"
            label="Email*"
            variant="standard"
            sx={{ width: { lg: "60%", xs: "70%" }, py: 2 }}
          />
          <FTextField
            name="password"
            label="Password*"
            type="password"
            variant="standard"
            sx={{ width: { lg: "60%", xs: "70%" }, py: 2 }}
          />
          <Typography
            variant="subtittle2"
            fontSize="12px"
            fontWeight="bold"
            pt={3}
            width={{ lg: "60%", xs: "70%" }}
            textAlign="right"
            color="primary.orange"
          >
            By submitting, you agree to our Term and Privacy Policy.
          </Typography>
          <Stack spacing={3} direction="row" paddingTop="50px">
            <Button variant="text">Cancel</Button>
            <LoadingButton
              type="submit"
              variant="contained"
              color="secondary"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default RegistrationPage;
