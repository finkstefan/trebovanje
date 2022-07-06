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
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function ProductUpdateDialog({idPr,nazivPr,kategorijaId,cenaPr,dostupanPr,dostupnaKolPr,adminIdPr}) {
  const [open, setOpen] = React.useState(false);
  const [productName, setProductName] = React.useState(nazivPr);
  const [category, setCategory] = React.useState(kategorijaId);
const [productPrice, setProductPrice] = React.useState(cenaPr);
const [availableAmount, setAvailableAmount] = React.useState(dostupnaKolPr);
const [productAvailable, setProductAvailable] = React.useState(dostupanPr);
const [adminId, setAdminId] = React.useState(adminIdPr);
const [categories, setCategories] = React.useState([]);

  var randomString = require("random-string");

  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));

 // const name = useRef();
  
  //const price = useRef();
  
 // const available = useRef();

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
  putProduct(productName,category,productPrice,availableAmount,productAvailable,adminId)
  };

  /*const [name, setName] = useState(nazivPr);
  const [price, setPrice] = useState(cenaPr);
  const [available, setAvailable] = useState(dostupnost);*/

  const handleNameChange = event => {
    setProductName(event.target.value);

    console.log('value is:', event.target.value);
  };

  const handlePriceChange = event => {
    setProductPrice(event.target.value);

    console.log('value is:', event.target.value);
  };

 

  const handleAvailableAmountChange = event => {
    setAvailableAmount(event.target.value);

    console.log('value is:', event.target.value);
  };

  function handleCategoryChange(e){
    setCategory(e.target.value);
  }

  function putProduct() {
    

if(availableAmount===0){
  setProductAvailable(true);
}else{
  setProductAvailable(false);
}

    const pr = { proizvodId: idPr,kategorijaId:category,cena:productPrice,dostupnaKolicina:availableAmount,dostupan:productAvailable,adminId:1 };
console.log(pr)
    const requestOptions = {
      method: 'PUT',
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
            value={productName}
            type="text"
            onChange={handleNameChange}
            fullWidth
            variant="standard"
          />
          <select id = "dropdown" value={category} 
        onChange={handleCategoryChange} >
          {categories.map((category) => (
          <option key={category.kategorijaId} value={category.kategorijaId} onClick={() =>handleCategoryChange(category.kategorijaId)}>{category.nazivKategorije}</option>
        ))}
</select>
           <TextField
            autoFocus
            margin="dense"
            id="price"
            value={productPrice}
            onChange={handlePriceChange}
            label="Cena"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            value={availableAmount}
            onChange={handleAvailableAmountChange}
            label="Dostupna kolicina"
            type="text"
            fullWidth
            variant="standard"
          />
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
          <Button onClick={handleConfirm} disabled={!productName || !category || !productPrice || !availableAmount}>Potvrdi</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }