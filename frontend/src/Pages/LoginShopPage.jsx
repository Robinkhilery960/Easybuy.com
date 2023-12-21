import React, { useEffect } from 'react'
import LoginShop from "./LoginShop.jsx"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginShopPage = () => {
    const { isShopAuthenticated,isShopLoading } = useSelector((state) => state.shop) 
    const navigate = useNavigate()
    useEffect(() => {
        if (isShopAuthenticated) {
            navigate(`/dashboard`)
        }
    }, [isShopAuthenticated,isShopLoading ])
    return (
        <div><LoginShop /></div>
    )
}

export default LoginShopPage