import React, { useEffect, useState } from 'react'
import styles from '../../Styles/style'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { BsFillBagFill } from 'react-icons/bs'
import { loadShopOrders } from '../../redux/slice/order'
import { useDispatch, useSelector } from 'react-redux'
import { backend_url, server } from '../../server'
import { toast } from 'react-toastify'
import axios from 'axios'

const OrderDetails = () => {
    const { shopOrders } = useSelector(state => state.order)
    const { shop } = useSelector(state => state.shop)
    const [status, setStatus] = useState("")
    const { orderId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let data = shopOrders && shopOrders.find((order) => order._id === orderId)
    console.log(orderId)

    const orderUpdateHandler = async () => {
        try {
            await axios.post(`${server}/order/update-order-status/${orderId}`, { status }, { withCredentials: true }).then((res) => {
                toast.success("Order status updated successfully")
                navigate("/dashboard-orders")
            })
        } catch (error) {
            toast.error(error.response.data.messgae)
        }
    }
    const orderhandleRefund = async () => {
        try {
            await axios.put(`${server}/order/order-refund-success/${orderId}`, { status }, { withCredentials: true }).then((res) => {
                toast.success("Order status updated successfully")
                dispatch(loadShopOrders(shop._id))
            })
        } catch (error) {
            toast.error(error.response.data.messgae)
        }
    }


    useEffect(() => {
        dispatch(loadShopOrders(shop._id))
    }, [])
    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <BsFillBagFill size={30} color='crimson' />
                    <div className="pl-2 text-[25px]">Order Details</div>
                </div>
                <Link to="/dashboard-orders">
                    <div className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}>
                        Order List
                    </div>
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
                        <img src={ item?.images[0].url} alt="" className='h-[80px] w-[80px]' />
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
                        Status:{" "}
                        {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</h4>
                    <h4 >
                        Delivered At:{" "}
                        {data?.deliveredAt ? data?.deliveredAt.slice(0, 10) : "Not Delivered yet"}</h4>
                </div>
            </div>
            <br />
            <br />
            <h4 className="pt-3 text-[20px] font-[600]">
                Order Status:
            </h4>
            {
                data && (data?.status !== "Processing refund" && data?.status !== "Refund successful") ? (<select value={status} onChange={(e) => setStatus(e.target.value)} className='w-[200px] mt-2 border h-[35px] rounded-[5px]'>
                    {
                        [
                            "Processing",
                            "Transferred to delivery partner",
                            "Shipping",
                            "Received",
                            "On the way",
                            "Delivered",
                        ].slice([
                            "Processing",
                            "Transferred to delivery partner",
                            "Shipping",
                            "Received",
                            "On the way",
                            "Delivered",
                        ].indexOf(data?.status)).map((option, index) => (
                            <option value={option} key={index}>{option}</option>
                        ))
                    }
                </select>) : (<select value={status} onChange={(e) => setStatus(e.target.value)} className='w-[200px] mt-2 border h-[35px] rounded-[5px]'>
                    {
                        [
                            "Processing refund",
                            "Refund successful"
                        ].slice([
                            "Processing refund",
                            "Refund successful"
                        ].indexOf(data?.status)).map((option, index) => (
                            <option value={option} key={index}>{option}</option>
                        ))
                    }
                </select>)
            }


            <div className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`} onClick={(data?.status !== "Processing refund" && data?.status !== "Refund successful") ? orderUpdateHandler : orderhandleRefund}>Update Status </div>

        </div>
    )
}

export default OrderDetails