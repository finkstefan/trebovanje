import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button, breadcrumbsClasses} from "@mui/material"
import ProductDialog from './ProductDialog';
import AdminDialog from './AdminDialog';
import AdminUpdateDialog from './AdminUpdateDialog';
import DistributerDialog from './DistributerDialog';
import DistributerUpdateDialog from './DistributerUpdateDialog';
import AlertDialog from './AlertDialog';

import ProductUpdateDialog from './ProductUpdateDialog';
import StripeCheckout from 'react-stripe-checkout'
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination"

function Users(){

    const [distributers, setDistributers] = useState([]);
    const [admins, setAdmins] = useState([]);
   const [isAdmin,setIsAdmin]= useState(Boolean);
   const [adminsPerPage, setAdminsPerPage] = useState(3);
   const [currentPageAdmins, setCurrentPageAdmins] = useState(1);
   const [distribPerPage, setDistribPerPage] = useState(3);
   const [currentPageDistrib, setCurrentPageDistrib] = useState(1);

   const [userEmail,setUserEmail]= useState("");
 
   const token = JSON.parse(localStorage.getItem("token"));

    var randomString = require("random-string");
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const indexOfLastAdmin=currentPageAdmins*adminsPerPage;
    const indexOfFirstAdmin = indexOfLastAdmin-adminsPerPage;
 
    const currentAdmins= admins.slice(indexOfFirstAdmin,indexOfLastAdmin);

    const indexOfLastDistrib=currentPageDistrib*distribPerPage;
    const indexOfFirstDistrib = indexOfLastDistrib-distribPerPage;
 
    const currentDistribs= distributers.slice(indexOfFirstDistrib,indexOfLastDistrib);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      var role=localStorage.getItem('userRole');
      var email=localStorage.getItem('userEmail');
      
      if(role=="Admin"){
        setIsAdmin(true);
        console.log('admin je ')
      }else{
        setIsAdmin(false);
        setUserEmail(email);
      }


  },[]);

    const paginateAdmins = (pageNumber) => setCurrentPageAdmins(pageNumber);

    const paginateDistribs = (pageNumber) => setCurrentPageDistrib(pageNumber);


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
        <AdminDialog/>
       
           </TableHead>
           <TableBody>
               {currentAdmins?.map((admin)=>(
                   <TableRow key={admin.korisnikId}>
                       <TableCell>{admin.ime}</TableCell>
                       <TableCell>{admin.prezime}</TableCell>
                      
                     
              <AdminUpdateDialog 
              uId={admin.korisnikId}
              usern={admin.korisnik.korisnickoIme}
              em={admin.korisnik.email}
              passw={admin.korisnik.lozinka}
              ph={admin.korisnik.brojTelefona}
              adm={admin.korisnik.admin}
              firstN={admin.ime}
              lastN={admin.prezime}
              />
               {isAdmin?  <AlertDialog
      open={open}
      onClose={handleClose}
      table = "7"
      id={admin.korisnikId}
      />:null}
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>
        <Pagination
        postsPerPage={adminsPerPage}
        totalPosts={admins.length}
        paginate={paginateAdmins}
      />

        <h4>Distributeri:</h4>
        <TableContainer component="Paper">
       <Table aria-label='tbl'>
           <TableHead>
           <TableCell>Naziv</TableCell>
           <TableCell>PIB</TableCell>
           
          

          {/*isAdmin? <Button variant="con
          tained" onClick={handleClickOpen}>Novi proizvod</Button> : null*/}
        
       <DistributerDialog/>
           </TableHead>
           <TableBody>
               {currentDistribs?.map((dist)=>(
                   <TableRow key={dist.korisnikId}>
                       <TableCell>{dist.nazivDistributera}</TableCell>
                       <TableCell>{dist.pib}</TableCell>
                      
                     <DistributerUpdateDialog  uId={dist.korisnikId}
              usern={dist.korisnik.korisnickoIme}
              em={dist.korisnik.email}
              passw={dist.korisnik.lozinka}
              ph={dist.korisnik.brojTelefona}
              adm={dist.korisnik.admin}
              distribName={dist.nazivDistributera}
              pibVal={dist.pib}
              isOnBlackList={dist.naCrnojListi}/>
              {isAdmin?  <AlertDialog
      open={open}
      onClose={handleClose}
      table = "7"
      id={dist.korisnikId}
      />:null}
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>
        <Pagination
        postsPerPage={distribPerPage}
        totalPosts={distributers.length}
        paginate={paginateDistribs}
      />
        
      
            
        <br/>
      
            
            
        </div>)
        
}

export default Users