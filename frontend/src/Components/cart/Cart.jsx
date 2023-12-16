import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { HiOutlineMinus, HiPlus } from 'react-icons/hi'
import { IoBagHandleOutline } from 'react-icons/io5'
import styles from '../../Styles/style'

const Cart = ({setOpenCart}) => {
    const cartData=[
        {
            name:"Iphine14 prPo max 256 g ssd and 8b ram silver colour",
            description:"test",
            price:999
        },
        {
            name:"Iphine14 pro max 256 g ssd and 8b ram silver colour",
            description:"test",
            price:999
        },
        {
            name:"Iphine14 pro max 256 g ssd and 8b ram silver colour",
            description:"test",
            price:999
        },
    ]
  return (
    <div className='fixed top-0 left-0 w-full bg-[#00000028] h-screen z-10 '>
        <div className='fixed top-0 right-0 h-[100%] bg-white flex flex-col justify-between w-[25%] shadow-sm  overflow-y-scroll '>
            <div >
                <div className='flex w-full justify-end pt-5 pr-5'>
                    <RxCross1 size={25} className='cursor-pointer' onClick={()=>setOpenCart(false)}/>
                </div>

                {/* Items length */}

                <div className={`${styles.normalFlex} p-4  `}>
                        <IoBagHandleOutline size={25}/>
                        <h5 className="pl-2 text-[20px] font-[500]">
                            3 items
                        </h5>
                </div>

                {/* cart singl items */}
                <br />
                <div  className='w-full border-t overflow-y-scroll '>
                    {
                        cartData && cartData.map((data, index)=>(
                            <CartSingle key={index} data={data}/>
                        ))
                    }
                </div>
                <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}>
                <h1 className='text-[#fff] text-[18px] font-[600]'>
                    Checkout Now (USD$ 1080)
                </h1>
                </div>
            </div>
        </div>
    </div>
  )
}

const CartSingle =({data})=>{
    const [value, setValue]= useState(1)
    const totalPrice= data.price * value
    return (
        <div className='border-b p-4'>
        <div className="w-full flex items-center">
            <div>
                <div className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer `} onClick={()=>setValue(value+1)}>
                    <HiPlus size={18} color="#fff" />
                </div>
                <span className='pl-[10px]'>{value}</span>
                <div className={`bg-[#a7abb14f] rounded-full  w-[25px] h-[25px]  ${styles.normalFlex} justify-center cursor-pointer`} onClick={()=>setValue(value===1 ? 1 : value-1)}>
                    <HiOutlineMinus size={16} color='#7d879c'/>
                </div>
            </div>

            <img src="https://media.istockphoto.com/id/1332967687/photo/pile-of-messy-colorful-yarn-with-selective-focus-on-an-isolated-white-background.jpg?s=1024x1024&w=is&k=20&c=NJj3Y9I8uLEXAocWJvFmfuOkeZEKlA4pcBq3w-gXXPo=" alt=""  className='w-[80px] h-[80px] ml-2'/>

            <div className='pl-[5px]'>
                <h1>{data.name}</h1>
                <h4 className='font-[400] text-[15px] text-[#00000082]'>${data.price} * {value}</h4>
                <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>US$   {totalPrice}</h4>
            </div>
            <RxCross1 className='cursor-pointer'/>
        </div>
        </div>
    )
}

export default Cart