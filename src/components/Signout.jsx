import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userValid } from '../contexts/User'
import { Link } from 'react-router-dom'
function Signout() {
   const navigate=useNavigate();
   const {usernow,setUsernow}=useContext(userValid); 
   console.log(usernow)
   function usersignout(){
    setUsernow({})
    navigate('/');
   }
  return (
    <div>
        <h1 className='m-5 text-2xl font-bold'>Hi {usernow.username}!,Are you sure to Logout?</h1>
        <div className='flex justify-center items-center'>
        <button className='text-center p-2 w-20 bg-yellow-300 text-black rounded-md m-5' onClick={usersignout}>Yes</button>
        <Link to="/" className='text-center p-2 w-20 bg-yellow-300 text-black rounded-md'>No</Link>
        </div>
    </div>

  )
}

export default Signout