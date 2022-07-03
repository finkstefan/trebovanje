import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button, breadcrumbsClasses} from "@mui/material"
import ProductDialog from './ProductDialog';
import AlertDialog from './AlertDialog';
import ProductUpdateDialog from './ProductUpdateDialog';
import StripeCheckout from 'react-stripe-checkout'
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";


function Users(){

    const [distributers, setDistributers] = useState([]);
    const [admins, setAdmins] = useState([]);
   const [isAdmin,setIsAdmin]= useState(Boolean);

   const [userEmail,setUserEmail]= useState("");
 
   const token = JSON.parse(localStorage.getItem("token"));

    var randomString = require("random-string");
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);



    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    


    useEffect(() => {
     
      getUsers();

  },[]);



    
    const getUsers = async () => {
      
        const resultDistrib = await axios.get(`http://localhost:4250/api/korisnik/distributers`, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
      const distributers = await resultDistrib.data;

      const resultAdmin = await axios.get(`http://localhost:4250/api/korisnik/admins`, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
    const admins = await resultAdmin.data;
     
    // console.log(data)
      setDistributers(distributers)
   
  // console.log(data)
    setAdmins(admins)
       
    };

    
  


    return (<div>
        <h2>Korisnici</h2>
        <h4>Administratori:</h4>
        <TableContainer component="Paper">
       <Table aria-label='tbl'>
           <TableHead>
           <TableCell>Ime</TableCell>
           <TableCell>Prezime</TableCell>
           
          

          {/*isAdmin? <Button variant="con
          tained" onClick={handleClickOpen}>Novi proizvod</Button> : null*/}
        
       
           </TableHead>
           <TableBody>
               {admins?.map((admin)=>(
                   <TableRow key={admin.korisnikId}>
                       <TableCell>{admin.ime}</TableCell>
                       <TableCell>{admin.prezime}</TableCell>
                      
                     
              
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>

        <h4>Distributeri:</h4>
        <TableContainer component="Paper">
       <Table aria-label='tbl'>
           <TableHead>
           <TableCell>Naziv</TableCell>
           <TableCell>PIB</TableCell>
           
          

          {/*isAdmin? <Button variant="con
          tained" onClick={handleClickOpen}>Novi proizvod</Button> : null*/}
        
       
           </TableHead>
           <TableBody>
               {distributers?.map((dist)=>(
                   <TableRow key={dist.korisnikId}>
                       <TableCell>{dist.nazivDistributera}</TableCell>
                       <TableCell>{dist.pib}</TableCell>
                      
                     
              
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>

        
      
            
        <br/>
      
            
            
        </div>)
        
}

export default Users