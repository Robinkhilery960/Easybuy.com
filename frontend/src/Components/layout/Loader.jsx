import React from 'react'
import Lottie from "react-lottie"
import animationData from "../../Assets/animations/24151-ecommerce-animation.json"

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        renderSettings: {
            preservAspectRatio: "xMidYMid slice"
        }

    }
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Lottie options={defaultOptions} width={250} height={250} />
        </div>
    )
}

export default Loader