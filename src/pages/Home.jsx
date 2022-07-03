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
            <User />
            <Category />
            <Location />
            
        </div>
    )
}

export default Home