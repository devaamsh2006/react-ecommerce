import React from 'react'
import { useRouteError } from 'react-router-dom'
import Header from './Header';

function Error() {
    const routeErr=useRouteError();
  return (
    <div>
        <Header />
        <h1 className='m-5 text-center font-extrabold uppercase'>{routeErr.data}</h1>
        <p className='m-5 text-center uppercase font-bold'>{routeErr.status}</p>
        <p className='m-5 text-center uppercase font-semibold'>Try again after sometime</p>
    </div>
  )
}

export default Error