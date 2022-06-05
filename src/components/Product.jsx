import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button} from "@mui/material"

function Products(){

    const [products, setProducts] = useState([]);

    
    useEffect(() => {
        getProducts();
    },[]);

    
    const getProducts = async () => {
        const result = await axios.get(`http://localhost:4250/api/proizvod`);
        const data = await result.data;
       
        console.log(data)
        setProducts(data)
       
    };

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
                      <TableCell> <Button variant="contained">Dodaj</Button></TableCell>
                      
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>
            
            
        </div>)
        
}

export default Products