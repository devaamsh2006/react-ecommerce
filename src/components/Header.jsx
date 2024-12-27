import React from 'react'
import { Link } from 'react-router-dom'
import { FiAlignLeft } from "react-icons/fi";
import { useContext } from 'react';
import { userValid } from '../contexts/User';
function Header() {
  const {usernow}=useContext(userValid);
  return (
    <div className='flex justify-between p-3 items-center bg-slate-950 text-white box-border'>
    <FiAlignLeft className='cursor-pointer scale-150'/>
    <h1 className='text-3xl font-bold'>TRYNEW</h1>
    <div className='w-1/4'>
    <ul className="flex flex-row justify-around">
      <Link to="" className=' focus:scale-125 focus:drop-shadow-md focus:shadow-white focus:transition  w-14 h-8 focus:font-semibold focus:rounded-none focus:flex focus:justify-center focus:items-center'>Home</Link>
      {Object.keys(usernow).length===0 && <Link to="login" className=' focus:scale-125 focus:drop-shadow-md focus:shadow-white focus:transition  w-14 h-8 focus:font-semibold focus:rounded-none focus:flex focus:justify-center focus:items-center'>Login</Link>}
      {Object.keys(usernow).length===0 && <Link to="signup" className='focus:p-4 focus:scale-125 focus:drop-shadow-md focus:shadow-white focus:transition  w-14 h-8 focus:font-semibold focus:rounded-none focus:flex focus:justify-center focus:items-center'>SignUp</Link>}
      {Object.keys(usernow).length!==0 && <Link to="signout" className='focus:p-4 focus:scale-125 focus:drop-shadow-md focus:shadow-white focus:transition  w-14 h-8 focus:font-semibold focus:rounded-none focus:flex focus:justify-center focus:items-center'>Signout</Link>}
      {Object.keys(usernow).length!==0 && <Link to="wishlist" className='focus:p-4 focus:scale-125 focus:drop-shadow-md focus:shadow-white focus:transition  w-14 h-8 focus:font-semibold focus:rounded-none focus:flex focus:justify-center focus:items-center'>Wishlist</Link>}
      <Link to="cart" className=' focus:scale-125 focus:drop-shadow-md focus:shadow-white focus:transition  w-14 h-8 focus:font-semibold focus:rounded-none focus:flex focus:justify-center focus:items-center'>Cart</Link>
    </ul>
    </div>
    </div>
  )
}

export default Header