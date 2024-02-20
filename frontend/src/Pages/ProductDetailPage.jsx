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
  const { allEvents } = useSelector(state => state.event)
  const { shop } = useSelector(state => state.shop)

  const [data, setData] = useState(null)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");


  useEffect(() => {
    if (!eventData) {
      const productData = allProducts && allProducts.find((product) => {
        return product._id === id
      })
      setData(productData)
    } else {
      const productData = allEvents && allEvents.find((event) => {
        return event._id === id
      })
      setData(productData)
    }

  }, [allProducts, allEvents])

  return (
    <>
      {
        data ? (<div>
          <Header activeHeading={3} />
          <ProductDetails data={data} />
          {
            !eventData ? (<SuggestedProduct data={data} />) : null
          }
          <Footer />
        </div>) : (<Loader />)
      }

    </>
  )
}

export default ProductDetailPage