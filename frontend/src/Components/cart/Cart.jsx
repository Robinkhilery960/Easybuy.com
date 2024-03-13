import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { HiOutlineMinus, HiPlus } from 'react-icons/hi'
import { IoBagHandleOutline } from 'react-icons/io5'
import styles from '../../Styles/style'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { backend_url } from '../../server'
import { addTocart, removeFromCart } from '../../redux/slice/cart'
import { toast } from 'react-toastify'

const Cart = ({ setOpenCart }) => {
    const { cart } = useSelector((state) => state.cart)
    const totalPrice = cart && cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)
    const dispatch = useDispatch()



    return (
        <div className='fixed top-0 left-0 w-full bg-[#00000028] h-screen z-10 '>
            <div className='fixed top-0 right-0 h-[100%] bg-white flex flex-col justify-between w-[25%] shadow-sm  overflow-y-scroll '>
                {
                    cart && cart.length === 0 ? (
                        <div className="w-full h-screen flex items-center justify-center">
                            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                                <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenCart(false)} />
                            </div>
                            <h5>Cart Items are empty</h5>
                        </div>
                    ) : (
                        <>
                            <div >
                                <div className='flex w-full justify-end pt-5 pr-5'>
                                    <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenCart(false)} />
                                </div>

                                {/* Items length */}

                                <div className={`${styles.normalFlex} p-4  `}>
                                    <IoBagHandleOutline size={25} />
                                    <h5 className="pl-2 text-[20px] font-[500]">
                                        {cart.length} items
                                    </h5>
                                </div>

                                {/* cart singl items */}
                                <br />
                                <div className='w-full border-t overflow-y-scroll '>
                                    {
                                        cart && cart.map((data, index) => (
                                            <CartSingle key={data._id} data={data} />
                                        ))
                                    }
                                </div>
                                <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}>
                                    <Link to="/checkout">
                                        <h1 className='text-[#fff] text-[18px] font-[600]'>
                                            Checkout Now ($ {totalPrice})
                                        </h1>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    )
}

const CartSingle = ({ data }) => {
    const [value, setValue] = useState(data && data.qty ? data.qty : 1)
    const totalPrice = data.discountPrice * value
    const dispatch = useDispatch()


    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(data._id))
        toast.success("Item removed from cart!")
    }
    const handleQtyChange = (data) => {
        console.log(data)
        dispatch(addTocart(data))
    }

    const increment = (data) => {
        if (data.stock <= value) {
            toast.error("Stock is limited !!")
        } else {
            setValue(value + 1)
            const updateCardData = { ...data, qty: value + 1 }
            handleQtyChange(updateCardData)
        }
    }

    const decrement = (data) => {
        setValue(value === 1 ? 1 : value - 1)
        const updateCardData = { ...data, qty: value === 1 ? 1 : value - 1 }
        handleQtyChange(updateCardData)

    }
    return (
        <div className='border-b p-4'>
            <div className="w-full flex items-center">
                <div>
                    <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer `} onClick={() => increment(data)}>
                        <HiPlus size={18} color="#fff" />
                    </div>
                    <span className='pl-[10px]'>{value}</span>
                    <div className={`bg-[#7ba6e72b] rounded-full  w-[25px] h-[25px]  ${styles.normalFlex} justify-center cursor-pointer`} onClick={() => decrement(data)}>
                        <HiOutlineMinus size={16} color='#7d879c' />
                    </div>
                </div>

                <img src={data?.images[0].url} alt="" className='w-[60px] h-[60px] mx-2' />

                <div className='pl-[5px]'>
                    <h1>{data.name.length > 10 ? data.name.slice(0, 40) + "...." : data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000082]'>$ {data.discountPrice} * {value}</h4>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>$ {totalPrice}</h4>
                </div>
                <RxCross1 className='cursor-pointer' onClick={handleRemoveFromCart} />
            </div>
        </div>
    )
}

export default Cart