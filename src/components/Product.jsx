import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button} from "@mui/material"


function Products(){

    const [products, setProducts] = useState([]);
    const [orderItems,setOrderItems]= useState([]);
    const [itemsCounted,setItemsCounted]= useState([]);
   const [isAdmin,setIsAdmin]= useState(true);

    var randomString = require("random-string");

    
    useEffect(() => {
        getProducts();
    },[]);


    
    const getProducts = async () => {
        const result = await axios.get(`http://localhost:4250/api/proizvod`);
        const data = await result.data;
       
      // console.log(data)
        setProducts(data)
       
    };

    function addOrder(){
      var orderId = randomString({
        length: 8,
        numeric: true,
        letters: false,
        special: false,
        
        });

        const keyedArr = orderItems.reduce((accumulator, currentValue) => {
          const key = currentValue.toString();
          if (!(key in accumulator))
            accumulator[key] = 1;
          else
            accumulator[key] += 1;
            
          return accumulator;
        }, {});
        console.log(keyedArr)
        setItemsCounted(keyedArr);

        postOrder(orderId);
        

  Object.entries(keyedArr).map(([key, value]) => (
        
        postOrderItem(key,value,orderId)
      )); 
      
    }

    function addOrderItem(id) {
     
        setOrderItems(prevState => [...prevState, id]);
        console.log(orderItems)
      }

      function postOrderItem(id,count,orderId) {
        var orderItemId = randomString({
          length: 8,
          numeric: true,
          letters: false,
          special: false,
          
          });
        const item = { stavkaPorudzbineId: orderItemId,proizvodId:id,porudzbinaId:orderId,kolicina:count };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
      };

console.log(JSON.stringify(item));

      fetch('http://localhost:4250/api/stavkaPorudzbine', requestOptions)
          .then(response => console.log(response))
      }

       function postOrder(id) {
        var todayDate = new Date().toISOString().slice(0, 10);
        const order = { porudzbinaId: id,datum:todayDate,distributerId:4,Isplacena:false };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order)
        }

        console.log(JSON.stringify(order))
        
      fetch('http://localhost:4250/api/porudzbina', requestOptions)
      .then(response => console.log(response))
      };

      

    return (<div>
        <h2>Proizvodi</h2>
        <TableContainer component="Paper">
       <Table aria-label='tbl'>
           <TableHead>
           <TableCell>Proizvod</TableCell>
           <TableCell>Cena</TableCell>
           <TableCell>Dostupan</TableCell>
          

          {isAdmin? <Button variant="contained">Novi proizvod</Button> : null}
           </TableHead>
           <TableBody>
               {products?.map((product)=>(
                   <TableRow key={product.proizvodId}>
                       <TableCell>{product.kategorijaNaziv}</TableCell>
                       <TableCell>{product.cena}</TableCell>
                       <TableCell>{product.dostupan? 'Da' : 'Ne'}</TableCell>
                      <TableCell> {isAdmin? null:<Button variant="contained" onClick={() => {addOrderItem(product.proizvodId)}}>Dodaj</Button>}
                     {isAdmin? <Button variant="contained">Obrisi</Button>:null}
                     {isAdmin? <Button variant="contained">Izmeni</Button>:null}</TableCell>
                      
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>
        <br/>
      {isAdmin?null:<Button variant="contained" onClick={() => {addOrder()}}>Potvrdi porudzbinu</Button>}  
            
            
        </div>)
        
}

export default Products