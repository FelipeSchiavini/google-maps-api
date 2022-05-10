import { IconButton, InputAdornment, Button } from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GoogleIcon from "@mui/icons-material/Google";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmailAndPassword,
  signInWithGoogle,
} from "../../database/firebase/Auth";
import {
  Separator,
  InputForm,
  InputButton,
  BackgroundAnimation,
  ErrorMessage,
  Box,
  Image,
  Form,
  Wrapper,
} from "../../styles";
import { SucessAlert, ErrorAlert } from "../utils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showSucess, setShowSucess] = useState(false);
  const [showError, setShowError] = useState(false);

  console.log(process.env);

  const onSubmit = (data) => {
    loginWithEmailAndPassword(
      data.email,
      data.password,
      () => {
        setShowSucess(true);
        setTimeout(() => navigate("/maps"), 2000);
      },
      (e) => {
        console.log(e);
      }
    );
  };

  const loginWithGoogle = () => {
    signInWithGoogle(
      () => navigate("/maps"),
      (e) => console.log(e)
    );
  };

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <BackgroundAnimation>
      <Wrapper>
        {showSucess && (
          <SucessAlert message="Logado com " strongMessage="Sucesso!" />
        )}
        {showError && (
          <ErrorAlert message="Armazem não foi criado " strongMessage="Erro" />
        )}

        <Image
          width="250px"
          src={require("../../images/logo-removebg-preview.png")}
          alt="cygni logo"
        />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <InputForm
              placeholder="e-mail"
              {...register("email", { required: true })}
              error={errors.username ? true : false}
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
            {errors.email && <ErrorMessage>Password is required!</ErrorMessage>}
          </Box>
          <Box>
            <InputForm
              placeholder="password"
              {...register("password", { required: true })}
              error={errors.password ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              type={values.showPassword ? "text" : "password"}
            />
            {errors.password && (
              <ErrorMessage>Password is required!</ErrorMessage>
            )}
          </Box>
          <InputButton type="submit" value="LOGAR" />
        </Form>
        <Button
          onClick={loginWithGoogle}
          variant="contained"
          disableElevation
          startIcon={<GoogleIcon />}
        >
          Login com Google
        </Button>

        <Separator />

        <Button
          variant="contained"
          disableElevation
          startIcon={<AccountCircleIcon />}
          onClick={() => navigate("/register")}
        >
          Criar Nova Conta
        </Button>
      </Wrapper>
    </BackgroundAnimation>
  );
};

export default Login;
