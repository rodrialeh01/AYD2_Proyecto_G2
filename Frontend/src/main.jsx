import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { CarritoProvider } from './Context/Carrito.jsx'
import UserProvider from './Context/User.jsx'
import './index.css'
import { router } from './router/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CarritoProvider>
        <RouterProvider router={router} />
      </CarritoProvider>
    </UserProvider>
  </React.StrictMode>,
)
