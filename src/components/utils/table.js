import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { addProduct } from "../../database/firebase/products";
import { TextWithLink } from "../../styles";
import { RegisterProduct } from "../modal/insert-product";

function Row(props) {
  const [openModal, setModalOpen] = useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);
  const { row } = props;
  const [open, setOpen] = useState(false);

  const setCenter = () => {
    props.setCenter(props.row.location);
  };

  return (
    <React.Fragment>
      <RegisterProduct
        open={openModal}
        handleClose={handleClose}
        storage={props}
      />

      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              setCenter();
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          onClick={() => handleOpen()}
          style={{ cursor: "pointer" }}
        >
          <TextWithLink>{row.name}</TextWithLink>
        </TableCell>

        <TableCell
          align="right"
          onClick={setCenter}
          style={{ cursor: "pointer" }}
        >
          {row.adress}
        </TableCell>
        <TableCell align="right">{row.location.lng}</TableCell>
        <TableCell align="right">{row.location.lat}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Produtos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell align="right">Preço</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell component="th" scope="row">
                        <strong>{product.name}</strong>
                      </TableCell>
                      <TableCell>{product.amount}</TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Armazém</TableCell>
            <TableCell align="right">Endereço</TableCell>
            <TableCell align="right">Longitude</TableCell>
            <TableCell align="right">Latitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.storages.map((row) => (
            <Row setCenter={props.setCenter} key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
