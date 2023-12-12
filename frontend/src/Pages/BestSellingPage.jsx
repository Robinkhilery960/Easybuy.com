import React, { useEffect, useState } from 'react'
import { productData } from '../Static/data'
import ProductCard from '../Components/Route/ProductCard/ProductCard'
import Header from '../Components/layout/Header'
import styles from '../Styles/style'
import { useSearchParams } from 'react-router-dom' 

const BestSellingPage = () => { 
    const [data, setData] = useState([]) 
    useEffect(()=>{
            const data=productData && productData.sort((a, b)=>b.total_sell-a.total_sell)
            setData(data)
        
    }, [])
    return (
        <div >
            <Header activeHeading={2} />
            <br />
            <br />
            <div className={`${styles.section}`}>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {data && data.map((product) =><ProductCard data={product} key={product.id}/>)
            }
            
                </div>
                {
                data && data.length===0?(
                    <h1 className='text-center w-full pb-[100px] text-[20px]'>No Product Found</h1>
                ):null
            }
            </div>
           
        </div>
    )
}

export default BestSellingPage