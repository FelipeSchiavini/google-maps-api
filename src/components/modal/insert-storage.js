import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import React from "react";
import {
  InputForm,
  InputButton,
  ErrorMessage,
  Form,
  ModalWrapper,
} from "../../styles";
import { ModalStorage, Text } from "./modal.style";
import StorageController from "../../controller/storage";
import { useState } from "react";
import { SucessAlert, ErrorAlert } from "../utils/index";
import { Image } from "../../styles";

export const RegisterStorage = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showSucess, setShowSucess] = useState(false);
  const [showError, setShowError] = useState(false);

  const onSubmit = async (data, e) => {
    const storage = new StorageController(data.storageName, props.adress);
    const id = await storage.create();
    e.target.reset();
    if (id) {
      setShowSucess(true);
    } else {
      setShowError(true);
    }
    setTimeout(() => {
      props.handleClose();
      setShowError(false);
      setShowSucess(false);
    }, 2000);
  };

  return (
    <ModalStorage open={props.open} onClose={props.handleClose}>
      <ModalWrapper>
        {showSucess && (
          <SucessAlert message="Criado com " strongMessage="Sucesso!" />
        )}
        {showError && (
          <ErrorAlert message="Armazem não foi criado " strongMessage="Erro" />
        )}
        <Image
          width="250px"
          src={require("../../images/logo-removebg-preview.png")}
          alt="cygni logo"
        />
        <Text>
          {props.adress
            ? `Insira o nome do armazem localizado no endereço: ${props.adress}`
            : `Selecione um endereço antes de inserir o armazém`}
        </Text>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <InputForm
              placeholder="Nome do armazem"
              {...register("storageName", { required: true })}
              error={errors.username ? true : false}
              id="input-with-icon-adornment"
            />
            {errors.storageName && (
              <ErrorMessage>Password is required!</ErrorMessage>
            )}
          </Box>

          <InputButton type="submit" value="Adicionar Armazem" />
        </Form>
      </ModalWrapper>
    </ModalStorage>
  );
};
