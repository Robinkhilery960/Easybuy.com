import React from 'react'
import DashboardHeader from './Layout/DashboardHeader'
import OrderDetails from "../Shop/OrderDetails.jsx"
import Footer from '../layout/Footer.jsx'

const OrderDetailPage = () => {
    return (
        <div>
            <DashboardHeader />
            <OrderDetails />
            <Footer />
        </div>
    )
}

export default OrderDetailPage