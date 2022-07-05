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

export default function DistributerDialog() {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [admin, setAdmin] = React.useState();
  const [dName, setdName] = React.useState('');
  const [pib, setPib] = React.useState('');
  const [onBlackList, setOnBlackList] = React.useState();
  const [locationId, setLocationId] = React.useState(0);

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
    
    postDistributer(username,email,password,phone,admin,dName,pib,locationId)

  };

 // const [name, setName] = useState('');



  const handleUsernameChange = event => {
    setUsername(event.target.value);

   // console.log('value is:', event.target.value);
  };
  const handleEmailChange = event => {
    setEmail(event.target.value);

   // console.log('value is:', event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);

   // console.log('value is:', event.target.value);
  };
  const handlePhoneChange = event => {
    setPhone(event.target.value);

   // console.log('value is:', event.target.value);
  };
  const handleDNameChange = event => {
    setdName(event.target.value);

   // console.log('value is:', event.target.value);
  };
  const handlePibChange = event => {
    setPib(event.target.value);

   // console.log('value is:', event.target.value);
  };
  const handleLocationIdChange = event => {
    setLocationId(event.target.value);

   // console.log('value is:', event.target.value);
  };

  const handleAdminChange = event => {
    setAdmin(event.target.value);

   // console.log('value is:', event.target.value);
  };


const postDistributer = async(username,email,password,phone,admin,dName,pib,locationId) => {
    var userId = randomString({
      length: 8,
      numeric: true,
      letters: false,
      special: false,
      
      });
  //  const item = { proizovdId: productId,kategorijaId:,kolicina:count };

  const user = { korisnikId: userId,korisnickoIme:username,email:email,lozinka:password,brojTelefona:phone,admin:admin };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
    body: JSON.stringify(user)
};



    const distrib = { korisnikId:userId, nazivDistributera: dName,pib:pib,naCrnojListi:false,lokacijaId:locationId };

    const requestOptionsD = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
      body: JSON.stringify(distrib)
  };

      const response = await fetch('http://localhost:4250/api/korisnik', requestOptions)
      .then(response => console.log(response)).catch(function (error) {
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
    //  const data = response.json();
      //use the data...
      const anotherResponse = await   
      fetch('http://localhost:4250/api/korisnik/distributer', requestOptionsD)
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
        Novi distributer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novi distributer:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
       
            label="Korisnicko ime"
            type="text"
            onChange={handleUsernameChange}
            fullWidth
            variant="standard"
          />

<TextField
            autoFocus
            margin="dense"
            id="email"
       
            label="Email"
            type="text"
            onChange={handleEmailChange}
            fullWidth
            variant="standard"
          />

<TextField
            autoFocus
            margin="dense"
            id="password"
       
            label="Lozinka"
            type="text"
            onChange={handlePasswordChange}
            fullWidth
            variant="standard"
          />
          
          <TextField
            autoFocus
            margin="dense"
            id="phone"
       
            label="Telefon"
            type="text"
            onChange={handlePhoneChange}
            fullWidth
            variant="standard"
          />
  
  <TextField
            autoFocus
            margin="dense"
            id="admin"
       
            label="Admin"
            type="text"
            onChange={handleAdminChange}
            fullWidth
            variant="standard"
          />
<TextField
            autoFocus
            margin="dense"
            id="dName"
       
            label="Naziv distributera"
            type="text"
            onChange={handleDNameChange}
            fullWidth
            variant="standard"
          />

<TextField
            autoFocus
            margin="dense"
            id="pib"
       
            label="PIB"
            type="text"
            onChange={handlePibChange}
            fullWidth
            variant="standard"
          />
           
        

<TextField
            autoFocus
            margin="dense"
            id="locationId"
       
            label="Lokacija"
            type="text"
            onChange={handleLocationIdChange}
            fullWidth
            variant="standard"
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
          <Button onClick={handleConfirm}>Dodaj</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
