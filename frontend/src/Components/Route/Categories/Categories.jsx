import React from 'react'
import styles from '../../../Styles/style'
import { brandingData, categoriesData } from '../../../Static/data'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const navigate=useNavigate()
    const handleSubmit=(item)=>{
        navigate(`/products?category=${item.title}`)
    }
    return (
        <>   
            <div className={`${styles.section} hidden sm:block`}>
                <div className={`branding my-12 flex justify-between w-full shadow-lg bg-white p-5 rounded-md`}>
                    {
                        brandingData && brandingData.map((item , index)=>(
                            <div className='flex items-start' key={item.id}>
                                {item.icon} 
                                <div className="px-3">
                                    <h3 className="font-bold text-sm md:text-base">{item.title}</h3>
                                    <p className="text-xs md:text-sm">
                                            {item.Description}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div > 

            <div className={`${styles.section} bg-white rounded-lg p-6 mb-12 shadow-lg`} id='categories'>
                <div className=" grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
                    {
                        categoriesData && categoriesData.map((item)=>(
                                <div className="w-full flex items-center justify-between cursor-pointer overflow-hidden h-[100px]" key={item.id} onClick={()=>(handleSubmit(item))}>
                                    <h5 className='text-[18px] leading-[1.3]'>{item.title}</h5>
                                    <img src={item.image_Url} alt="image"   className='w-[120px] object-cover'/>
                                </div>
                        ))
                    }
                </div>

            </div>
        </>
    )
}

export default Categories