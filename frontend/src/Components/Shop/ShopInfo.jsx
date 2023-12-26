import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { backend_url, server } from '../../server'
import styles from '../../Styles/style'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../layout/Loader'

const ShopInfo = ({ isOwner }) => {
    const { shopId } = useParams()
    const [shop, setShop] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const logoutHandler = () => {
        axios.get(`${server}/shop/logout`, { withCredentials: true }).then((res) => {
            toast.success("Shop logout  Successful")
            navigate("/login-shop")
            window.location.reload(true)
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }
    const getShopInfo = async () => {
        try {
            setLoading(true)
            const  {data} = await axios.get(`${server}/shop/get-shop-info/${shopId}`)
             
            setLoading(false)
            setShop(data.shop)
        } catch (error) {
            console.log(error.response.data.message)
            setLoading(false)
        }

    }

    useEffect(() => { 
        getShopInfo()
    }, [])
    return (

        <>
            {
                loading ? <Loader /> : (<div>
                    <div className="w-full py-5">
                        <div className="w-full flex items-center justify-center">
                            <img src={`${backend_url}${shop?.avatar}`} alt="" className='w-[150px] h-[150px] object-cover rounded-full' />
                        </div>
                        <h3 className='text-center py-2 text-[20px]'>
                            {shop?.name}
                        </h3>
                        <p className='text-[16px] text-[#000000a6] flex items-center'>
                            {shop?.description}
                        </p>
                    </div>
                    <div className="p-3">
                        <h5 className="font-[600]">Address</h5>
                        <h4 className="text-[#000000a6]">{shop?.address}</h4>
                    </div>
                    <div className="p-3">
                        <h5 className="font-[600]">Phone Number</h5>
                        <h4 className="text-[#000000a6]">{shop?.phoneNumber}</h4>
                    </div>
                    <div className="p-3">
                        <h5 className="font-[600]"> Total Products</h5>
                        <h4 className="text-[#000000a6]">10</h4>
                    </div>
                    <div className="p-3">
                        <h5 className="font-[600]"> Shop  Ratings</h5>
                        <h4 className="text-[#000000a6]">4/5</h4>
                    </div>
                    <div className="p-3">
                        <h5 className="font-[600]"> Joined on</h5>
                        <h4 className="text-[#000000a6]">{shop?.createdAt?.slice(0, 10)}</h4>
                    </div>
                    {
                        isOwner && (
                            <div className="py-3 px-4">
                                <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                                    <span className='text-white'>Edit shop</span>
                                </div>
                                <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`} onClick={logoutHandler}>
                                    <span className='text-white'>Log Out</span>
                                </div>
                            </div>
                        )
                    }
                </div>)
            }
        </>

    )
}

export default ShopInfo