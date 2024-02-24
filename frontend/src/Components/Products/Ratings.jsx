import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsStarHalf } from 'react-icons/bs'

const Ratings = ({ rating }) => {
    console.log(rating)
    // 3
    let stars = []
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(
                <AiFillStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
            )
        } else if (i > rating && !Number.isInteger(rating)) {
            stars.push(
                <BsStarHalf className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
            )
        } else {
            stars.push(
                <AiOutlineStar className="mr-2 cursor-pointer" color="#F6BA00" size={20} />
            )
        }
    }
    return (
        <div className='flex'>{stars}</div>
    )
}

export default Ratings