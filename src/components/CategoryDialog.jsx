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

export default function CategoryDialog() {
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState('');


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
    
    postCategory(name)

  };

  const [name, setName] = useState('');



  const handleNameChange = event => {
    setName(event.target.value);

   // console.log('value is:', event.target.value);
  };

 

  function postCategory(catName) {
    var categoryId = randomString({
      length: 8,
      numeric: true,
      letters: false,
      special: false,
      
      });
  //  const item = { proizovdId: productId,kategorijaId:,kolicina:count };

  const cat = { kategorijaId: categoryId,nazivKategorije:catName };
console.log(cat)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
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
        Nova kategorija
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova kategorija:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Naziv kategorije"
            type="text"
            onChange={handleNameChange}
            fullWidth
            variant="standard"
          />
          
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
          <Button onClick={handleConfirm} disabled={!name}>Dodaj</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
