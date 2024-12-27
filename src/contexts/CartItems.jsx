import React, { Children } from 'react'
import { useEffect,useContext,useState,createContext } from 'react'
import { userValid } from './User'
import { WishItemsList } from './Wishitems';
export const cartItems=createContext();
function CartItems({children}) {
    const {usernow}=useContext(userValid)
      let {wishitems}=useContext(WishItemsList)
    const [cartitems,setcartitems]=useState([]);
    useEffect(()=>{
        fetch(`http://localhost:3000/cart?userId=${usernow.id}`)
        .then(res=>res.json())
        .then(items=>{
            setcartitems(items)
        })
        .catch(err=>console.log(err))
    },[usernow,wishitems,cartitems])
  return (
    <cartItems.Provider value={{cartitems,setcartitems}}>
        {children}
    </cartItems.Provider>
  )
}

export default CartItems