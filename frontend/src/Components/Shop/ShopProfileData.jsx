import React, { useEffect, useState } from 'react'
import { productData } from '../../Static/data'
import ProductCard from '../Route/ProductCard/ProductCard'
import styles from '../../Styles/style'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadShopProducts } from '../../redux/slice/product'
import Loader from "../layout/Loader"
import { loadShopOrders } from '../../redux/slice/order'
import { backend_url } from '../../server'
import Ratings from '../Products/Ratings'

const ShopProfileData = ({ isOwner }) => {
    const { shopProducts, shopProductsLoading } = useSelector(state => state.product)
    const { shopOrders } = useSelector(state => state.order)
    const { shop } = useSelector(state => state.shop)
    const { allEvents } = useSelector(state => state.event)
    const [active, setActive] = useState(1)
    const dispatch = useDispatch()

    const { shopId } = useParams()

    const shopEvents = allEvents && allEvents.filter((event) => event.shopId === shop._id)
    let allReviewsOfShop = []
    shopProducts && shopProducts.forEach(product => {
        if (product.reviews.length > 0) {
            allReviewsOfShop = [...allReviewsOfShop, ...product.reviews]
        }
    })

    useEffect(() => {
        dispatch(loadShopProducts(shopId))
        dispatch(loadShopOrders(shopId))
    }, [])
    return (
        <>
            {
                shopProductsLoading ? (<Loader />) : (<div className='w-full'>
                    <div className="flex w-full items-center justify-between">
                        <div className='w-full flex'>
                            <div className="flex items-center" onClick={() => setActive(1)}>
                                <h5 className={`font-[600] text-[20px] ${active === 1 ? "text-red-500" : "text-[#333]}"} cursor-pointer pr-[20px]`}>Shop Products</h5>
                            </div>

                            <div className="flex items-center" onClick={() => setActive(2)}>
                                <h5 className={`font-[600] text-[20px] ${active === 2 ? "text-red-500" : "text-[#333]}"} cursor-pointer pr-[20px]`}>Running  Events</h5>
                            </div>

                            <div className="flex items-center" onClick={() => setActive(3)}>
                                <h5 className={`font-[600] text-[20px] ${active === 3 ? "text-red-500" : "text-[#333]}"} cursor-pointer pr-[20px]`}>Shop Reviews   </h5>
                            </div>
                        </div>
                        <div>
                            {
                                isOwner && (
                                    <div>
                                        <Link to="/dashboard">
                                            <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                                                <span className='text-[#fff]'>Go Dashboard</span>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <br />
                    {
                        active === 1 && (<div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                            {
                                shopProducts && shopProducts.map(product => <ProductCard data={product} key={product._id} isShop={true} />)
                            }
                        </div>)
                    }
                    {
                        active === 2 && (<div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                            {
                                shopEvents && shopEvents.map(event => <ProductCard data={event} key={event._id} isShop={true} isEvent={true} />)
                            }
                        </div>)
                    }
                    {
                        active === 3 && (<div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
                            {
                                allReviewsOfShop && allReviewsOfShop.map(review => (
                                    <div className="flex" key={review._id}>
                                        <img src={`${backend_url}${review?.user?.avatar}`} alt="" className='w-[50px] h-[50px] rounded-full mr-2' />
                                        <div className="">
                                            <h4 className="text-[15px] font-semibold ">{review?.user?.name}
                                                <Ratings rating={review.rating} />
                                            </h4>
                                            <p className="">{review?.comment}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>)
                    }

                </div>)
            }
        </>

    )
}

export default ShopProfileData