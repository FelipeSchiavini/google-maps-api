import Modal from "@mui/material/Modal";
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
import { useEffect, useState } from "react";
import { SucessAlert, ErrorAlert } from "../utils/index";
import { Image } from "../../styles";
import { addProduct } from "../../database/firebase/products";
import { Separator } from "../../styles";

export const RegisterProduct = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showSucess, setShowSucess] = useState(false);
  const [showError, setShowError] = useState(false);

  const onSubmit = async (data, e) => {
    try {
      addProduct(props.storage.row, {
        name: data.productName,
        amount: data.amount,
        price: data.price,
      });
      setShowSucess(true);
      setTimeout(() => {
        e.target.reset();
        props.handleClose();
        setShowError(false);
        setShowSucess(false);
      }, 2000);
    } catch (e) {
      console.log(e);
      setShowError(true);
      setTimeout(() => {
        props.handleClose();
        setShowError(false);
      }, 2000);
    }
  };

  return (
    <>
      <ModalStorage open={props.open} onClose={props.handleClose}>
        <>
          <ModalWrapper>
            {showSucess && (
              <SucessAlert message="Criado com " strongMessage="Sucesso!" />
            )}
            {showError && (
              <ErrorAlert
                message="Armazem não foi criado "
                strongMessage="Erro"
              />
            )}
            <Image
              width="250px"
              src={require("../../images/logo-removebg-preview.png")}
              alt="cygni logo"
            />
            <Text>
              Insira um produto no armazem:{" "}
              <strong style={{ color: "rgb(100,180, 20)" }}>
                {props.storage.row.name}
              </strong>
            </Text>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <InputForm
                  defaultValue=""
                  placeholder="Nome do produto"
                  {...register("productName", { required: true })}
                  error={errors.productName ? true : false}
                  id="input-with-icon-adornment"
                />
              </Box>
              {errors.productName && (
                <ErrorMessage>product name is required!</ErrorMessage>
              )}
              <Box>
                <InputForm
                  placeholder="Quantidade (núm)"
                  {...register("amount", { required: true })}
                  error={errors.amount ? true : false}
                  id="input-with-icon-adornment"
                />
              </Box>
              {errors.amount && (
                <ErrorMessage>Amount is required!</ErrorMessage>
              )}
              <Box>
                <InputForm
                  placeholder="Preço"
                  {...register("price", { required: true })}
                  error={errors.price ? true : false}
                  id="input-with-icon-adornment"
                />
                {errors.price && (
                  <ErrorMessage>Price is required!</ErrorMessage>
                )}
              </Box>

              <InputButton type="submit" value="Adicionar Armazem" />
            </Form>
          </ModalWrapper>
        </>
      </ModalStorage>
    </>
  );
};
