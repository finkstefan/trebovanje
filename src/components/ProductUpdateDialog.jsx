import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from "@material-ui/core/Checkbox";
import { useEffect, useState, useRef } from "react";

export default function ProductUpdateDialog({cenaPr,idPr,nazivPr, dostupnost}) {
  const [open, setOpen] = React.useState(false);
  const [productName, setProductName] = React.useState(nazivPr);
  const [productPrice, setProductPrice] = React.useState(cenaPr);
 // const [productAvailable, setProductAvailable] = React.useState(true);

  var randomString = require("random-string");

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

    console.log(idPr);
  };

  const [name, setName] = useState(nazivPr);
  const [price, setPrice] = useState(cenaPr);
  const [available, setAvailable] = useState(dostupnost);

  const handleNameChange = event => {
    setName(event.target.value);

    console.log('value is:', event.target.value);
  };

  const handlePriceChange = event => {
    setPrice(event.target.value);

    console.log('value is:', event.target.value);
  };

  const handleAvailableChange = event => {
    setAvailable(event.target.value);

    console.log('value is:', event.target.value);
  };

  function postProduct() {
    var productId = randomString({
      length: 8,
      numeric: true,
      letters: false,
      special: false,
      
      });
  //  const item = { proizovdId: productId,kategorijaId:,kolicina:count };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
     // body: JSON.stringify(item)
  };
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Izmeni
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Izmeni proizvod:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Naziv proizvoda"
            value={name}
            type="text"
            onChange={handleNameChange}
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="price"
            value={price}
            onChange={handlePriceChange}
            label="Cena"
            type="text"
            fullWidth
            variant="standard"
          />
          Dostupan:
           <Checkbox
           color="default"
  available={available}
  onChange={handleAvailableChange}
  inputProps={{ 'aria-label': 'controlled' }}
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