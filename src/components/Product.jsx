import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper,Button,TextField,Menu,MenuItem,FormControl,FormControlLabel,Radio,FormLabel,RadioGroup} from "@mui/material"
import ProductDialog from './ProductDialog';
import AlertDialog from './AlertDialog';
import ProductUpdateDialog from './ProductUpdateDialog';
import GroupedButtons from './GroupedButtons';
import authHeader from '../services/auth-header';
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination"
import AddOrderItemDialog from './AddOrderItemDialog';

function Products(){

    const [products, setProducts] = useState([]);
    const [productsPerPage, setProductsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [orderItems,setOrderItems]= useState([]);
    const [itemsCounted,setItemsCounted]= useState([]);
   const [isAdmin,setIsAdmin]= useState();
   const [userEmail,setUserEmail]= useState("");
   const [orderCreated,setOrderCreated]= useState(false);
   const [refreshData,setRefreshData]= useState(false);

   const indexOfLastProd=currentPage*productsPerPage;
   const indexOfFirstProd = indexOfLastProd-productsPerPage;

   const currentProds = products.slice(indexOfFirstProd,indexOfLastProd);
 
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

    const handleLogOut = () => {
      logOut();
    };

    
    useEffect(() => {
        getProducts();
    },[]);

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

  useEffect(()=>{
    const getData = async ()=>{
      const result = await axios.get(`http://localhost:4250/api/proizvod`, { headers: {'Authorization': `Bearer ${token}` }})
      .catch(function (error) {
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
      const data = await result.data;
     
      setProducts(data)
    }
    if(refreshData){
       getData()
    }
    },[refreshData])

   
    const productsByCategory = async (category) => {
      setSelectedCategory(category);
      console.log(selectedCategory)
      const result = await axios.get(`http://localhost:4250/api/proizvod/byKategorija/`+category, { headers: {'Authorization': `Bearer ${token}` }})
      .catch(function (error) {
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
      const data = await result.data;
     
    // console.log(data)
      setProducts(data)
     
  };


    
    const getProducts = async () => {
        const result = await axios.get(`http://localhost:4250/api/proizvod`, { headers: {'Authorization': `Bearer ${token}` }})
        .catch(function (error) {
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
        const data = await result.data;
       
       console.log(data)
        setProducts(data)
       
    };

   /* function confirmOrder(){
    
      var todayDate = new Date().toISOString().slice(0, 10);

        const loc = { porudzbinaId:localStorage.getItem("orderId"),datum:todayDate,distributerEmail:localStorage.getItem("userEmail") };
    
        const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loc)
      };
      fetch('http://localhost:4250/api/lokacija', requestOptions)
        .then(response => console.log(response)).catch(function (error) {
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
        setOpen(false)
      
    }*/

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
          headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
          body: JSON.stringify(item)
      };

console.log(JSON.stringify(item));

      fetch('http://localhost:4250/api/stavkaPorudzbine', requestOptions)
          .then(response => console.log(response)).catch(function (error) {
            if (error.response && error.response.status === 403) {
              AuthService.logout();
              navigate("/login");
              window.location.reload();
            }
          });
      }

       function postOrder(id) {
        var todayDate = new Date().toISOString().slice(0, 10);
        const order = { porudzbinaId: id,datum:todayDate,distributerId:localStorage.getItem('userEmail'),Isplacena:false };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
          body: JSON.stringify(order)
        }

        console.log(JSON.stringify(order))
        
      fetch('http://localhost:4250/api/porudzbina', requestOptions)
      .then(response => console.log(response)).catch(function (error) {
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
      };

      function createOrder() {
        var orId = randomString({
          length: 8,
          numeric: true,
          letters: false,
          special: false,
          
          });

//localStorage.setItem("orderId",orId)

        var todayDate = new Date().toISOString().slice(0, 10);
        const order = { porudzbinaId: orId,datum:todayDate,distributerEmail:localStorage.getItem('userEmail'),Isplacena:false };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
          body: JSON.stringify(order)
        }

        console.log(JSON.stringify(order))
        
      fetch('http://localhost:4250/api/porudzbina', requestOptions)
      .then(response=>response.json()).then((json)=>{localStorage.setItem("orderId",json.porudzbinaId); setOrderCreated(true)}).catch(function (error) {
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      });
      };

      function endOrder(){
localStorage.removeItem("orderId");
setOrderCreated(false);
      }


  function logOut(){
    AuthService.logout();
    navigate("/login");
    window.location.reload();
      }

      const [q, setQ] = useState("");

      const search= async () =>{
        const result = await axios.get(`http://localhost:4250/api/proizvod/byNaziv/`+q, { headers: {'Authorization': `Bearer ${token}` }})
        .catch(function (error) {
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
        const data = await result.data;
       
      // console.log(data)
        setProducts(data)
      }

      const [menuOpen, setMenuOpen] = React.useState(false);
      const [anchorEl, setAnchorEl] = React.useState()
    
      const recordButtonPosition = (event) => {
          setAnchorEl(event.currentTarget);
          setMenuOpen(true);
         
      }
    
      let closeMenu = () => {
          setMenuOpen(false);
      }

      useEffect(() => {
       
      const getCategories = async () => {
        const result = await axios.get(`http://localhost:4250/api/kategorija`, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
            if (error.response && error.response.status === 403) {
              AuthService.logout();
              navigate("/login");
              window.location.reload();
            }
          });
        const data = await result.data;
       
        setCategories(data)
       
        
    };
        getCategories();
       
      }, []);

      const productsAsc = async () => {
        const result = await axios.get(`http://localhost:4250/api/proizvod/`, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
            if (error.response && error.response.status === 403) {
              AuthService.logout();
              navigate("/login");
              window.location.reload();
            }
          });
        const data = await result.data;
       
        setCategories(data)
       
        
    };

   

    const sort = async (ascdesc) => {
      //1 je asc,2 je desc
      console.log(q + " "+ typeof(q))
      console.log(selectedCategory + " "+ typeof(selectedCategory))
      if(q.length != 0 && selectedCategory.length!==0){
        console.log("uso q!=null && selectedCategory!=null")
        const result = await axios.get(`http://localhost:4250/api/proizvod/byNazivAndKategorijaSorted/`+ q +`/`+selectedCategory+`/`+ascdesc, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
        const data = await result.data;
        setProducts(data)
      }
      else if(q.length==0 && selectedCategory.length!==0){
        console.log("uso q==null && setSelectedCategory!=null")
        const result = await axios.get(`http://localhost:4250/api/proizvod/byNazivAndKategorijaSorted/null/`+selectedCategory+`/`+ascdesc, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
        const data = await result.data;
        setProducts(data)
      }
      else if(q.length != 0 && selectedCategory.length==0){
        console.log("uso q != null && setSelectedCategory==null")
        const result = await axios.get(`http://localhost:4250/api/proizvod/byNazivAndKategorijaSorted/`+ q +`/0/`+ascdesc, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
        const data = await result.data;
        setProducts(data)
      }else{
        console.log("uso odje")
        const result = await axios.get(`http://localhost:4250/api/proizvod/byNazivAndKategorijaSorted/null/0/`+ascdesc, { headers: {'Authorization': `Bearer ${token}` }}).catch(function (error) {
          if (error.response && error.response.status === 403) {
            AuthService.logout();
            navigate("/login");
            window.location.reload();
          }
        });
        const data = await result.data;
        setProducts(data)
      }

   
      
     
    
     
      
  };
      

const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
    return (<div>
      
      { localStorage.token != null? <Button variant="outlined" onClick={() => logOut()}>Odjava</Button>:null}
    { orderCreated ? <Button variant="outlined" onClick={() => endOrder()}>Zavrsi porudzbinu</Button>:null}  
      { !orderCreated && !isAdmin?<Button variant="outlined" onClick={() => createOrder()}>Napravi/nastavi porudzbinu</Button>:null}
       <h2>Proizvodi</h2>
        <TextField id="standard-basic" label="Naziv" variant="standard" onChange={(e) => setQ(e.target.value)}/><Button variant="outlined"  onClick={search}>Pretrazi</Button>
        <React.Fragment>
          <Button onClick={recordButtonPosition}>
              Kategorija
          </Button>
          <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Sortiranje</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        name="radio-buttons-group"
      >
        <FormControlLabel value="asc" control={<Radio onChange={()=>sort(1)}/>} label="Cena rastuce" />
        <FormControlLabel value="desc" control={<Radio onChange={()=>sort(2)}/>} label="Cena opadajuce" />
      
      </RadioGroup>
    </FormControl>
          <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={closeMenu}>
        
               {categories.map((category) => (
          <MenuItem key={category.kategorijaId} value={category.kategorijaId} onClick={() => productsByCategory(category.kategorijaId)}>{category.nazivKategorije}</MenuItem>
        ))}
          </Menu>
      </React.Fragment>
        <TableContainer component="Paper">
       <Table aria-label='tbl'>
           <TableHead >
           <TableCell>Proizvod</TableCell>
           <TableCell>Kategorija</TableCell>
           <TableCell>Cena</TableCell>
           <TableCell>Dostupan</TableCell>
           <TableCell>Dostupna kolicina</TableCell>

          {isAdmin?  <ProductDialog
      open={open}
      onClose={handleClose}
      /> : null}
         
       
           </TableHead>
           <TableBody>
               {currentProds?.map((product)=>(
                   <TableRow key={product.proizvodId}>
                       <TableCell>{product.naziv}</TableCell>
                       <TableCell>{product.kategorija.nazivKategorije}</TableCell>
                       <TableCell>{product.cena}</TableCell>
                       <TableCell>{product.dostupan? 'Da' : 'Ne'}</TableCell>
                       <TableCell>{product.dostupnaKolicina}</TableCell>
                      <TableCell> {!isAdmin && orderCreated ? <AddOrderItemDialog  open={open}
      onClose={handleClose}
      prodId = {product.proizvodId}
      ordId = {localStorage.getItem("orderId")}
      handleParentFun={ () => setRefreshData(!refreshData)}
      />:null}
                   
                   
                     {isAdmin?  <AlertDialog
      open={open}
      onClose={handleClose}
      id = {product.proizvodId}
      table="1"
      />:null}
                     {isAdmin? <ProductUpdateDialog
      open={open}
      onClose={handleClose}
      cenaPr = {product.cena}
      idPr={product.proizvodId}
      nazivPr={product.naziv}
      kategorijaId={product.kategorijaId}
      dostupanPr={product.dostupan}
      dostupnaKolPr={product.dostupnaKolicina}
      adminIdPr={product.adminId}
      />:null}

      </TableCell>
                      
                   </TableRow>
               ))}
           </TableBody>
           
       </Table>
        </TableContainer>
        <Pagination
        postsPerPage={productsPerPage}
        totalPosts={products.length}
        paginate={paginate}
      />

        <br/>
      
            
            
        </div>)
        
}

export default Products