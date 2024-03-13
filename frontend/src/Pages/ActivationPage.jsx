import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { server } from '../server'

const ActivationPage = () => { 
    const { activationToken } = useParams()
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const activationEmail = async () => {
        if (activationToken) {
            try {
                const res = await axios.post(`${server}/user/activation`, { activationToken })
                console.log("res", res)
                // navigate("/login")
            } catch (error) {
                console.log(error.response.data.message)
                setError(true)
            }
        }
    }

    useEffect(() => {
        activationEmail()
    }, [activationToken])

    return (
        <div>{
            error ? <p>Your token is expired </p> : <p>Your account created successfully</p>
        }
        </div>
    )
}

export default ActivationPage