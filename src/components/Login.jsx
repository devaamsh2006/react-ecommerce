import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { useContext } from 'react';
import { userValid } from '../contexts/User';
function Login() {
  const {register,handleSubmit,formState:{errors}}=useForm()
  const {usernow,setUsernow}=useContext(userValid);
  let [user,isexist]=useState({});
  let [mistake,setMistake]=useState(null);
  const navigate=useNavigate();
  function handleLogin({username,password}){
    console.log("sucess")
    fetch(`http://localhost:3000/users?username=${username}`)
    .then(res=>res.json())
    .then(userobj=>{
      isexist(userobj)
      if(user.length===0){
        setMistake("User doesnot exist Register yourself")
      }else{
      if(userobj[0].password===password){
        setUsernow(userobj[0])
        console.log(userobj[0])
        navigate('/',{state:user})
      }else if(userobj[0].password!==password){
        console.log("sucess2")
        setMistake("Enter correct Password")
      }}
    })
    .catch(err=>console.log(err))
  }

  return (
    <div>
      <div className='bg-slate-400 p-6 m-3 rounded-xl w-96'>
      {mistake!==null && <p className='text-center text-red-600 font-semibold text-lg'>{mistake}</p>}
      <h1 className='m-3 font-bold text-center text-3xl'>LOGIN</h1>
      <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor="username">Username</label>
        <input type="text" {...register('username')} id="username" className='border-2 p-1.5 w-80 border-stone-400 focus:border-gray-700 focus:outline-none rounded-lg'/>
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} id="password" className='border-2 p-1.5 w-80 border-stone-400 focus:border-gray-700 focus:outline-none rounded-lg'/>
        <button type="submit" className='m-2 bg-purple-500 rounded-md hover:shadow-md hover:shadow-purple-500 p-2 text-white w-2/4 self-center'>Login</button>
        <Link className='text-center underline text-white hover:text-blue-800' to="/signup">New User?Register Here.</Link>
      </form>
    </div>
    </div>
  )
}

export default Login