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

export default function DistributerUpdateDialog({uId,usern,em,passw,ph,adm,distribName,pibVal,isOnBlackList,locId}) {
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(uId);
  const [username, setUsername] = React.useState(usern);
  const [email, setEmail] = React.useState(em);
  const [password, setPassword] = React.useState(passw);
  const [phone, setPhone] = React.useState(ph);
  const [admin, setAdmin] = React.useState(adm);
  const [dName, setdName] = React.useState(distribName);
  const [pib, setPib] = React.useState(pibVal);
  const [onBlackList, setOnBlackList] = React.useState(isOnBlackList);
  const [locationId, setLocationId] = React.useState(locId);

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
    
    putDistributer(username,email,password,phone,admin,dName,pib,locationId)

  };

 // const [name, setName] = useState('');

 const [usernameValue, setUsernameValue] = useState(username);
 const [emailValue, setEmailValue] = useState(email);
 const [passwordValue, setPasswordValue] = useState(password);
 const [phoneValue, setPhoneValue] = useState(phone);
 const [adminValue, setAdminValue] = useState(admin);
 const [dNameValue, setDNameValue] = useState(dName);
 const [pibValue, setPibValue] = useState(pib);
 const [onBlackListValue, setOnBlackListValue] = useState(onBlackList);
 const [locationIdValue, setLocationIdValue] = useState(locationId);


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

 

  function putDistributer() {
   


  const user = { korisnikId: userId,korisnickoIme:username,email:email,lozinka:password,brojTelefona:phone,admin:admin };

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
    body: JSON.stringify(user)
};



fetch('http://localhost:4250/api/korisnik', requestOptions)
    .then(response => console.log(response)).catch(function (error) {
      if (error.response && error.response.status === 403) {
        AuthService.logout();
        navigate("/login");
        window.location.reload();
      }
    });

    const distrib = { korisnikId:userId, nazivDistributera: dName,pib:pib,naCrnojListi:onBlackList,lokacijaId:locationId };

    const requestOptionsD = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
      body: JSON.stringify(distrib)
  };
  
  
  
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
        Izmeni
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Azuriranje distributera:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            value={username}
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
            value={email}
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
            value={password}
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
            value={phone}
            label="Telefon"
            type="text"
            onChange={handlePhoneChange}
            fullWidth
            variant="standard"
          />
  
 
<TextField
            autoFocus
            margin="dense"
            id="dName"
            value={dName}
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
            value={pib}
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
            value={locationId}
            label="Lokacija"
            type="text"
            onChange={handleLocationIdChange}
            fullWidth
            variant="standard"
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zatvori</Button>
          <Button onClick={handleConfirm} disabled={!username || !email || !password || !phone || !admin || !dName || !pib || !locationId}>Potvrdi</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
