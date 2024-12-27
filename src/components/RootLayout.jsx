import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
function RootLayout() {
  return (
    <div className='flex flex-col'>
        <Header />
        <div className='flex justify-center min-h-screen bg-slate-300 '>
        <Outlet />
        </div>
        {/* <Footer /> */}
    </div>
  )
}

export default RootLayout