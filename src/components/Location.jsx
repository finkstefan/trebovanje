import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button, breadcrumbsClasses} from "@mui/material"
import ProductDialog from './ProductDialog';
import AlertDialog from './AlertDialog';
import ProductUpdateDialog from './ProductUpdateDialog';
import StripeCheckout from 'react-stripe-checkout'
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";


function Locations(){

    const [locations, setLocations] = useState([]);

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
     
      getLocations();

  },[]);



    
    const getLocations = async () => {
      

      const result = await axios.get(`http://localhost:4250/api/lokacija `, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
    const data = await result.data;
     
setLocations(data)
       
    };

    
  


    return (<div>
        <h2>Lokacije</h2>
       
        <TableContainer component="Paper">
       <Table aria-label='tbl'>
           <TableHead>
           <TableCell>Drzava</TableCell>
           <TableCell>Grad</TableCell>
           <TableCell>Adresa</TableCell>
       
           
          

          {/*isAdmin? <Button variant="con
          tained" onClick={handleClickOpen}>Novi proizvod</Button> : null*/}
        
       
           </TableHead>
           <TableBody>
               {locations?.map((loc)=>(
                   <TableRow key={loc.lokacijaId}>
                       <TableCell>{loc.grad}</TableCell>
                       <TableCell>{loc.drzava}</TableCell>
                       <TableCell>{loc.adresa}</TableCell>
                      
                      
                     
              
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>

       

        
      
            
        <br/>
      
            
            
        </div>)
        
}

export default Locations