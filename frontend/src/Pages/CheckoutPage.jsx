import React from 'react'
import Header from '../Components/layout/Header'
import CheckoutSteps from "../Components/CheckoutSteps.jsx"
import Checkout from "../Components/Checkout/checkout.jsx"
import Footer from '../Components/layout/Footer'


const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default CheckoutPage