
import React from 'react'
import AdminDashboardHeader from './Layout/AdminDashboardHeader'
import AdminDashboardSideBar from './Layout/AdminDashboardSideBar'
import AdminAllOrders from "../Admin/AdminAllOrders.jsx"
const AdminAllOrdersPage = () => {
    return (
        <div>
            <AdminDashboardHeader />
            <div className="flex  justify-between w-full">
                <div className="w-[100px] 800px:w-[330px]">
                    <AdminDashboardSideBar active={2} />
                </div>
                <div className="w-full flex justify-center">
                    <AdminAllOrders />
                </div>
            </div>
        </div>
    )
}

export default AdminAllOrdersPage