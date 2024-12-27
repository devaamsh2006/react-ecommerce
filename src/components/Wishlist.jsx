import React, { useState } from 'react'
import { useContext,useEffect } from 'react'
import { WishItemsList } from '../contexts/Wishitems'
import { userValid } from '../contexts/User'
function Wishlist() {
  let {wishitems,setwishitems}=useContext(WishItemsList)
  let {usernow}=useContext(userValid)
  let [title,settitle]=useState(null);
  let [deleted,setdelete]=useState(false);
  function addtocart(item){
    let itemnow={...item,userId:usernow.id,id:String(item.id)}
    console.log(itemnow)
    fetch('http://localhost:3000/cart',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(itemnow)
    })
    .then(res=>{
      if(res.status!==201){
        console.log("error occured")
      }else{
        settitle(item.id);
      }
    })
    .catch(err=>console.log(err))
  }
  
  useEffect(()=>{
    if(deleted===false && title){
    fetch(`http://localhost:3000/wishlist/${title}`,{method:"DELETE"})
    .then(res => {
      return res.json()
    })
    .then(data => {
      setdelete(true);
    })
    .catch(err=>console.log("1 is the now",err))
    }},[title])

  useEffect(()=>{
    console.log("mouse")
    if(deleted!==false){
    fetch(`http://localhost:3000/wishlist?userId=${usernow.id}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      setwishitems(data);
      setdelete(false);
    })
    .catch(err=>console.log(err))
    }},[deleted])
  
  return (
    <div className='bg-slate-300 relative p-4 flex flex-wrap w-full gap-5 justify-around items-center'>
      {wishitems.length>0 ? wishitems.map(ele=>{
        return(
          <div key={ele.id} className='p-3 cursor-pointer bg-slate-400 transition group hover:shadow-2xl hover:shadow-slate-800/80 hover:bg-slate-800 hover:text-white rounded-xl hover:-translate-y-3 flex flex-col gap-3 overflow-hidden w-80 items-center' >
          <img src={ele.images[0]} className='w-full' />
          <p className='font-bold'>{ele.title}</p>
          <p className='font-medium'>${ele.price}</p>
          <p>{ele.quantity}</p>
          <button className='mt-3 bg-gray-700 text-white p-3 rounded-2xl group-hover:bg-white group-hover:text-slate-950 hover:shadow hover:shadow-slate-300'>Get More Info</button>
          <button onClick={()=>addtocart(ele)} className='bg-gray-700 text-white p-3 rounded-2xl group-hover:bg-yellow-300 group-hover:text-slate-950 hover:shadow hover:shadow-yellow-400'>Add to cart</button>
         </div>
        )
      }): <p className='absolute t-1/2 l-1/2 text-3xl font-bold '>No items to display.Go add something New!!</p>}
    </div>
  )
}

export default Wishlist