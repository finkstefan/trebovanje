import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button, breadcrumbsClasses} from "@mui/material"
import CategoryDialog from './CategoryDialog';
import AlertDialog from './AlertDialog';
import CategoryUpdateDialog from './CategoryUpdateDialog';
import StripeCheckout from 'react-stripe-checkout'
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";


function Categories(){

    const [categories, setCategories] = useState([]);

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
     
      getCategories();

  },[]);



    
    const getCategories = async () => {
      

      const result = await axios.get(`http://localhost:4250/api/kategorija `, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
    const data = await result.data;
     
setCategories(data)
       
    };

    
  


    return (<div>
        <h2>Kategorije</h2>
       
        <TableContainer component="Paper">
       <Table aria-label='tbl'>
           <TableHead>
           <TableCell>Naziv</TableCell>
       

           <CategoryDialog
      open={open}
      onClose={handleClose}
      />
        
           </TableHead>
           <TableBody>
               {categories?.map((cat)=>(
                   <TableRow key={cat.kategorijaId}>
                       <TableCell>{cat.nazivKategorije}</TableCell>
                      
                      
                       <CategoryUpdateDialog
      open={open}
      onClose={handleClose}
      kategorijaId = {cat.kategorijaId}
     nazivKategorije={cat.nazivKategorije}
      />

<AlertDialog
      open={open}
      onClose={handleClose}
      table = "2"
     id={cat.kategorijaId}
      />
              
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>

       

        
      
            
        <br/>
      
            
            
        </div>)
        
}

export default Categories