import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from './components/SignUp';
import Cart from "./components/Cart";
import Product from './components/Product';
import Error from './components/Error';
import Signout from './components/Signout';
import Wishlist from './components/Wishlist';
function App() {
  const browserRoute=createBrowserRouter([
    {
      path:"",
      element:<RootLayout />,
      errorElement:<Error />,
      children:[
        {
          path:"",
          element:<Home />
        },
        {
          path:"login",
          element:<Login />
        },
        {
          path:"signup",
          element:<SignUp />
        },
        {
          path:"cart",
          element:<Cart />
        },{
          path:"product",
          element:<Product />
        },
        {
          path:"signout",
          element:<Signout />
        },
        {
          path:"wishlist",
          element:<Wishlist />
        }
      ]
    }
  ])
  return <RouterProvider router={browserRoute} />
}

export default App