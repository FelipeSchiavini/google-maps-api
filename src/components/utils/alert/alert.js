import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export const SucessAlert = (props) => {
  const { message, strongMessage } = props;
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="success">
        <AlertTitle>Successo !</AlertTitle>
        {message} <strong>{strongMessage}</strong>
      </Alert>
    </Stack>
  );
};

export const ErrorAlert = (message, strongMessage) => {
  <Stack sx={{ width: "100%" }} spacing={2}>
    <Alert severity="error">
      <AlertTitle>Erro !</AlertTitle>
      {message} <strong>{strongMessage}</strong>
    </Alert>
  </Stack>;
};
