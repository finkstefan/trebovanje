import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button, breadcrumbsClasses} from "@mui/material"
import ProductDialog from './ProductDialog';
import AlertDialog from './AlertDialog';
import ProductUpdateDialog from './ProductUpdateDialog';
import StripeCheckout from 'react-stripe-checkout'
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination"

function Orders(){

    const [orders, setOrders] = useState([]);
    const [orderItems,setOrderItems]= useState([]);
    const [ordersPerPage, setOrdersPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderId,setOrderId]= useState(0);
    const [itemsCounted,setItemsCounted]= useState([]);
   const [isAdmin,setIsAdmin]= useState(Boolean);

   const [userEmail,setUserEmail]= useState("");
 
   const token = JSON.parse(localStorage.getItem("token"));

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

    var randomString = require("random-string");
    const navigate = useNavigate();

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

    const [open, setOpen] = React.useState(false);

    const indexOfLastOrder=currentPage*ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder-ordersPerPage;
 
    const currentOrders = orders.slice(indexOfFirstOrder,indexOfLastOrder);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handlePayment = () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
       
      }

      
    fetch('http://localhost:4250/api/porudzbina/stripePayment', requestOptions)
    .then(response => console.log(response)).catch(function (error) {
      if (error.response && error.response.status === 403) {
        AuthService.logout();
        navigate("/login");
        window.location.reload();
      }
    });
    };

    function loadOrderItems(id) {
    setOrderId(id);
  //  console.log(id)
   // console.log(orderId)
        getOrderItems();
      }


    useEffect(() => {
      var role=localStorage.getItem('userRole');
      var email=localStorage.getItem('userEmail');
      
      if(role=="Admin"){
        getOrders(true);
      }else{
       
        console.log(localStorage.getItem('userEmail'))
        getOrders(false);
      }
      

  },[]);



    
    const getOrders = async (admin) => {
      if(admin){
        console.log("uso 1" + userEmail)
        const result = await axios.get(`http://localhost:4250/api/porudzbina`, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
      const data = await result.data;
     
    // console.log(data)
      setOrders(data)
      }else{
        const result = await axios.get(`http://localhost:4250/api/porudzbina/byDistributer/`+localStorage.getItem('userEmail'), { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
      const data = await result.data;
     
    // console.log(data)
      setOrders(data)
      }
       
       
    };

    
    const getOrderItems = async (orId) => {
        const result = await axios.get(`http://localhost:4250/api/stavkaPorudzbine/stavkeByPorudzbinaId/${orId}`, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
            if (error.response && error.response.status === 403) {
              AuthService.logout();
              navigate("/login");
              window.location.reload();
            }
          });
        const data = await result.data;
        setOrderItems(Array.from(data))

       console.log(orderItems);

      // console.log(data)
     //  console.log(orderId)
        
       
    };

  async function handleToken(token,amount,id){

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({amount:amount,id:id})
}

console.log(requestOptions.body)

fetch('http://localhost:4250/api/porudzbina/stripePayment', requestOptions)
.then(response => console.log(response)).catch(function (error) {
if (error.response && error.response.status === 403) {
  AuthService.logout();
  navigate("/login");
  window.location.reload();
}
});
    }


    return (<div>
        <h2>Porudzbine</h2>
        <TableContainer component="Paper">
       <Table aria-label='tbl'>
           <TableHead>
           <TableCell>Datum</TableCell>
           <TableCell>Distributer</TableCell>
           <TableCell>Iznos</TableCell>
           <TableCell>Isplacena</TableCell>
          

          {/*isAdmin? <Button variant="con
          tained" onClick={handleClickOpen}>Novi proizvod</Button> : null*/}
        
       
           </TableHead>
           <TableBody>
               {currentOrders?.map((order)=>(
                   <TableRow key={order.porudzbinaId}>
                       <TableCell>{order.datum}</TableCell>
                       <TableCell>{order.distributer.nazivDistributera}</TableCell>
                       <TableCell>{order.iznos}</TableCell>
                       <TableCell>{order.isplacena? 'Da' : 'Ne'}</TableCell>
                       {isAdmin?  <AlertDialog
      open={open}
      onClose={handleClose}
      table = "4"
      id={order.porudzbinaId}
      />:null}
                       <Button onClick={() => getOrderItems(order.porudzbinaId)}>Prikazi stavke</Button>
                  {!order.isplacena && !isAdmin ? <StripeCheckout stripeKey="pk_test_51LEHoBFYog7W2g6eQwYMObxVNQEGmkFic6yIPG5mF0nVida85a1Rd24lumFnPJ3PqEm4BV0Y8CY8V7f6xTPmU5or00B8as1mhg" token={(token) => {     
     handleToken(token, order.iznos, order.porudzbinaId);
   }} amount={order.iznos * 100} />:null }  
                
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>

        <Pagination
        postsPerPage={ordersPerPage}
        totalPosts={orders.length}
        paginate={paginate}
      />

        <h3>Stavke izabrane porudzbine</h3>
        {orderItems==undefined  ? null:
   <TableContainer component="Paper">
       <Table aria-label='tbl'>
           <TableHead>
           <TableCell>Proizvod</TableCell>
           <TableCell>PorudzbinaId</TableCell>
           <TableCell>Kolicina</TableCell>
          

          {/*isAdmin? <Button variant="contained" onClick={handleClickOpen}>Novi proizvod</Button> : null*/}
        
       
           </TableHead>
           <TableBody>
               {
               orderItems?.map((orderItem)=>(
                   <TableRow key={orderItem.stavkaPorudzbineId}>
                       <TableCell>{orderItem.proizvod.naziv}</TableCell>
                       <TableCell>{orderItem.porudzbinaId}</TableCell>
                       <TableCell>{orderItem.kolicina}</TableCell>

                       <AlertDialog
      open={open}
      onClose={handleClose}
      table = "5"
      id={orderItem.stavkaPorudzbineId}
      />
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>} 
      
            
        <br/>
      
            
            
        </div>)
        
}

export default Orders