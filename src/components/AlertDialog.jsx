import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'

export default function AlertDialog({value}) {
  const [open, setOpen] = React.useState(false);
  const [ok, setOk] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleOk = () => {
    setOk(true);

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
     //   body: JSON.stringify(order)
      }

    
    fetch(`http://localhost:4250/api/proizvod/${value}`, requestOptions)
    .then(response => console.log(response))
    
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Obrisi
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Brisanje"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Da li ste sigurni?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ne</Button>
          <Button onClick={handleOk} autoFocus>
            Da
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}