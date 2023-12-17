import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedShopRoute = ({isShopAuthenticated, children}) => {
    console.log("ProtectedShopRoute :isShopAuthenticated " , isShopAuthenticated)
    if(!isShopAuthenticated){
        return <Navigate to="/" replace/>
    }
  return  children
}

export default ProtectedShopRoute