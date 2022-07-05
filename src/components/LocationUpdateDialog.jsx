import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from "@material-ui/core/Checkbox";
import AuthService from "../services/auth.service";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function LocationUpdateDialog({lokacijaId,drzava,grad,adresa}) {
  const [open, setOpen] = React.useState(false);
  const [country, setCountry] = React.useState(drzava);
  const [city, setCity] = React.useState(grad);
  const [address, setAddress] = React.useState(adresa);
  
 // const [productAvailable, setProductAvailable] = React.useState(true);

 useEffect(() => {
     
 // console.log(nazivKategorije)

},[]);

  var randomString = require("random-string");

  const navigate = useNavigate();

 // const name = useRef();
  
  //const price = useRef();
  
 // const available = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
  /*  setProductName(name)
   setProductPrice(price)
   setProductAvailable(available)*/

   // console.log(idPr);
   
   putLocation();
  };

  const [countryName, setCountryName] = useState(drzava);
    const [cityName, setCityName] = useState(grad);
    const [adress, setAdress] = useState(adresa);
  

  const handleCountryChange = event => {
    setCountry(event.target.value);

  };

   const handleCityChange = event => {
    setCity(event.target.value);

  };

   const handleAddressChange = event => {
    setAddress(event.target.value);

  };

  

  function putLocation() {
  
    const loc = { lokacijaId:lokacijaId,drzava:countryName,grad:cityName,adresa:adress };

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loc)
  };
  fetch('http://localhost:4250/api/lokacija', requestOptions)
    .then(response => console.log(response)).catch(function (error) {
      if (error.response && error.response.status === 403) {
        AuthService.logout();
        navigate("/login");
        window.location.reload();
      }
    });
    setOpen(false)
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Izmeni
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Izmeni lokaciju:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Drzava"
            value={countryName}
            type="text"
            onChange={handleCountryChange}
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Grad"
            value={cityName}
            type="text"
            onChange={handleCityChange}
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Adresa"
            value={countryName}
            type="text"
            onChange={handleAddressChange}
            fullWidth
            variant="standard"
          />
          
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
          <Button onClick={handleConfirm}>Potvrdi</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }