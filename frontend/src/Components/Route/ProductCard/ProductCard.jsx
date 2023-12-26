import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../Styles/style'
import ProductDetailCard from '../ProductDetailCard/ProductDetailCard.jsx'
import { AiFillHeart, AiFillStar , AiOutlineStar, AiOutlineHeart, AiOutlineEye, AiOutlineShoppingCart  } from 'react-icons/ai'
import { backend_url } from '../../../server.js'
import Loader from '../../layout/Loader.jsx'

const ProductCard = ({ data }) => {
    const [click , setClick]= useState(false)
    const [open , setOpen]= useState(false)
    console.log(data)
    const product_name = data?.name?.replace(/\s+/g, "-")
    return (
        <>
        { 
        data ? (<div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer   '>
                <div className='flex justify-end '>

                </div>
                <Link to={ `/product/${product_name}`}>
                    <img src={`${backend_url}${data?.images[0]}`} alt="" className='w-full h-[170px] object-contain' />
                </Link>
                <Link to={`/shop/preview/${data?.shop._id}`}>
                    <h5 className={`${styles.shop_name}`}>
                        {data.shop.name}
                    </h5>
                </Link>
                <Link to={`/product/${product_name}`}><h4 className='pb-3 font-[500]'>
                    {data.name.length > 20 ? data.name.slice(0, 20) + "..." : data.name}
                </h4>
                <div className="flex">
                    <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20}/>
                    <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20}/>
                    <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20}/>
                    <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20}/>
                    <AiOutlineStar className="mr-2 cursor-pointer" color="#F6BA00" size={20}/>
                </div>
                <div className="py-2 flex items-center justify-between">
                    <div className="flex">
                        <h5 className={`${styles.productDiscountPrice} `}>
                            {
                                 data.price===0 ? data.originalPrice :data.discountPrice
                            }  ₹
                        </h5>
                        <h4  className={`${styles.price} `}>
                            {data.originalPrice?data.originalPrice + " ₹ ":null}
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
                        click ?<AiFillHeart size={22} className='cursor-pointer absolute right-2 top-5'
                        onClick={()=>setClick(!click)}
                        color={click? "red" : "#333"}
                        title='Remove from wishlist'/> :
                        <AiOutlineHeart size={22} className='cursor-pointer absolute right-2 top-5'
                        onClick={()=>setClick(!click)}
                        color={click? "red" : "#333"}
                        title='Add to wishlist'/> 
                    } 
                    <AiOutlineEye size={22} className='cursor-pointer absolute right-2 top-14'
                        onClick={()=>setOpen(!open)}
                        color="#333"
                        title='Quick View'/> 
                    <AiOutlineShoppingCart size={25} className='cursor-pointer absolute right-2 top-24'
                         
                        color="#444"
                        title='Add to cart'/> 
                    {
                        open ? (
                            <ProductDetailCard  setOpen={setOpen}  data={data}/>
                        ):null
                    }
                </div>
            </div>): <Loader/>
        }
            
        </>
    )
}

export default ProductCard