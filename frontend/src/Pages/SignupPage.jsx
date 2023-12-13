import React, { useEffect } from 'react'
import Signup from '../Components/Signup/Signup'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SignupPage = () => {
  const {isAuthenticated}= useSelector((state)=>state.user) 
  const navigate=useNavigate()
  useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
    }
  }, [])
  return (
    <div><Signup/></div>
  )
}

export default SignupPage