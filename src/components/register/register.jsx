import { IconButton, InputAdornment, Button } from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp, signInWithGoogle } from "../../database/firebase/Auth";
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
import { SucessAlert } from "../utils";

const Register = () => {
  const [showSucess, setShowSucess] = useState(false);
  const [values, setValues] = useState({
    showPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    signUp(
      data.username,
      data.email,
      data.password,
      () => {
        setShowSucess(true);
        setTimeout(() => navigate("/maps"), 2000);
      },
      (e) => console.log(e)
    );
  };

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
          <SucessAlert message="Criado com " strongMessage="Sucesso!" />
        )}

        <Image
          width="250px"
          src={require("../../images/logo-removebg-preview.png")}
          alt="cygni logo"
        />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <InputForm
              placeholder="username"
              {...register("username", { required: true })}
              error={errors.username ? true : false}
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
            {errors.username && (
              <ErrorMessage>Password is required!</ErrorMessage>
            )}
          </Box>
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
          <InputButton type="submit" value="CRIAR" />
        </Form>
        <Separator />

        <Button
          variant="contained"
          disableElevation
          onClick={() => navigate("/")}
        >
          Voltar
        </Button>
      </Wrapper>
    </BackgroundAnimation>
  );
};

export default Register;
