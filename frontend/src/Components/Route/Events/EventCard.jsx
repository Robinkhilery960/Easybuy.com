import React from 'react'
import styles from '../../../Styles/style'
import CountDown from "./CountDown"
import { backend_url } from '../../../server'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addTocart } from '../../../redux/slice/cart'

const EventCard = ({ active = 1, data }) => {
    console.log(data)
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const addToCartHandler = (e) => {
        const isItemExists = cart && cart.find((i) =>
            i._id === data._id
        )
        if (isItemExists) {
            toast.error("Item already in cart !")
        } else {
            const cartData = { ...data, qty: 1 }
            dispatch(addTocart(cartData))
            toast.success("Item added to cart successfully ")
        }

    }
    return (
        <div className={`w-full block bg-white rounded-lg lg:flex p-2 ${active ? 'unset' : 'mb-12'}`}>
            <div className='w-full lg:w-[50%] m-auto mr-5 ' >
                <img src={data?.images[0].url} alt="" />
            </div>
            <div className='w-full lg:[w-50%] flex flex-col justify-center'>
                <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
                <p>{data?.description}</p>
                <div className="flex py-2 justify-between">
                    <div className="flex">
                        <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">$ {data?.originalPrice}</h5>
                        <h5 className="font-bold text-[20px] text-[#333] font-Roboto"> $ {data?.discountPrice}</h5>
                    </div>
                    <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>{data?.sold_out} sold</span>
                </div>
                <CountDown endDate={data.endDate} />
                <br />
                <div className="flex items-center">
                    <Link to={`/product/${data._id}?isEvent=true`}><div className={`${styles.button} text-[#fff]`} > See Details</div></Link>
                    <div className={`${styles.button} text-[#fff] ml-5`} onClick={(e) => addToCartHandler(e)} > Add to Cart</div>
                </div>

            </div>

        </div>

    )
}


export default EventCard