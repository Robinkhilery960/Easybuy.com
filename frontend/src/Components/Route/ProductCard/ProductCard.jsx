import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../Styles/style'
import ProductDetailCard from '../ProductDetailCard/ProductDetailCard.jsx'
import { AiFillHeart, AiFillStar, AiOutlineStar, AiOutlineHeart, AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai'
import { backend_url } from '../../../server.js'
import Loader from '../../layout/Loader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addTocart } from '../../../redux/slice/cart.js'
import { toast } from 'react-toastify'
import { addToWishlist, removeFromWishlist } from '../../../redux/slice/wishlist.js'
import Ratings from '../../Products/Ratings.jsx'

const ProductCard = ({ data }) => { 
    const { cart } = useSelector(state => state.cart)
    const { wishlist } = useSelector(state => state.wishlist)

    const [click, setClick] = useState(false)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();

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
        }
    }
    const handleAddToWishlist = (id) => {
        if (cart && cart.find(item => item._id === data._id)) {
            return toast.error("Item is already in added to cart")
        }

        setClick(!click)
        dispatch(addToWishlist(data))


    }

    const handleRemoveFromWishlist = (id) => {
        setClick(!click)
        dispatch(removeFromWishlist(data._id))

    }

    useEffect(() => {
        if (wishlist && wishlist.find(item => item._id === data._id)) {
            setClick(true)
        } else {
            setClick(false)
        }
    }, [wishlist])
    return (
        <>
            {
                data ? (<div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer   '>
                    <div className='flex justify-end '>

                    </div>
                    <Link to={`/product/${data._id}`}>
                        <img src={`${backend_url}${data?.images[0]}`} alt="" className='w-full h-[170px] object-contain' />
                    </Link>
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                        <h5 className={`${styles.shop_name}`}>
                            {data.shop.name}
                        </h5>
                    </Link>
                    <Link to={`/product/${data._id}`}><h4 className='pb-3 font-[500]'>
                        {data.name.length > 20 ? data.name.slice(0, 20) + "..." : data.name}
                    </h4>
                        <div className="flex">
                            <Ratings rating={data?.ratings} />
                        </div>
                        <div className="py-2 flex items-center justify-between">
                            <div className="flex">
                                <h5 className={`${styles.productDiscountPrice} `}>
                                    {
                                        data.price === 0 ? data.originalPrice : data.discountPrice
                                    }
                                </h5>
                                <h4 className={`${styles.price} `}>
                                    {data.originalPrice ? data.originalPrice + " ₹ " : null}
                                </h4>
                            </div>
                            <span className='font-[400] text-[17px] text-[#68d284]'>
                                {data.sold_out} sold
                            </span>
                        </div>
                    </Link>
                    {/* side options */}
                    <div>
                        {
                            click ? <AiFillHeart size={22} className='cursor-pointer absolute right-2 top-5'
                                onClick={() => handleRemoveFromWishlist(data._id)}
                                color={click ? "red" : "#333"}
                                title='Remove from wishlist' /> :
                                <AiOutlineHeart size={22} className='cursor-pointer absolute right-2 top-5'
                                    onClick={() => handleAddToWishlist(data._id)}
                                    color={click ? "red" : "#333"}
                                    title='Add to wishlist'
                                />
                        }
                        <AiOutlineEye size={22} className='cursor-pointer absolute right-2 top-14'
                            onClick={() => setOpen(!open)}
                            color="#333"
                            title='Quick View' />
                        <AiOutlineShoppingCart size={25} className='cursor-pointer absolute right-2 top-24'

                            color="#444"
                            title='Add to cart'
                            onClick={() => handleAddToCart(data._id)}
                        />
                        {
                            open ? (
                                <ProductDetailCard setOpen={setOpen} data={data} />
                            ) : null
                        }
                    </div>
                </div>) : <Loader />
            }

        </>
    )
}

export default ProductCard