import React, { useEffect , useState} from 'react'
import { productData } from '../../../Static/data'
import styles from '../../../Styles/style'
import ProductCard from '../ProductCard/ProductCard.jsx'
import { useSelector } from 'react-redux'


const BestDeals = () => {
  const {allProducts}= useSelector(state=>state.product)  
    const [data, setData]= useState([])

     
    useEffect(()=>{ 
        const firstFive=allProducts && allProducts.slice(0, 5)
        setData(firstFive)
    },[allProducts])
    console.log(data)
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className=" grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[125px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
      {
        data && data.map((item)=>(
          <ProductCard data={item} key={item?._id}/>
        ))
      }
      </div>
      </div>

      
    </div>
  )
}

export default BestDeals