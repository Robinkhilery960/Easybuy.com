import React from 'react' 
import Header from '../Components/layout/Header'
import CheckoutSteps from "../Components/CheckoutSteps.jsx" 
import Footer from '../Components/layout/Footer'
import Payment from '../Components/Payment/Payment.jsx'

const PaymentPage = () => {
    return (
        <div>
          <Header />
          <br />
          <br />
          <CheckoutSteps active={2} />
          <Payment />
          <br />
          <br />
          <Footer />
        </div>
      )
}

export default PaymentPage