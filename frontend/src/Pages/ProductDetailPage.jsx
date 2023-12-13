import React, { useEffect, useState } from 'react'
import Header from '../Components/layout/Header'
import Footer from '../Components/layout/Footer'
import ProductDetails from "../Components/Products/ProductDetails.jsx"
import SuggestedProduct from "../Components/Products/SuggestedProduct.jsx"
import { useParams } from 'react-router-dom'
import { productData } from '../Static/data.js'


const ProductDetailPage = () => {
    const [data, setData]=useState(null)
    const {name} = useParams()
    const productName=name.replace(/-/g, " ")

    useEffect(()=>{
        const data= productData.find((product)=>product.name===productName)
        setData(data)
    }, [])
  return (
    <div>
        <Header activeHeading={3}/>
        <ProductDetails data={data}/>
        {
            data ? (<SuggestedProduct data={data}/>):null
        }
        <Footer/>
    </div>
  )
}

export default ProductDetailPage