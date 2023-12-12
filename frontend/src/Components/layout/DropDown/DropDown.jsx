import React from 'react'
import styles from '../../../Styles/style'
import { useNavigate } from 'react-router-dom'

const DropDown = ({ categoriesData, setDropDown }) => { 
    const navigate = useNavigate()
    const handleSubmit = (category) => {
        navigate(`/products?category=${category.title}`)
        setDropDown(false)
    }
    return (
        <div className='pb-4 w-[270px] bg-[#fff] z-30  rounded-b-md shadow-sm'>{
            categoriesData && categoriesData.map((cateogry) =>
            (
                <div className={`${styles.normalFlex}`} key={cateogry.id} onClick={() => handleSubmit(cateogry)}>
                    <img src={cateogry.image_Url} alt="" className='h-[25px] w-[25px] object-contain ml-3 select-none' />

                    <h3 className='m-3 cursor-pointer select-none'>{cateogry.title}</h3>
                </div>
            )
            )
        }</div>
    )
}

export default DropDown