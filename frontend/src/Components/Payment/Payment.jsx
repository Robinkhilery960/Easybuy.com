import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../Styles/style'
import axios from 'axios'
import { server } from '../../server'
import { toast } from 'react-toastify'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux'


const Payment = () => {
    const [orderData, setOrderData] = useState([])
    const { user } = useSelector((state) => state.user)
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const paymentData = {
        amount: Math.round(orderData?.totalPrice * 100)
    }
    const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: orderData?.user,
        totalPrice: orderData?.totalPrice
    }
    const paymentHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${server}/payment/process`, paymentData)

            const client_secret = data.client_secret
            console.log("client_secret", client_secret)
            if (!stripe || !elements) return
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement)
                }
            })
            if (result.error) {
                toast.error(result.error.message)
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                        type: "Credit Card"
                    }
                }

                await axios.post(`${server}/order/create-order/`, order, { withCredentials: true }).then((res) => {
                    toast.success("Order created successfully")
                    localStorage.setItem("cartItems", JSON.stringify([]))
                    localStorage.setItem("lastOrder", JSON.stringify([]))
                    navigate("/order/success")
                    window.location.reload()
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }


    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("lastOrder"))
        setOrderData(orderData)
    }, [])
    return (
        <div className='w-full flex flex-col items-center py-8'>
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <PaymentInfo user={user} paymentHandler={paymentHandler} />
                </div>
                <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                    <CardData orderData={orderData} />
                </div>

            </div>
        </div>
    )
}


const PaymentInfo = ({ user, paymentHandler }) => {
    const [select, setSelect] = useState(1)


    return (
        <div className='w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8'>
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                        onClick={() => setSelect(1)}
                    >
                        {select === 1 ? (
                            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                        ) : null}
                    </div>
                    <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                        Pay with Debit/Credit Card
                    </h4>
                </div>

                {/* pay with card */}
                {select === 1 ? (<div className="w-full flex border-b">
                    <form className='w-full  ' onSubmit={paymentHandler}>
                        <div className="w-full flex pb-3">
                            <div className="w-[50%]">
                                <label className='block pb-2'>Name on Card</label>
                                <input type="required" className={`${styles.input} !w-[95%]`} value={user && user?.name} />
                            </div>
                            <div className="w-[50%]">
                                <label className='block pb-2'>Exp Date</label>
                                <CardExpiryElement
                                    className={`${styles.input}`}
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "19px",
                                                lineHeight: 1.5,
                                                color: "#444",
                                            },
                                            empty: {
                                                color: "#3a120a",
                                                backgroundColor: "transparent",
                                                "::placeholder": {
                                                    color: "#444",
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <div className="w-full flex pb-3">
                            <div className="w-[50%]">
                                <label className='block pb-2'>Card Number</label>
                                <CardNumberElement
                                    className={`${styles.input} !h-[35px] !w-[95%]`}
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "19px",
                                                lineHeight: 1.5,
                                                color: "#444",
                                            },
                                            empty: {
                                                color: "#3a120a",
                                                backgroundColor: "transparent",
                                                "::placeholder": {
                                                    color: "#444",
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                            <div className="w-[50%]">
                                <label className='block pb-2'>CVV</label>
                                <CardCvcElement
                                    className={`${styles.input} !h-[35px]`}
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "19px",
                                                lineHeight: 1.5,
                                                color: "#444",
                                            },
                                            empty: {
                                                color: "#3a120a",
                                                backgroundColor: "transparent",
                                                "::placeholder": {
                                                    color: "#444",
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <input type="submit" value="Submit" className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`} />
                    </form>
                </div>) : null
                }
            </div>
            <br />

            <div className="flex w-full pb-5 border-b mb-2">
                <div
                    className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                    onClick={() => setSelect(2)}
                >
                    {select === 2 ? (
                        <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                    ) : null}
                </div>
                <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                    Pay with Paypal
                </h4>
            </div>

            <br />
            {/* pay with paypal */}
            <div>
                {select === 2 ? (<div className="w-full flex border-b">
                    <form className='full' onSubmit={paymentHandler}>
                        <div className="w-full flex pb-3">
                            <div className="w-full">
                                <label className='block pb-2'>Paypal Email</label>
                                <input type="required" className={`${styles.input}`} />
                            </div>
                        </div>

                        <input type="submit" value="Submit" className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`} />
                    </form>
                </div>) : null
                }
            </div>
            <br />
            {/* cash on delivery */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                        onClick={() => setSelect(3)}
                    >
                        {select === 3 ? (
                            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                        ) : null}
                    </div>
                    <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                        Cash on Delivery
                    </h4>
                </div>

                {/* cash on delivery */}
                {select === 3 ? (
                    <div className="w-full flex">
                        <form className="w-full" onSubmit={paymentHandler}>
                            <input
                                type="submit"
                                value="Confirm"
                                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                            />
                        </form>
                    </div>
                ) : null}
            </div>

        </div>
    )
}


const CardData = ({ orderData }) => {

    return (
        <div className='w-full bg-[#fff] rounded-md p-5 pb-8'>
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                <h5 className='text-[18px] font-[600]'>{orderData.subTotalPrice}</h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                <h5 className='text-[18px] font-[600]'>{orderData?.shippingCost}</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className='text-[18px] font-[600]'>-{
                    orderData?.discountPrice
                }</h5>
            </div>
            <div className="flex justify-between items-center">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Total:</h3>
                <h5 className='text-[18px] font-[600] text-end pt-3'>{orderData?.totalPrice}</h5>
            </div>
            <br />
            <form  >
                <input type="text" className={`${styles.input} h-[40px] pl-2`} placeholder='Coupon Code' required />
                <input type="submit" className={`w-full h-[40px] border border-[#F63B60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`} required value="Apply code" />
            </form>
        </div>
    )
}

export default Payment