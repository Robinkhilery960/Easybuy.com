import React, { useEffect } from 'react'
import Login from "../Components/Login/Login.jsx"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const {isAuthenticated}= useSelector((state)=>state.user) 
  const navigate=useNavigate()
  useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
    }
  }, [])
  
  return (
    <div ><Login/></div>
  )
}

export default LoginPage