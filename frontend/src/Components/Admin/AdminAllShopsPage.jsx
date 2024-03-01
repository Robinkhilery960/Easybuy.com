  
import React from 'react'
import AdminDashboardHeader from './Layout/AdminDashboardHeader'
import AdminDashboardSideBar from './Layout/AdminDashboardSideBar'
import AdminAllShops from "../Admin/AdminAllShops.jsx"
const AdminAllShopsPage = () => {
    return (
        <div>
            <AdminDashboardHeader />
            <div className="flex  justify-between w-full">
                <div className="w-[100px] 800px:w-[330px]">
                    <AdminDashboardSideBar active={4} />
                </div>
                <div className="w-full flex justify-center">
                    <AdminAllShops />
                </div>
            </div>
        </div>
    )
}

export default AdminAllShopsPage