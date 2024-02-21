import React from 'react'
import DashboardHeader from './Layout/DashboardHeader'
import DashboardSideBar from './Layout/DashboardSideBar'
import AllOrders from "../Shop/AllOrders.jsx"
const AllOrdersPage = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex  justify-between w-full">
                <div className="w-[100px] 800px:w-[330px]">
                    <DashboardSideBar active={2} />
                </div>
                <div className="w-full flex justify-center">
                    <AllOrders />
                </div>
            </div>
        </div>
    )
}

export default AllOrdersPage