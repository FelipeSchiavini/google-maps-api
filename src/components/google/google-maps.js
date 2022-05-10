import Button from "@mui/material/Button";

import { AutoCompleteInput, SearchBarWrapper } from "./google-maps.style";
import { Autocomplete } from "@react-google-maps/api";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React, { useState, useRef, useEffect } from "react";

import { getStorage } from "../../database/firebase/storage";
import { RegisterStorage } from "../modal/insert-storage";
import options, { marker } from "./options";
import CollapsibleTable from "../utils/table";
import { Separator } from "../../styles";
import env from "react-dotenv";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const GoogleMapss = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [storages, setStorages] = useState();
  const [libraries] = useState(["places"]);
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      return navigate("/");
    }
    const unsubscribe = getStorage((storages) => setStorages(storages));
    return unsubscribe;
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const showProducts = (id) => {
    const storage = storages.find((storage) => storage.id == id);
    const products = storage.products;
    const productNames = products.map((product) => product.name);
    alert(`Lista de produtos do armazem: ${productNames.toString()}`);
  };

  const originRef = useRef();

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          options={options.config}
          mapContainerStyle={options.style}
          center={center}
          zoom={12}
        >
          <>
            {storages?.map((storage) => {
              return (
                <Marker
                  key={storage.id}
                  position={storage.location}
                  options={marker(storage.name)}
                  onClick={() => showProducts(storage.id)}
                />
              );
            })}
          </>
        </GoogleMap>
      )}
      <SearchBarWrapper>
        {isLoaded && (
          <Autocomplete>
            <AutoCompleteInput
              type="text"
              placeholder="Endereço do Armazém"
              ref={originRef}
            />
          </Autocomplete>
        )}
        <Button color="primary" variant="contained" onClick={handleOpen}>
          Inserir Armazém
        </Button>
      </SearchBarWrapper>
      <Separator />
      <RegisterStorage
        open={open}
        handleClose={handleClose}
        adress={originRef?.current?.value}
      />
      <img src={require("../../images/logo.jpeg")} alt="armazem-logo" />
      {storages && (
        <CollapsibleTable setCenter={setCenter} storages={storages} />
      )}
    </div>
  );
};

export default GoogleMapss;
