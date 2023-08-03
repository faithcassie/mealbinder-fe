import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAuth from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import { FormProvider } from "../components/form/FormProvider";
import { FTextField } from "../components/form/FTextField";
import googleImg from "../assets/google.png";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  const googleAuth = () => {
    const response = window.open(
      `${process.env.REACT_APP_BACKEND_API}/auth/google`,
      "_self"
    );
  };

  return (
    <Box
      sx={{
        width: { lg: 500, xs: 300 },
        height: "auto",
        borderRadius: "45px",
        backgroundColor: "background.paper",
        border: 0.8,
        py: 6,
        my: 10,
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" align="center">
          Welcome back!
        </Typography>
        {!!errors.responseError && (
          <Alert severity="error">{errors.responseError.message}</Alert>
        )}
        <Stack sx={{ width: "100%" }} alignItems="center" paddingTop="20px">
          <FTextField
            name="email"
            label="Email*"
            variant="standard"
            sx={{ width: { lg: "60%", xs: "70%" }, py: 2 }}
            inputProps={{
              autoComplete: "email",
            }}
          />
          <FTextField
            name="password"
            label="Password*"
            type="password"
            variant="standard"
            sx={{ width: { lg: "60%", xs: "70%" }, py: 2 }}
            inputProps={{
              autoComplete: "current-password",
            }}
          />
          <Stack spacing={1} direction="row" paddingTop="10px" width="auto">
            <Link to="/" className="link">
              Forgot password?
            </Link>
            <Link
              to="/register"
              className="link"
              component={<RegistrationPage />}
            >
              Sign up here
            </Link>
          </Stack>

          <Stack spacing={3} direction="row" paddingTop="50px">
            <Button variant="text" onClick={() => reset()}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              variant="contained"
              color="secondary"
            >
              Log In
            </LoadingButton>
          </Stack>
          <p>or</p>
        </Stack>
      </FormProvider>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <button className="google_btn" onClick={googleAuth}>
          <img src={googleImg} alt="google icon" />
          <span>Sign in with Google</span>
        </button>
      </Box>
    </Box>
  );
};

export default LoginPage;
