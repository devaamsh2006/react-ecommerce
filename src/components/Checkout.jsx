import React, { useEffect,useState } from 'react'
import { useContext } from 'react'
import { cartItems } from '../contexts/CartItems'
function Checkout() {
    let {cartitems,setcartitems}=useContext(cartItems);
    const [total,settotal]=useState(0);
    let [click,setclick]=useState(false)
    let [added,setadded]=useState(false);
    let [error,seterr]=useState(null)
    function clicked(){
        setclick(true);
    }
    useEffect(()=>{
        if(cartitems.length>0){
       let val= 0;
       for(let ele of cartitems){
        val+=ele.price;
       }
       settotal(val)
    }},[cartitems])
    useEffect(()=>{
        if(click && total!==0){
            for(let ele of cartitems){
            fetch(`http://localhost:3000/orders`,{method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(ele)
            })
            .then(res=>{
                if(res.status!==201){
                    console.log(res)
                }
            })
            .catch(err=>console.log(err))
        }
        setadded(true)
    }
    },[click])
    useEffect(()=>{
        if(added){
            for(let ele of cartitems){
                fetch(`http://localhost:3000/cart/${ele.id}`,{method:"DELETE"})
                .then(res=>res.json())
                .then(data=>console.log(data))
                .catch(err=>seterr(err))
        }
        if(error===null){
            setcartitems([]);
        }
    }},[added])
  return (
    <div className='w-2/4 h-full flex flex-col items-center p-5'>
    <div className='flex justify-center items-center m-6 group hover:scale-110 flex-col gap-5 w-full bg-slate-400 h-56 rounded-2xl'>
        <h1 className='font-bold italic m-2'>Checkout</h1>
        <h1 className='font-bold italic m-2'>Total price:{total}</h1>
        <button className='m-2 bg-white p-4 rounded-xl group-hover:bg-black group-hover:text-white' onClick={clicked}>Proceed to checkout</button>
    </div>
    {click && <p className=' m-4 font-semibold text-green-600 text-lg'>Order Successful.Check in orders in your Profile!!..</p>}
    </div>
  )
}

export default Checkout