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

export default function AdminUpdateDialog({uId,usern,em,passw,ph,adm,firstN,lastN}) {
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(uId);
  const [username, setUsername] = React.useState(usern);
  const [email, setEmail] = React.useState(em);
  const [password, setPassword] = React.useState(passw);
  const [phone, setPhone] = React.useState(ph);
  const [isAdmin, setAdmin] = React.useState(true);
  const [firstName, setFirstName] = React.useState(firstN);
  const [lastName, setLastName] = React.useState(lastN);
 

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
    
    putAdmin(username,email,password,phone,isAdmin,firstName,lastName)

  };

 // const [name, setName] = useState('');

 const [usernameValue, setUsernameValue] = useState(username);
 const [emailValue, setEmailValue] = useState(email);
 const [passwordValue, setPasswordValue] = useState(password);
 const [phoneValue, setPhoneValue] = useState(phone);
 const [adminValue, setAdminValue] = useState(adm);
 const [fistNameValue, setFNameValue] = useState(firstN);
 const [lastNameValue, setLNameValue] = useState(lastN);
 


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
  const handleFirstNameChange = event => {
    setFirstName(event.target.value);

   // console.log('value is:', event.target.value);
  };
  const handleLastNameChange = event => {
    setLastName(event.target.value);

   // console.log('value is:', event.target.value);
  };
 

 

  function putAdmin() {
   


  const user = { korisnikId: userId,korisnickoIme:username,email:email,lozinka:password,brojTelefona:phone,admin:isAdmin };

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

    const admin = { korisnikId:userId, ime:firstName,prezime:lastName };

    const requestOptionsD = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
      body: JSON.stringify(admin)
  };
  
  
  
  fetch('http://localhost:4250/api/korisnik/admin', requestOptionsD)
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
        <DialogTitle>Azuriranje admina:</DialogTitle>
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
            id="firstName"
            value={firstName}
            label="Ime"
            type="text"
            onChange={handleFirstNameChange}
            fullWidth
            variant="standard"
          />
<TextField
            autoFocus
            margin="dense"
            id="lastName"
            value={lastName}
            label="Prezime"
            type="text"
            onChange={handleLastNameChange}
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
