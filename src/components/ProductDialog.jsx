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
import Select from "react-dropdown-select";
import axios from 'axios'

export default function ProductDialog() {
  const [open, setOpen] = React.useState(false);
  const [productName, setProductName] = React.useState('');
    const [category, setCategory] = React.useState();
  const [productPrice, setProductPrice] = React.useState(0);
  const [availableAmount, setAvailableAmount] = React.useState(0);
  const [productAvailable, setProductAvailable] = React.useState(true);
  const [categories, setCategories] = React.useState([]);
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

 
  const token = JSON.parse(localStorage.getItem("token"));

  const handleConfirm = () => {
    postProduct(productName,category,productPrice,availableAmount)
  };
  useEffect(() => {
       
    const getCategories = async () => {
      const result = await axios.get(`http://localhost:4250/api/kategorija`, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
      const data = await result.data;
     
      setCategories(data)
     
      
  };
      getCategories();
     
     
    }, []);


  const handleProductNameChange = event => {
    setProductName(event.target.value);

   // console.log('value is:', event.target.value);
  };

  const handleProductPriceChange = event => {
    setProductPrice(event.target.value);

   // console.log('value is:', event.target.value);
  };

  const handleProductCategoryChange = event => {
    setCategory(event.target.value);

   // console.log('value is:', event.target.value);
  };

  const handleProductAvailableAmountChange = event => {
    setAvailableAmount(event.target.value);

   // console.log('value is:', event.target.value);
  };

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(false);

  const handleNameChange = event => {
    setName(event.target.value);

    console.log('value is:', event.target.value);
  };

  const handlePriceChange = event => {
    setPrice(event.target.value);

    console.log('value is:', event.target.value);
  };


  function handleCategoryChange(e){
    setCategory(e.target.value);
  }

  function postProduct(prodName,prodCategory,prodPrice,prodAvailableAmount) {
    var productId = randomString({
      length: 8,
      numeric: true,
      letters: false,
      special: false,
      
      });



    const pr = { proizvodId: productId,naziv:prodName,kategorijaId:prodCategory,cena:prodPrice,dostupan:true,dostupnaKolicina:prodAvailableAmount,adminId:1 };

    console.log(pr)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pr)
  };
  fetch('http://localhost:4250/api/proizvod', requestOptions)
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
        Novi proizvod
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novi proizvod:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
       
            label="Naziv proizvoda"
            type="text"
            onChange={handleProductNameChange}
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="price"
            onChange={handleProductPriceChange}
            label="Cena"
            type="text"
            fullWidth
            variant="standard"
          />
          <label>Kategorija</label><br></br>
          <select id = "dropdown" value={category} 
        onChange={handleCategoryChange} >
          {categories.map((category) => (
          <option key={category.kategorijaId} value={category.kategorijaId} onClick={() =>handleCategoryChange(category.kategorijaId)}>{category.nazivKategorije}</option>
        ))}
</select>
          

<TextField
            autoFocus
            margin="dense"
            id="dostupnaKol"
            onChange={handleProductAvailableAmountChange}
            label="Dostupna kolicina"
            type="text"
            fullWidth
            variant="standard"
          />
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
          <Button onClick={handleConfirm} disabled={!productName || !category || !productPrice || !availableAmount}>Dodaj</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
