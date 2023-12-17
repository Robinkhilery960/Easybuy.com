import React, { useEffect } from 'react'
import LoginShop from "./LoginShop.jsx"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginShopPage = () => {
    const { isShopAuthenticated, shop } = useSelector((state) => state.shop)
    console.log("shop, isShopAuthenticated", shop, isShopAuthenticated)
    const navigate = useNavigate()
    useEffect(() => {
        if (isShopAuthenticated) {
            navigate(`/shop/${shop._id}`)
        }
    }, [])
    return (
        <div><LoginShop /></div>
    )
}

export default LoginShopPage