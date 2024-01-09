import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { BsCartPlus } from 'react-icons/bs'
import { HiOutlineMinus, HiPlus } from 'react-icons/hi'
import { IoBagHandleOutline } from 'react-icons/io5'
import styles from '../../Styles/style'
import { AiOutlineHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { backend_url } from '../../server'
import { removeFromWishlist } from '../../redux/slice/wishlist'
import { toast } from 'react-toastify'
import { addTocart } from '../../redux/slice/cart'

const Wishlist = ({ setOpenWishlist }) => {
    const { wishlist } = useSelector(state => state.wishlist)
    return (
        <div className='fixed top-0 left-0 w-full bg-[#00000028] h-screen z-10 '>
            <div className='fixed top-0 right-0 h-[100%] bg-white flex flex-col justify-between w-[25%] shadow-sm overflow-y-scroll'>
                {
                    wishlist && wishlist.length === 0 ? (
                        <div className="w-full h-screen flex items-center justify-center">
                            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                                <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenWishlist(false)} />
                            </div>
                            <h5>Wishlist Items are empty</h5>
                        </div>
                    ) : (
                        <>  <div >
                            <div className='flex w-full justify-end pt-5 pr-5'>
                                <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenWishlist(false)} />
                            </div>

                            {/* Items length */}

                            <div className={`${styles.normalFlex} p-4  `}>
                                <AiOutlineHeart size={25} />
                                <h5 className="pl-2 text-[20px] font-[500]">
                                    {wishlist.length} items
                                </h5>
                            </div>

                            {/* cart singl items */}
                            <br />
                            <div className='w-full border-t overflow-y-scroll '>
                                {
                                    wishlist && wishlist.map((data) => (
                                        <WishlistSingle key={data._id} data={data} />
                                    ))
                                }
                            </div>

                        </div></>)
                }


            </div>
        </div>
    )
}

const WishlistSingle = ({ data }) => {
    const { cart } = useSelector(state => state.cart)

    const [value, setValue] = useState(1)
    const totalPrice = data.price * value
    const dispatch = useDispatch()

    const handleRemoveFromWishlist = (id) => {
        dispatch(removeFromWishlist(id)) 
    }
    const handleAddToCart = (id) => {
        console.log(id)
        const isItemExists = cart && cart.find((i) =>
            i._id === id
        )
        console.log(isItemExists)
        if (isItemExists) {
            toast.error("Item already in cart !")
        } else {
            const cartData = { ...data, qty: 1 }
            dispatch(addTocart(cartData))
            toast.success("Item added to cart successfully ")
            handleRemoveFromWishlist(id)
        }
    }
    return (
        <div className='border-b p-4'>
            <div className="w-full flex items-center justify-between">
                <RxCross1 className=' cursor-pointer' onClick={() => handleRemoveFromWishlist(data._id)} />


                <img src={`${backend_url}${data?.images[0]}`} alt="" className='w-[80px] h-[80px] ml-2' />

                <div className='pl-[5px]'>
                    <h1>{data.name.length > 10 ? data.name.slice(0, 40) + "...." : data.name}</h1>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>₹ {data.discountPrice}</h4>
                </div>
                <div>
                    <BsCartPlus size={20} className="cursor-pointer" title="Add to cart"
                        onClick={() => handleAddToCart(data._id)}
                    />
                </div>

            </div>
        </div>
    )
}

export default Wishlist