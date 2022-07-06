import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState, useRef } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function AddOrderItemDialog({prodId,ordId}) {
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [productId, setProductId] = React.useState(prodId);
  const [orderId, setOrderId] = React.useState(ordId);
  const [amount, setAmount] = useState(0);
 


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

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleConfirm = () => {
    
    postOrderItem(amount)

  };





  const handleAmountChange = event => {
    setAmount(event.target.value);

   // console.log('value is:', event.target.value);
  };

 

  function postOrderItem(amount) {
    var itemId = randomString({
      length: 8,
      numeric: true,
      letters: false,
      special: false,
      
      });
  //  const item = { proizovdId: productId,kategorijaId:,kolicina:count };

  const item = { stavkaPorudzbineId: itemId,proizvodId:prodId,porudzbinaId:ordId,kolicina:amount };
console.log(item)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
    body: JSON.stringify(item)
};



fetch('http://localhost:4250/api/stavkaPorudzbine', requestOptions)
    .then((response) =>{
      if(response.ok)
      {

      }
      else{
        throw new Error(response);
      }}).catch(function (response) {
      if (response.status === 403) {
        AuthService.logout();
        navigate("/login");
        window.location.reload();
      }else{
        setOpenSnack(true);
     
      }
      
        
      
    });
    
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
       Dodaj
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Stavka porudzbine:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
       
            label="Kolicina"
            type="text"
            onChange={handleAmountChange}
            fullWidth
            variant="standard"
          />
          
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
          <Button onClick={handleConfirm}>Dodaj</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
  open={openSnack}
  autoHideDuration={1000}
  onClose={handleCloseSnack }
  message="Greska"
 
/>
    </div>
  );
  }
