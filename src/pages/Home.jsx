import Product from "../components/Product"
import Order from "../components/Order"
import User from "../components/User"
import Category from "../components/Category"
import Location from "../components/Location"
import React from "react"

function Home(){
    return(
        <div>
            <Product />
            <Order />
            {localStorage.getItem("userRole")=="Admin" ?
           <React.Fragment> <User />
           <Category />
           <Location /></React.Fragment>  :null}
          
            
        </div>
    )
}

export default Home