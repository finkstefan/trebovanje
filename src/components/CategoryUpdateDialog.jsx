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

export default function CategoryUpdateDialog({kategorijaId,nazivKategorije}) {
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState(nazivKategorije);
  
 // const [productAvailable, setProductAvailable] = React.useState(true);

 useEffect(() => {
     
  console.log(nazivKategorije)

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
   
   putCategory();
  };

  const [name, setName] = useState(nazivKategorije);
  

  const handleNameChange = event => {
    setName(event.target.value);

  };

  

  function putCategory() {
  
    const cat = { kategorijaId:kategorijaId,nazivKategorije:name };

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cat)
  };
  fetch('http://localhost:4250/api/kategorija', requestOptions)
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
        <DialogTitle>Izmeni kategoriju:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Naziv kategorije"
            value={name}
            type="text"
            onChange={handleNameChange}
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