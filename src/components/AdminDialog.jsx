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

export default function AdminDialog() {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [admin, setAdmin] = React.useState(true);
  
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

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
    
    postAdmin(username,email,password,phone,admin,firstName,lastName)

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
  const handleFirstNameChange = event => {
    setFirstName(event.target.value);

   // console.log('value is:', event.target.value);
  };
  const handleLastNameChange = event => {
    setLastName(event.target.value);

   // console.log('value is:', event.target.value);
  };
  const handleAdminChange = event => {
    setAdmin(event.target.value);

   // console.log('value is:', event.target.value);
  };

 

  const postAdmin = async(username,email,password,phone,isAdmin,firstName,lastName) => {
    var userId = randomString({
      length: 8,
      numeric: true,
      letters: false,
      special: false,
      
      });
  //  const item = { proizovdId: productId,kategorijaId:,kolicina:count };

  const user = { korisnikId: userId,korisnickoIme:username,email:email,lozinka:password,brojTelefona:phone,admin:isAdmin };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
    body: JSON.stringify(user)
};

const admin = { korisnikId:userId, ime: firstName,prezime:lastName };

    const requestOptionsD = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
      body: JSON.stringify(admin)
  };

/*fetch('http://localhost:4250/api/korisnik', requestOptions)
    .then(response => console.log(response)).catch(function (error) {
      if (error.response && error.response.status === 403) {
        AuthService.logout();
        navigate("/login");
        window.location.reload();
      }
    });

    
  
  
  
  fetch('http://localhost:4250/api/korisnik/admin', requestOptionsD)
      .then(response => console.log(response)).catch(function (error) {
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });*/

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
      fetch('http://localhost:4250/api/korisnik/admin', requestOptionsD)
          .then(response => console.log(response)).catch(function (error) {
            if (error.response && error.response.status === 403) {
              AuthService.logout();
              navigate("/login");
              window.location.reload();
            }
          });
     // const anotherdata = anotherResponse.json();

    setOpen(false)
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Novi admin
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Novi admin:</DialogTitle>
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
            id="firstName"
       
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
       
            label="Prezime"
            type="text"
            onChange={handleLastNameChange}
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
