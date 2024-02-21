import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { BsFillBagFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backend_url, server } from '../server'
import styles from '../Styles/style'
import { loadUserOrders } from '../redux/slice/order'

const UserOrderDetail = () => {
    const { userOrders } = useSelector(state => state.order)
    const { user } = useSelector(state => state.user)
    const { orderId } = useParams()
    const dispatch = useDispatch()

    let data = userOrders && userOrders.find((order) => order._id === orderId)
    console.log(data)


    useEffect(() => {
        dispatch(loadUserOrders(user._id))
    }, [])
    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <BsFillBagFill size={30} color='crimson' />
                    <div className="pl-2 text-[25px]">Order Details</div>
                </div>
                <Link to="/">
                    {
                        data?.status === "Delivered" ? (<div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}>
                            Add a review
                        </div>) : null
                    }

                </Link>
            </div>

            <div className="w-full flex items-center justify-between pt-6">
                <h5 className="text-[#00000084]">
                    Order ID : <span> # {data?._id?.slice(0, 10)}</span>
                </h5>
                <h5 className="text-[#00000084]">
                    Created At : <span>  {data?.createdAt?.slice(0, 10)}</span>
                </h5>
            </div>

            {/* order items */}
            <br />
            <br />
            {
                data && data?.cart?.map((item, index) => (
                    <div className="w-full flex items-start mb-5">
                        <img src={`${backend_url}${item?.images[0]}`} alt="" className='h-[80px] w-[80px]' />
                        <div className="w-full">
                            <h5 className="pl-3 text-[20px]">{item.name}</h5>
                            <h5 className="pl-3 text-[20px] text-[#2d262691]">US${item.discountPrice} x {item.qty}</h5>
                        </div>
                    </div>
                ))
            }

            <div className="border-t w-full text-right">
                <h5 className="pt-3 text-[18px]">
                    Total Price : <strong>US${data?.totalPrice}</strong>
                </h5>
            </div>

            <br />
            <br />
            <div className="w-full 800px:flex items-center">
                <div className="w-full 800px:w-[60%]">
                    <h4 className="text-[20px] pt-3 font-[600]">Shipping Address:</h4>
                    <h4 className="text-[20px] pt-3 ">{data?.shippingAddress.address1 + " " + data?.shippingAddress.address2
                    }</h4>
                    <h4 className="text-[20px]">{data?.shippingAddress.country}</h4>
                    <h4 className="text-[20px]">{data?.shippingAddress.city}</h4>
                    <h4 className="text-[20px]">{data?.phoneNumber}</h4>
                </div>

                <div className="w-full 800px:w-[40%]">
                    <h4 className="pt-3 text-[20px]">Payment Info:</h4>

                    <h4 >
                        Mode of Payment:{" "}
                        {data?.paymentInfo?.type ? data?.paymentInfo?.type : "Not Paid"}</h4>
                    <h4 >
                        Payment Status:{" "}
                        {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</h4>
                </div>

            </div>
            <br />
            <br />
            <div className="border-t w-full text-left">
                <h5 className="pt-3 text-[18px]">
                    Order Status : <strong> {data?.status}</strong>
                </h5>
            </div>
            <br />
            <br />




        </div>
    )
}

export default UserOrderDetail