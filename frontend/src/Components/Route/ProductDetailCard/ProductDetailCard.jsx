import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx"
import styles from '../../../Styles/style'
import { AiOutlineMessage, AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { backend_url } from '../../../server'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addTocart } from '../../../redux/slice/cart'
import { addToWishlist, removeFromWishlist } from '../../../redux/slice/wishlist'
const ProductDetailCard = ({ setOpen, data }) => {
    const { cart } = useSelector(state => state.cart)
    const { wishlist } = useSelector(state => state.wishlist)

    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false)
    // const [select, setSelect] = useState(false)
    const dispatch = useDispatch()


    const handleMessageSumbit = () => {

    }

    const handleAddToWishlist = (id) => {
        setClick(true)
        dispatch(addToWishlist(data))


    }

    const handleRemoveFromWishlist = (id) => {
        setClick(false)
        dispatch(removeFromWishlist(data._id))

    }

    useEffect(() => {
        if (wishlist && wishlist.find(item => item._id === data._id)) {
            setClick(true)
        } else {
            setClick(false)
        }
    }, [wishlist])


    const handleAddToCart = () => {
        dispatch(addTocart(data))
    }
    return (
        <div className='bg-white '>
            {
                data ? (
                    <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
                        <div className='w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4' >
                            <RxCross1 size={30} className="absolute right-2 top-3 z-50"
                                onClick={() => setOpen(false)} />
                            <div className="block w-full 800px:flex">
                                <div className='w-full 800px:[50%]'>
                                    <img src={data?.images[0].url} alt="" />
                                    <div className='flex items-center'>
                                        <Link to={`/shop/preview/${data.shop._id}`}>
                                            <img src={data?.shop?.avatar.url} alt="" className='w-[50px] h-[50px] rounded-full mr-2' />
                                        </Link>

                                        <div>
                                            <Link to={`/shop/preview/${data.shop._id}`}>
                                                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                                            </Link>

                                            <h5 className="pb-3 text-[15px]">({data.shop.ratings}) Rating</h5>
                                        </div>


                                    </div>
                                    <div className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`} onClick={handleMessageSumbit}>
                                        <span className='text-[#fff] flex items-center'>Send Message
                                            <AiOutlineMessage className='ml-1' /></span>
                                    </div>
                                    <h5 className="text-[16px] text-[red] mt-5 "> ({data.sold_out}) Sold out</h5>
                                </div>

                                <div className="w-full 800px:w-[50%] pt-5 pl-[5px]">
                                    <h1 className={`${styles.productTitle} text-[20px]`}>{data.name}</h1>
                                    <p>{data.description}</p>
                                    <div className="flex pt-3">
                                        <h4 className={`${styles.productDiscountPrice}`}>
                                            {data.discountPrice}$
                                        </h4>
                                        <h3 className={`${styles.price}`}>{data.originalPrice ? data.originalPrice + " $" : null}</h3>
                                    </div>
                                    <div className="flex items-center mt-12 justify-between pr-3">
                                        <div>
                                            <button className='bg-gradient-to-r  from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                                onClick={() => { if (count > 1) setCount(count - 1) }}
                                            >
                                                -
                                            </button>
                                            <span className='bg-gray-200 text-gray-600 font-medium px-4 py-[9px]'>
                                                {count}
                                            </span>
                                            <button className='bg-gradient-to-r  from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                                onClick={() => setCount(count + 1)}>
                                                +
                                            </button>
                                        </div>
                                        {
                                            click ? <AiFillHeart size={30} className='cursor-pointer '
                                                onClick={() => handleRemoveFromWishlist(data._id)}
                                                color={click ? "red" : "#333"}
                                                title='Remove from wishlist' /> :
                                                <AiOutlineHeart size={30} className='cursor-pointer  '
                                                    onClick={() => handleAddToWishlist(data._id)}
                                                    color={click ? "red" : "#333"}
                                                    title='Add to wishlist' />
                                        }
                                    </div>

                                    <div className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`} onClick={handleAddToCart}>
                                        <span className="text-[#fff] flex items-center"> Add to cart
                                            <AiOutlineShoppingCart className='ml-1' /></span>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default ProductDetailCard