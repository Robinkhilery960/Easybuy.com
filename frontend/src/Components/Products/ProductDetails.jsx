import { useEffect, useState } from "react"
import styles from "../../Styles/style"
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { backend_url } from "../../server"
import { loadShopProducts } from "../../redux/slice/product"
import { useDispatch, useSelector } from "react-redux"

const ProductDetails = ({ data }) => {
    const [select, setSelect] = useState(0)
    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleMessageSumbit = () => {
        navigate("/conversation=123456342343")
    }


    return (
        <div>
            {
                data ? <>
                    <div className={`${styles.section} w-[90%] 800px:w-[80%]   `}>
                        <div className="w-full py-5">
                            <div className="block w-full 800px:flex">
                                <div className="w-full 800px:w-[50%]">
                                    <img src={`${backend_url}${data?.images[select]}`} alt="" className="w-[80%]" />
                                    <div className="w-full flex my-3 gap-2 flex-wrap ">
                                        {
                                            data && data?.images.map((image, i) => (
                                                <div className={`${select === 0 ? "border" : "null"} cursor-pointer `} key={image}>
                                                    <img src={`${backend_url}${image}`} alt="" className="h-[200px]" onClick={() => setSelect(i)} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="w-full 800px:w-[50%] pt-5">
                                    <h1 className={`${styles.productTitle}`}>
                                        {data.name}
                                    </h1>
                                    <p>{data.description}</p>
                                    <div className="flex pt-3">
                                        <h4 className={`${styles.productDiscountPrice}`}>
                                            {data.discountPrice}₹
                                        </h4>
                                        <h3 className={`${styles.price}`}>
                                            {
                                                data.originalPrice ? data.originalPrice + "₹" : null
                                            }
                                        </h3>
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
                                                onClick={() => setClick(!click)}
                                                color={click ? "red" : "#333"}
                                                title='Remove from wishlist' /> :
                                                <AiOutlineHeart size={30} className='cursor-pointer  '
                                                    onClick={() => setClick(!click)}
                                                    color={click ? "red" : "#333"}
                                                    title='Add to wishlist' />
                                        }
                                    </div>
                                    <div className={`${styles.button} mt-6 !rounded !h-11 flex items-center`}>
                                        <span className="text-white flex items-center">
                                            Add to cart  <AiOutlineShoppingCart className="ml-1" />
                                        </span>
                                    </div>

                                    <div className='flex items-center pt-8'>
                                        <Link to={`/shop/preview/${data.shop._id}`}>
                                            <img src={`${backend_url}${data?.shop?.avatar}`} alt="" className='w-[50px] h-[50px] rounded-full mr-2' />
                                        </Link>

                                        <div className="pr-8">
                                            <h3 className={`${styles.shop_name} pb-1 pt-1`}>{data.shop.name}</h3>
                                            <h5 className="pb-3 text-[15px]">({data.shop.ratings}) Rating</h5>
                                        </div>
                                        <div className={`${styles.button} bg-[#6443d1] mt-4 !rounded-[4px] h-11`} onClick={handleMessageSumbit}>
                                            <span className='text-[#fff] flex items-center'>Send Message
                                                <AiOutlineMessage className='ml-1' /></span>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                        <ProductDetailInfo data={data} />
                        <br />
                        <br />
                    </div>
                </> : null
            }
        </div>
    )
}

const ProductDetailInfo = ({ data }) => {
    const {shopProducts}= useSelector(state=>state.product)
    const [active, setActive] = useState(1)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(loadShopProducts(data?.shop._id))
    }, [])
    return (
        <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded  ">
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className="relative">
                    <h5 className="text-[#000] text-[18px]  px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]" onClick={() => setActive(1)}>
                        Product Details
                    </h5>
                    {
                        active === 1 ? <div className={`${styles.active_indicator}`}></div> : null
                    }
                </div>
                <div className="relative">
                    <h5 className="text-[#000] text-[18px]  px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]" onClick={() => setActive(2)}>
                        Product Reviews
                    </h5>
                    {
                        active === 2 ? <div className={`${styles.active_indicator}`}></div> : null
                    }
                </div>
                <div className="relative">
                    <h5 className="text-[#000] text-[18px]  px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]" onClick={() => setActive(3)}>
                        Seller Information
                    </h5>
                    {
                        active === 3 ? <div className={`${styles.active_indicator}`}></div> : null
                    }
                </div>
            </div>

            {
                active === 1 ? (
                    <>
                        <p className="py-2 text-[18px ] leading-8 pb-10 whitespace-pre-line">{data.description}</p>
                    </>
                ) : null
            }
            {
                active === 2 ? (
                    <div className="w-full justify-center min-h-[40vh] flex items-center">
                        <p>No Reviews yet!</p>
                    </div>
                ) : null
            }
            {
                active === 3 ? (
                    <div className="w-full block 800px:flex p-5">
                        <div className="w-full 800px:w-[50%] ">
                            <div className='flex items-center'>
                                <Link to={`/shop/preview/${data.shop._id}`}>
                                    <img src={`${backend_url}${data?.shop?.avatar}`} alt="" className='w-[50px] h-[50px] rounded-full mr-2' />
                                </Link>
                                <div className="pl-3">
                                    <Link to={`/shop/preview/${data.shop._id}`}>
                                        <h3 className={`${styles.shop_name}`}>{data?.shop?.name}</h3>

                                    </Link>
                                    <h5 className="pb-2 text-[15px]">(4/5) Rating</h5>
                                </div>



                            </div>
                            <p className="pt-2">
                                {data?.shop?.description}
                            </p>
                        </div>
                        <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
                            <div className="text-left">
                                <h5 className="font-[600]">
                                    Joined on: <span className="font-[500]">
                                        {data?.shop?.createdAt.slice(0, 10)}
                                    </span>
                                </h5>
                                <h5 className="font-[600] pt-3">
                                    Total Products: <span className="font-[500]">
                                       {shopProducts.length}
                                    </span>
                                </h5>
                                <h5 className="font-[600] pt-3">
                                    Total Reviews: <span className="font-[500]">
                                        234
                                    </span>
                                </h5>
                                <Link to={`/shop/preview/${data.shop._id}`}>
                                    <div className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}>
                                        <h4 className="text-white ">
                                            Visit Shop
                                        </h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default ProductDetails