import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { BsFillBagFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backend_url, server } from '../server'
import styles from '../Styles/style'
import { loadUserOrders } from '../redux/slice/order'
import { RxCross1 } from 'react-icons/rx'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const UserOrderDetail = () => {
    const { userOrders } = useSelector(state => state.order)
    const { user } = useSelector(state => state.user)
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState("")
    const { orderId } = useParams()
    const dispatch = useDispatch()

    let data = userOrders && userOrders.find((order) => order._id === orderId)
    console.log(data)

    const handleReview = async () => {
        try {
            axios.put(`${server}/product/create-review`, { user, rating, comment, productId: selectedItem._id, orderId }, { withCredentials: true }).then((res) => {
                toast.success("Review Added successfully")
                dispatch(loadUserOrders(user._id))
                setOpen(false)
                setComment("")
                setRating(1)
            })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const handleRefund = async () => {
        try {
            axios.put(`${server}/order/request-refund/${orderId}`, { status: "Processing refund" }, { withCredentials: true }).then((res) => {
                toast.success("Refund  requested successfully")
                dispatch(loadUserOrders(user._id))
                setOpen(false)
                setComment("")
                setRating(1)
            })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

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
                        <img src={item?.images[0].url} alt="" className='h-[80px] w-[80px]' />
                        <div className="w-full">
                            <h5 className="pl-3 text-[20px]">{item.name}</h5>
                            <h5 className="pl-3 text-[20px] text-[#2d262691]">US${item.discountPrice} x {item.qty}</h5>
                        </div>
                        {
                            data?.status === "Delivered" && !item?.isReviewed ? (
                                <div className={`${styles.button} !bg-[#000] !rounded-[4px] text-[#fff] font-[600] !h-[45px] text-[18px]`} onClick={() => [setOpen(true), setSelectedItem(item)]}>
                                    Add a review
                                </div>
                            ) : null
                        }
                    </div>
                ))
            }
            {
                open && (
                    <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
                        <div className="w-[50%] h-[85vh] bg-[#fff] shadow rounded-md p-3 overflow-y-scroll">

                            <div className="w-full flex justify-end">
                                <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)} />
                            </div>

                            <h2 className="text-[30px] font-[500] font-Poppins text-center">
                                Add a Review
                            </h2>
                            <br />
                            <div className="w-full flex">
                                <img src={selectedItem?.images[0].url} alt="" className='h-[80px] w-[80px]' />
                                <div>
                                    <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                                    <h4 className="pl-3 text-[20px]">
                                        US${selectedItem?.discountPrice} x {selectedItem?.qty}
                                    </h4>
                                </div>
                            </div>

                            <br />
                            <br />

                            {/* ratings */}
                            <h5 className='pl-3 text-[20px] font-[500]'>Give a Rating
                                <span className="text-red-500">*</span>
                            </h5>
                            <div className="flex w-full ml-2 pt-1">
                                {[1, 2, 3, 4, 5].map((i) => rating >= i ? (
                                    <AiFillStar key={i} className='mr-1 cursor-pointer' color='rgb(246, 186, 0)' size={25} onClick={() => setRating(i)} />
                                ) : (<AiOutlineStar key={i} className='mr-1 cursor-pointer' color='rgb(246, 186, 0)' size={25} onClick={() => setRating(i)} />))}
                            </div>
                            <br />
                            <div className="w-full  ml-3">
                                <label className='block text-[20px] font-[500]'>
                                    Write a Comment
                                    <span className='ml-1 font-[400] text-[16px] text-[#00000052]'>(optional)</span>
                                </label>
                                <textarea name="comment" id="" cols="20" rows="5" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Help us to improve our services ' className="mt-2 w-[95%] border p-2 outline-none"></textarea>
                            </div>
                            <div className={`${styles.button} text-white text-[20px] ml-3`}
                                onClick={rating > 1 ? handleReview : null}
                            >
                                Submit</div>
                        </div>
                    </div>

                )
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
                    {
                        data?.paymentInfo?.status === "Succeeded" ? (
                            <div className={`${styles.button} text-white`} onClick={handleRefund}>
                                Ask for Refund
                            </div>
                        ) : null
                    }

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