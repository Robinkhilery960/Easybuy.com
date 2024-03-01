import React from 'react'
import AdminDashboardHeader from './Layout/AdminDashboardHeader'
import AdminDashboardSideBar from './Layout/AdminDashboardSideBar'
import AdminAllUsers from "../Admin/AdminAllUsers.jsx"
const AdminAllUsersPage = () => {
    return (
        <div>
            <AdminDashboardHeader />
            <div className="flex  justify-between w-full">
                <div className="w-[100px] 800px:w-[330px]">
                    <AdminDashboardSideBar active={6} />
                </div>
                <div className="w-full flex justify-center">
                    <AdminAllUsers />
                </div>
            </div>
        </div>
    )
}

export default AdminAllUsersPage