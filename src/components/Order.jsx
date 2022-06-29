import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button, breadcrumbsClasses} from "@mui/material"
import ProductDialog from './ProductDialog';
import AlertDialog from './AlertDialog';
import ProductUpdateDialog from './ProductUpdateDialog';
import StripeCheckout from 'react-stripe-checkout'
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";


function Orders(){

    const [orders, setOrders] = useState([]);
    const [orderItems,setOrderItems]= useState([]);
    const [orderId,setOrderId]= useState(0);
    const [itemsCounted,setItemsCounted]= useState([]);
   const [isAdmin,setIsAdmin]= useState(true);
 
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
        getOrders();
    },[]);

   



    
    const getOrders = async () => {
        const result = await axios.get(`http://localhost:4250/api/porudzbina`, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
            if (error.response && error.response.status === 403) {
              AuthService.logout();
              navigate("/login");
              window.location.reload();
            }
          });;
        const data = await result.data;
       
      // console.log(data)
        setOrders(data)
       
    };

    
    const getOrderItems = async () => {
        const result = await axios.get(`http://localhost:4250/api/stavkaPorudzbine/stavkeByPorudzbinaId/${orderId}`, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
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
               {orders?.map((order)=>(
                   <TableRow key={order.porudzbinaId}>
                       <TableCell>{order.datum}</TableCell>
                       <TableCell>{order.distributer.nazivDistributera}</TableCell>
                       <TableCell>{order.iznos}</TableCell>
                       <TableCell>{order.isplacena? 'Da' : 'Ne'}</TableCell>
                       <Button variant="contained" onClick={() => loadOrderItems(order.porudzbinaId)}>Prikazi stavke</Button>
                  {order.isplacena? null:<StripeCheckout stripeKey="pk_test_51LEHoBFYog7W2g6eQwYMObxVNQEGmkFic6yIPG5mF0nVida85a1Rd24lumFnPJ3PqEm4BV0Y8CY8V7f6xTPmU5or00B8as1mhg" token={(token) => {     
     handleToken(token, order.iznos, order.porudzbinaId);
   }} amount={order.iznos * 100} /> }  
              
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>

       

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

                     
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>} 
      
            
        <br/>
      
            
            
        </div>)
        
}

export default Orders