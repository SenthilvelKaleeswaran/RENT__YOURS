import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ProductsCard from './ProductsCard';
import { ProductsLoader } from '../Context/Context';

function Products() {

    const contextImporter = useContext(ProductsLoader)
    console.log("---products",contextImporter.products)
  
    // useEffect(()=>{
    //   setInterval(() => {


    //   }, 1000);
    //   })

    

    return (
      <div>
        {contextImporter.products.map((items,index)=>(
          items.productAvailability ? <ProductsCard items={items} index={index} /> : "" 
        ))}

      </div>
    )
}

export default Products