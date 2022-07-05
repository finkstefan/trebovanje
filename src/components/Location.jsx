import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button, breadcrumbsClasses} from "@mui/material"
import LocationDialog from './LocationDialog';
import LocationUpdateDialog from './LocationUpdateDialog';
import AlertDialog from './AlertDialog';
import ProductUpdateDialog from './ProductUpdateDialog';
import StripeCheckout from 'react-stripe-checkout'
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination"

function Locations(){

    const [locations, setLocations] = useState([]);
    const [locationsPerPage, setLocationsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);

   const [isAdmin,setIsAdmin]= useState(Boolean);

   const [userEmail,setUserEmail]= useState("");
 
   const token = JSON.parse(localStorage.getItem("token"));

    var randomString = require("random-string");
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const indexOfLastLocation=currentPage*locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation-locationsPerPage;
 
    const currentLocations = locations.slice(indexOfFirstLocation,indexOfLastLocation);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


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
   
         <LocationDialog
      open={open}
      onClose={handleClose}
      />
       
           </TableHead>
           <TableBody>
               {currentLocations?.map((loc)=>(
                   <TableRow key={loc.lokacijaId}>
                    <TableCell>{loc.drzava}</TableCell>
                       <TableCell>{loc.grad}</TableCell>
                       <TableCell>{loc.adresa}</TableCell>
                      
                       <LocationUpdateDialog
      open={open}
      onClose={handleClose}
      lokacijaId = {loc.lokacijaId}
     drzava={loc.drzava}
     grad={loc.grad}
     adresa={loc.adresa}
      />

<AlertDialog
      open={open}
      onClose={handleClose}
      table = "3"
     id={loc.lokacijaId}
      />
                     
              
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>

        <Pagination
        postsPerPage={locationsPerPage}
        totalPosts={locations.length}
        paginate={paginate}
      />

        
      
            
        <br/>
      
            
            
        </div>)
        
}

export default Locations