import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate,Link } from 'react-router-dom';
function SignUp() {
  const {register,handleSubmit,formState:{errors}}=useForm();
  const navigate=useNavigate();
  function handlingNewUser(newUser){
    fetch('http://localhost:3000/users',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newUser)
    })
    .then(res=>{
      if(res.status===201){
        navigate('/login')
      }
    })
    .catch(err=>console.log(err))
  }
  return (
    <div className='bg-slate-400 p-6 m-3 rounded-xl w-96'>
      <h1 className='m-3 font-bold text-center text-3xl'>SIGNUP</h1>
      <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit(handlingNewUser)}>
        <label htmlFor="username">Username</label>
        <input type="text" {...register('username')} id="username" className='border-2 p-1.5 w-80 border-stone-400 focus:border-gray-700 focus:outline-none rounded-lg'/>
        <label htmlFor="password">Password</label>
        <input type="text" {...register('password')} id="password" className='border-2 p-1.5 w-80 border-stone-400 focus:border-gray-700 focus:outline-none rounded-lg'/>
        <label htmlFor="email">Email</label>
        <input type="email" {...register('email')} id="email" className='border-2 p-1.5 w-80 border-stone-400 focus:border-gray-700 focus:outline-none rounded-lg' />
        <button type="submit" className='m-2 bg-purple-500 rounded-md hover:shadow-md hover:shadow-purple-500 p-2 text-white w-2/4 self-center'>SIGNUP</button>
        <Link className='text-center underline text-white hover:text-blue-800' to="/login">Already Registered?</Link>
      </form>
    </div>
  )
}

export default SignUp