import React from 'react'
import styles from '../../../Styles/style'
import CountDown from "./CountDown"

const EventCard = ({active}) => {
    return (
        <div className={`w-full block bg-white rounded-lg lg:flex p-2 ${active?'unset':'mb-12'}`}>
            <div className='w-full lg:w-[50%] m-auto' >
                <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
            </div>

            <div className='w-full lg:[w-50%] flex flex-col justify-center'>
            <h2 className={`${styles.productTitle}`}>Iphone 14 pro max 2/256gb</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium eaque illum illo pariatur nihil rem possimus saepe doloremque. Perferendis harum nemo, veniam consequatur a saepe facere natus. Laboriosam reiciendis impedit animi. Facilis dolor officia quam magnam, veniam, inventore labore dolorum temporibus eos soluta distinctio? Exercitationem, obcaecati? Sapiente eligendi, similique vel alias fugiat doloremque facere quisquam pariatur saepe, porro, unde quia?</p>
            <div className="flex py-2 justify-between">
                <div className="flex">
                    <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">1099 $</h5>
                    <h5 className="font-bold text-[20px] text-[#333] font-Roboto">999 $</h5> 
                </div>
                <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>120 sold</span>
            </div>
            <CountDown/>
        </div>

        </div>
        
    )
}

export default EventCard