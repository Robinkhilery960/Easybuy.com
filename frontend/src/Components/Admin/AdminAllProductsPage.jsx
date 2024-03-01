

import React from 'react'
import AdminDashboardHeader from './Layout/AdminDashboardHeader'
import AdminDashboardSideBar from './Layout/AdminDashboardSideBar'
import AdminAllProducts from "../Admin/AdminAllProducts.jsx"
const AdminAllProductsPage = () => {
    return (
        <div>
            <AdminDashboardHeader />
            <div className="flex  justify-between w-full">
                <div className="w-[100px] 800px:w-[330px]">
                    <AdminDashboardSideBar active={3} />
                </div>
                <div className="w-full flex justify-center">
                    <AdminAllProducts />
                </div>
            </div>
        </div>
    )
}

export default AdminAllProductsPage