import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userValid } from '../contexts/User';
import { productList } from '../contexts/Productlist';
import { cartItems } from '../contexts/CartItems';
function Home() {
  const navigate=useNavigate();
  let {products}=useContext(productList);
  const {usernow,setUsernow}=useContext(userValid)
  let {cartitems,setcartitems}=useContext(cartItems)
  const [incart,setincart]=useState("Add to cart");
  function handleProduct(obj){
    navigate('product',{state:obj})
  }
  function handlecart(obj){
    obj={...obj,userId:usernow.id,id:String(obj.id)}
    fetch('http://localhost:3000/cart',{method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
    })
    .then(res=>{
      if(res.status!==201){
        console.log(res)
      }else{
        setincart("Added!")
        setcartitems([...cartitems,obj])
        setTimeout(()=>{
          setincart("Add to cart")
        },1000)
      }
    })
    .catch(err=>console.log(err))
  }
  return (
    <div className='bg-slate-300 p-4 flex flex-wrap w-full gap-5 justify-around items-center'>
      {products?
      (products.length===0? (
        <div className='w-full flex justify-center content-center h-full'>
    <svg
    className="animate-spin h-20 w-20 text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    >
  <circle
    className="opacity-25"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    strokeWidth="4"
  ></circle>
  <path
    className="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
  ></path>
</svg>
      </div>
) :(products.map(element=>{
         return (
          <div key={element.id} className='p-3 cursor-pointer bg-slate-400 transition group hover:shadow-2xl hover:shadow-slate-800/80 hover:bg-slate-800 hover:text-white rounded-xl hover:-translate-y-3 flex flex-col gap-3 overflow-hidden w-80 items-center' >
          <img src={element.images[0]} className='w-full' />
          <p className='font-bold'>{element.title}</p>
          <p className='font-medium'>${element.price}</p>
          <div>
          <button className='m-3 bg-gray-700 text-white p-3 rounded-2xl group-hover:bg-white group-hover:text-slate-950' onClick={()=>handleProduct(element)}>Get More Info</button>
          <button className='m-3 bg-gray-700 text-white p-3 rounded-2xl group-hover:bg-white group-hover:text-slate-950 group-hover:focus:bg-green-300'  onClick={()=>handlecart(element)}>Add to cart</button>
         </div>
         <div>
            
          </div>
         </div>
        )
      }))):
      <div className='w-full flex justify-center content-center h-full'>
    <svg
    className="animate-spin h-20 w-20 text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    >
  <circle
    className="opacity-25"
    cx="12"
    cy="12"
    r="10"
    stroke="currentColor"
    strokeWidth="4"
  ></circle>
  <path
    className="opacity-75"
    fill="currentColor"
    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
  ></path>
</svg>
      </div>}
    </div>
  )
}

export default Home