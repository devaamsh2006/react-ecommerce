import React from 'react'
import { useContext,useEffect,useState } from 'react'
import { userValid } from '../contexts/User'
import { WishItemsList } from '../contexts/Wishitems'
import Checkout from './Checkout'
import { cartItems } from '../contexts/CartItems'
function Cart() {
  let {usernow}=useContext(userValid)
  let {wishitems}=useContext(WishItemsList)
  const {cartitems}=useContext(cartItems);
  function handleclick(){
    setclick(true);
  }
  return (
    <div className='relative'>
      {cartitems.length>0 ? (
    <div className='flex'>
    <div className='flex justify-around p-4 flex-wrap border-r-2 h-full gap-4 w-3/4'>
      {
      (cartitems.map(element=>{
         return (
          <div onClick={()=>handleProduct(element)} key={element.id} className='p-3 cursor-pointer bg-slate-400 transition group hover:shadow-2xl hover:shadow-slate-800/80 hover:bg-slate-800 hover:text-white rounded-xl hover:-translate-y-3 w-3/4 grid gap-4 grid-cols-4 items-center justify-center' >
          <img src={element.images[0]} className='w-full col-span-1 rounded-tl-xl rounded-bl-xl' />
          <div className='col-span-2 flex items-center justify-center flex-col'>
          <p className='font-bold'>{element.title}</p>
          <p className='font-extrabold text-xl'>${element.price}</p>
          </div>
          <button className='m-3 col-span-1 bg-gray-700 text-white p-3 rounded-2xl group-hover:bg-white group-hover:text-slate-950'>Move to wishlist</button>
         </div>
        )
      }))
      }
    </div>
    <Checkout />
    </div>)
    :
    <p className='m-72 font-bold text-3xl '>No items to display</p>}
    </div>
  )
}

export default Cart