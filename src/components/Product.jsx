import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button} from "@mui/material"

function Products(){

    const [products, setProducts] = useState([]);
    const [orderItems,setOrderItems]= useState([]);

    
    useEffect(() => {
        getProducts();
    },[]);


    
    const getProducts = async () => {
        const result = await axios.get(`http://localhost:4250/api/proizvod`);
        const data = await result.data;
       
      // console.log(data)
        setProducts(data)
       
    };

    function addOrderItem(id) {
        setOrderItems(prevState => [...prevState, id]);
        console.log(orderItems)
      }

      function confirmOrder(){
        const keyedArr = orderItems.reduce((accumulator, currentValue) => {
            const key = currentValue.toString();
            if (!(key in accumulator))
              accumulator[key] = 1;
            else
              accumulator[key] += 1;
              
            return accumulator;
          }, {});
          console.log(keyedArr)
      }

    return (<div>
        <h2>Proizvodi</h2>
        <TableContainer component="Paper">
       <Table aria-label='tbl'>
           <TableHead>
           <TableCell>Proizvod</TableCell>
           <TableCell>Cena</TableCell>
           <TableCell>Dostupan</TableCell>
          
           </TableHead>
           <TableBody>
               {products?.map((product)=>(
                   <TableRow key={product.proizvodId}>
                       <TableCell>{product.kategorijaNaziv}</TableCell>
                       <TableCell>{product.cena}</TableCell>
                       <TableCell>{product.dostupan? 'Da' : 'Ne'}</TableCell>
                      <TableCell> <Button variant="contained" onClick={() => {addOrderItem(product.proizvodId)}}>Dodaj</Button></TableCell>
                      
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>
        <br/>
        <Button variant="contained" onClick={() => {confirmOrder()}}>Potvrdi porudzbinu</Button>
            
            
        </div>)
        
}

export default Products