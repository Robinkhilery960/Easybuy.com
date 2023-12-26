import React from 'react'
import styles from '../../../Styles/style'
import { productData } from '../../../Static/data'
import ProductCard from '../ProductCard/ProductCard'
import { useSelector } from 'react-redux'

const FeaturedProduct = () => {
  const {allProducts}= useSelector(state=>state.product)  
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
                <h1>Featured Products</h1>
            </div>
            <div className=" grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[125px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
                {
                    allProducts && allProducts.map((product)=>(
                        <ProductCard data={product} key={product._id}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default FeaturedProduct