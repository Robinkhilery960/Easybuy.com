import React from 'react'
import styles from '../../Styles/style'
import { City, Country, State } from 'country-state-city'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { server } from '../../server'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Checkout = () => {
    const { user } = useSelector(state => state.user)
    const { cart } = useSelector(state => state.cart)
    const [userInfo, setUserInfo] = useState(false)
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState(null)
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [couponCode, setCouponCode] = useState("")
    const [couponCodeData, setCouponCodeData] = useState("")
    const [discountPrice, setDiscountPrice] = useState("")
    let navigate = useNavigate()

    const paymentSubmit = () => {
        if (address1 === "" || address2 === "" || zipCode === null || country === "" || state === "") {
            return toast.error("Please choose your delivery address")
        } else {
            let shippingAddress = {
                address1,
                address2,
                zipCode,
                country,
                state
            }
            let orderData = {
                cart, totalPrice, subTotalPrice, shippingAddress, shippingCost, discountPrice, user
            }

            localStorage.setItem("lastOrder", JSON.stringify(orderData))
            navigate("/payment")
        }

    }

    const subTotalPrice = cart && cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)

    const shippingCost = subTotalPrice * 0.1
    const totalPrice = couponCodeData ? (shippingCost + subTotalPrice - discountPrice) : (shippingCost + subTotalPrice)
    return (
        <div className='w-full flex flex-col items-center py-8'>
            <div className='w-[90%] 1000px:w-[70%] block 800px:flex'>
                <div className="w-full 800px:w-[65%]">
                    <ShippingInfo user={user} userInfo={userInfo} setUserInfo={setUserInfo} country={country} setCountry={setCountry} state={state} setState={setState} zipCode={zipCode} setZipCode={setZipCode} address1={address1} setAddress1={setAddress1} address2={address2} setAddress2={setAddress2} />
                </div>
                <div className="w-full 800px:w-[35%] 800px:my-0 mt-8">
                    <CardData
                        cart={cart}
                        subTotalPrice={subTotalPrice}
                        totalPrice={totalPrice}
                        discountPrice={discountPrice}
                        shippingCost={shippingCost}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        couponCodeData={couponCodeData}
                        setCouponCodeData={setCouponCodeData}
                        setDiscountPrice={setDiscountPrice}
                    />
                </div>
            </div>
            <div className={`${styles.button} w-[150px] 800px:w-[280px] mt-10 text-white`} onClick={paymentSubmit}>Go To Payment</div>
        </div>
    )
}

const ShippingInfo = ({ user, userInfo, setUserInfo, country, setCountry, state, setState, zipCode, setZipCode, address1, setAddress1, address2, setAddress2 }) => {
    return (
        <div className='w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8'>
            <h5 className='text-[18px] font-[500]'>Shipping Address</h5>
            <br />
            <form>
                <div className="full flex pb-3">
                    <div className="w-[50%]">
                        <label className='block pb-2'>Full Name</label>
                        <input type="text" required className={`${styles.input} !w-[95%]`} value={user && user.name} />
                    </div>
                    <div className="w-[50%]">
                        <label className='block pb-2'>Email Address</label>
                        <input type="text" required className={`${styles.input}`} value={user && user.email} />
                    </div>
                </div>
                <div className="full flex pb-3">
                    <div className="w-[50%]">
                        <label className='block pb-2'>Phone Number</label>
                        <input type="number" required className={`${styles.input} !w-[95%]`} value={user && user.phoneNumber} />
                    </div>
                    <div className="w-[50%]">
                        <label className='block pb-2'>Zip Code</label>
                        <input type="text" required className={`${styles.input}`} value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                    </div>
                </div>
                <div className="full flex pb-3">
                    <div className="w-[50%]">
                        <label className='block pb-2'>Country</label>
                        <select className='w-[95%] border h-[40px] rounded-[5px] ' value={country} onChange={(e) => setCountry(e.target.value)}>
                            <option value="" className='block pb-2'>Choose your country </option>
                            {
                                Country && Country.getAllCountries().map((country) => (
                                    <option value={country.isoCode} key={country.isoCode}>{country.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="w-[50%]">
                        <label className='block pb-2'>State</label>
                        <select className='w-[95%] border h-[40px] rounded-[5px] ' value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="" className='block pb-2'>Choose your State </option>
                            {
                                State && State.getStatesOfCountry(country).map((state) => (
                                    <option value={state.isoCode} key={state.isoCode}>{state.name}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>
                <div className="full flex pb-3">
                    <div className="w-[50%]">
                        <label className='block pb-2'>Address 1</label>
                        <input type="address" required className={`${styles.input} !w-[95%]`} value={address1} onChange={(e) => setAddress1(e.target.value)} />
                    </div>
                    <div className="w-[50%]">
                        <label className='block pb-2'>Address 2</label>
                        <input type="address" required className={`${styles.input}  `} value={address2} onChange={(e) => setAddress2(e.target.value)} />
                    </div>
                </div>
            </form>
            <h5 className='text-[18px] cursor-pointer inline-block' onClick={() => setUserInfo(!userInfo)}>
                Choose From saved address
            </h5>
            {
                userInfo && (
                    <div>
                        {
                            user && user.addresses.map((address) => (
                                <div className="w-full flex mt-1">
                                    <input type="checkbox" className='mr-3' value={address.addressType} onClick={() => setAddress1(address.address1) ||
                                        setAddress2(address.address2) ||
                                        setZipCode(address.zipCode) ||
                                        setCountry(address.country) ||
                                        setState(address.state)} />
                                    <h2>{address.addressType}</h2>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

const CardData = ({ cart, subTotalPrice, totalPrice, shippingCost, couponCode, setCouponCode, couponCodeData, setCouponCodeData, discountPrice, setDiscountPrice }) => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.get(
            `${server}/couponCode/get-single-couponCode/${couponCode}`
        ).then((res) => {
            if (res.data.couponCode !== null) {
                // validate your cpoupon code  
                const shopId = res.data.couponCode?.shopId
                const isCouponValid = cart && cart.filter((item) => item.shopId === shopId)
                if (isCouponValid.length === 0) {
                    toast.error("This coupon code is not valid for this shop")
                    setCouponCode("")
                } else {
                    const eligiblePrice = isCouponValid.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)
                    console.log(eligiblePrice)
                    const discountPrice = (eligiblePrice * res.data.couponCode?.value) / 100
                    setDiscountPrice(discountPrice)
                    setCouponCodeData(res.data.couponCode)
                    setCouponCode("")
                    toast.success("Coupon Code is Applied")
                }
            } else {
                toast.error("Coupon code does not exist ")
                setCouponCode("")
            }
        })
    }

    return (
        <div className='w-full bg-[#fff] rounded-md p-5 pb-8'>
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
                <h5 className='text-[18px] font-[600]'>$ {subTotalPrice}</h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
                <h5 className='text-[18px] font-[600]'>$ {shippingCost?.toFixed(2)}</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
                <h5 className='text-[18px] font-[600]'>{
                    couponCodeData ? "$ " + (discountPrice) : null
                }</h5>
            </div>
            <div className="flex justify-between items-center">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Total:</h3>
                <h5 className='text-[18px] font-[600] text-end pt-3'>$ {totalPrice?.toFixed(2)}</h5>
            </div>
            <br />
            <form  >
                <input type="text" className={`${styles.input} h-[40px] pl-2`} placeholder='Coupon Code' required value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <input type="submit" className={`w-full h-[40px] border border-[#F63B60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`} required value="Apply code" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default Checkout         