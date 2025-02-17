import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ItemsProvider from './context/ItemsContext.jsx'
import UserProvider from './context/UserContext.jsx'
import CartProvider from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ItemsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ItemsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
