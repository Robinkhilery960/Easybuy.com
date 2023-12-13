import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { BsCartPlus } from 'react-icons/bs'
import { HiOutlineMinus, HiPlus } from 'react-icons/hi'
import { IoBagHandleOutline } from 'react-icons/io5'
import styles from '../../Styles/style'
import { AiOutlineHeart } from 'react-icons/ai'

const Wishlist = ({setOpenWishlist}) => {
    const wishlistData=[
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
        {
            name:"Iphine14 pro max 256 g ssd and 8b ram silver colour",
            description:"test",
            price:999
        },
    ]
  return (
    <div className='fixed top-0 left-0 w-full bg-[#00000028] h-screen z-10 '>
        <div className='fixed top-0 right-0 min-h-full bg-white flex flex-col justify-between w-[25%] shadow-sm '>
            <div >
                <div className='flex w-full justify-end pt-5 pr-5'>
                    <RxCross1 size={25} className='cursor-pointer' onClick={()=>setOpenWishlist(false)}/>
                </div>

                {/* Items length */}

                <div className={`${styles.normalFlex} p-4  `}>
                        <AiOutlineHeart size={25}/>
                        <h5 className="pl-2 text-[20px] font-[500]">
                            3 items
                        </h5>
                </div>

                {/* cart singl items */}
                <br />
                <div  className='w-full border-t overflow-y-scroll '>
                    {
                        wishlistData && wishlistData.map((data, index)=>(
                            <WishlistSingle key={index} data={data}/>
                        ))
                    }
                </div>
                 
            </div>
        </div>
    </div>
  )
}

const WishlistSingle =({data})=>{
    const [value, setValue]= useState(1)
    const totalPrice= data.price * value
    return (
        <div className='border-b p-4'>
        <div className="w-full flex items-center justify-between">
            <RxCross1 className=' cursor-pointer'/>
             

            <img src="https://media.istockphoto.com/id/1332967687/photo/pile-of-messy-colorful-yarn-with-selective-focus-on-an-isolated-white-background.jpg?s=1024x1024&w=is&k=20&c=NJj3Y9I8uLEXAocWJvFmfuOkeZEKlA4pcBq3w-gXXPo=" alt=""  className='w-[80px] h-[80px] ml-2'/>

            <div className='pl-[5px]'>
                <h1>{data.name}</h1>
                <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>US$   {totalPrice}</h4>
            </div>
            <div>
                <BsCartPlus size={20} className="cursor-pointer" title="Add to cart"/>
            </div>

        </div>
        </div>
    )
}

export default Wishlist