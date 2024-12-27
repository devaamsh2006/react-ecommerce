import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import User from './contexts/User.jsx'
import Wishitems from './contexts/Wishitems.jsx'
import CartItems from './contexts/CartItems.jsx'
import Productlist from './contexts/Productlist.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <User>
      <Wishitems>
        <CartItems>
          <Productlist>
            <App />
            </Productlist>
        </CartItems>
      </Wishitems>
    </User>
  </StrictMode>,
)
