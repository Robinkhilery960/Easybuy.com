import React, { useState } from 'react'
import { useEffect } from 'react'
import { productData } from '../../Static/data'
import styles from '../../Styles/style'
import ProductCard from '../Route/ProductCard/ProductCard'

const SuggestedProduct = ({ data }) => {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const result = productData && productData.filter((product) => product.category === data.category)
        setProducts(result)
    }, [])
    return (
        <div>{data ? (<div className={`p-4 ${styles.section}`}>
            <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
                Related Product
            </h2>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {
                    products && products.map((product) => (<ProductCard data={product} key={product.id} />))
                }
            </div>
        </div>) : null

        }</div>
    )
}

export default SuggestedProduct