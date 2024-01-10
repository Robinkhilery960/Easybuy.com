import React, { useEffect, useState } from 'react'
import Header from '../Components/layout/Header'
import Footer from '../Components/layout/Footer'
import ProductDetails from "../Components/Products/ProductDetails.jsx"
import SuggestedProduct from "../Components/Products/SuggestedProduct.jsx"
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { productData } from '../Static/data.js'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/layout/Loader.jsx'
import { loadAllProducts, loadShopProducts } from '../redux/slice/product.js'


const ProductDetailPage = () => {
  const { allProducts } = useSelector(state => state.product)
  const { shop } = useSelector(state => state.shop) 

  const [data, setData] = useState(null)
  const { id } = useParams()
  const dispatch= useDispatch()
  
  
  useEffect(() => {   
      const productData = allProducts && allProducts.find((product) => { 
        return product._id === id
      })
    setData(productData)
  }, [allProducts])
    
  return (
    <>
      {
        data   ? (<div>
          <Header activeHeading={3} />
          <ProductDetails data={data} />
          {
            data ? (<SuggestedProduct data={data} />) : null
          }
          <Footer />
        </div>) : (<Loader />)
      }

    </>
  )
}

export default ProductDetailPage