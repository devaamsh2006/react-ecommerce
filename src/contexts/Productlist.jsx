import React from 'react'
import { createContext,useState,useEffect } from 'react';
export const productList=createContext();
function Productlist({children}) {
    const [products,setProducts]=useState();
useEffect(()=>{
    fetch('https://api.escuelajs.co/api/v1/products')
    .then(res=>res.json())
    .then(product=>{
      setProducts(product)
    })
    .catch(err=>console.log(err))
  },[])
  return (
    <productList.Provider value={{products,setProducts}}>
        {children}
    </productList.Provider>
  )
}

export default Productlist