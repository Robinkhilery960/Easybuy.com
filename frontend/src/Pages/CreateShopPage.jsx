import React, { useEffect } from 'react'
import CreateShop from "./CreateShop.jsx"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CreateShopPage = () => {
  const { isShopAuthenticated, isShopLoading } = useSelector((state) => state.shop)
  const navigate = useNavigate()
  useEffect(() => {
    if (isShopAuthenticated) {
      navigate(`/dashboard`)
    }
  }, [isShopAuthenticated, isShopLoading])
  return (
    <div><CreateShop /></div>
  )
}

export default CreateShopPage