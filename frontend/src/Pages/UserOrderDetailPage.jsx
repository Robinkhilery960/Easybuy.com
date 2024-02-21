import React from 'react'
import Footer from '../Components/layout/Footer.jsx'
import Header from '../Components/layout/Header.js' 
import UserOrderDetail from "../Pages/UserOrderDetail.jsx"
const UserOrderDetailPage = () => {
    return (
        <div>
            <Header />
            <UserOrderDetail />
            <Footer />
        </div>
    )
}

export default UserOrderDetailPage