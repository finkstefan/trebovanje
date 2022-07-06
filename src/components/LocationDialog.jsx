import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState, useRef } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function LocationDialog() {
  const [open, setOpen] = React.useState(false);
  const [country, setCountry] = React.useState('');
  const [city, setCity] = React.useState('');
  const [address, setAddress] = React.useState('');


  var randomString = require("random-string");
  const token = JSON.parse(localStorage.getItem("token"));
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
    
    postLocation(country,city,address)

  };

  /*const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');*/



  const handleCountryChange = event => {
    setCountry(event.target.value);

   // console.log('value is:', event.target.value);
  };
  const handleCityChange = event => {
    setCity(event.target.value);

   // console.log('value is:', event.target.value);
  };
  const handleAddressChange = event => {
    setAddress(event.target.value);

   // console.log('value is:', event.target.value);
  };

 

  function postLocation(country,city,address) {
    var locId = randomString({
      length: 8,
      numeric: true,
      letters: false,
      special: false,
      
      });
  //  const item = { proizovdId: productId,kategorijaId:,kolicina:count };

  const loc = { lokacijaId: locId,drzava:country,grad:city,adresa:address };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
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
        Nova lokacija
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova lokacija:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="country"
       
            label="Drzava"
            type="text"
            onChange={handleCountryChange}
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            margin="dense"
            id="city"
       
            label="Grad"
            type="text"
            onChange={handleCityChange}
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            margin="dense"
            id="address"
       
            label="Adresa"
            type="text"
            onChange={handleAddressChange}
            fullWidth
            variant="standard"
          />
          
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
          <Button onClick={handleConfirm} disabled={!country || !city || !address}>Dodaj</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
