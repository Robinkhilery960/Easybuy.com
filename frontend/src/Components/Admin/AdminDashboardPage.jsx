 
import React, { useState } from 'react'
import AdminDashboardHeader from "../../Components/Admin/Layout/AdminDashboardHeader.jsx"
import AdminDashboardSideBar from "../../Components/Admin/Layout/AdminDashboardSideBar.jsx"
import AdminDashboardHero from "../../Components/Admin/Layout/AdminDashboardHero.jsx"

const AdminDashboardPage = () => {

    return (
        <div>
            <>
                <AdminDashboardHeader />
                <div className="flex items-start  justify-between w-full">
                    <div className="w-[100px] 800px:w-[330px]">
                        <AdminDashboardSideBar active={1} />
                    </div>
                    <AdminDashboardHero />
                </div>
            </>
        </div>
    )
}

export default AdminDashboardPage