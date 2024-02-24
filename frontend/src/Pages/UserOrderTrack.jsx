import React, { useEffect } from 'react'
import { loadShopOrders } from '../redux/slice/order'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserOrderTrack = () => {
    const { shopOrders } = useSelector(state => state.order)
    const { shop } = useSelector(state => state.shop)
    const { orderId } = useParams()
    const dispatch = useDispatch()
    let data = shopOrders && shopOrders.find((order) => order._id === orderId)

    useEffect(() => {
        dispatch(loadShopOrders(shop._id))
    }, [])
    return (
        <div className='h-[70vh] flex justify-center items-center'>
            {
                data && data?.status === "Processing" ? (
                    <p>You order is processing </p>
                )
                :(
                    data?.status === "Transferred to delivery partner" ? (
                        <p>You product is transfered to ourdelivery partner </p>
                    ):(
                        data?.status === "Shipping" ? (
                            <p>Our delivery parnter have shiped your product  </p>
                        ):(
                            data?.status === "Received" ? (
                                <p>Your product is with our delivery partner in your city   </p>
                            ):(
                                data?.status === "On the way" ? (
                                    <p>Your product  your way to your house   </p>
                                ):(
                                    data?.status === "Delivered" ? (
                                        <p>Your product is delivered to your doorstep.  </p>
                                    ):(
                                        data?.status === "Processing refund" ? (
                                            <p>We have recevied your refund request. We are processing on it.</p>
                                        ):(
                                            null)
                                    )
                                )
                            )
                        )
                    )
            ) 
            }
        </div>
    )
     
    
}

export default UserOrderTrack