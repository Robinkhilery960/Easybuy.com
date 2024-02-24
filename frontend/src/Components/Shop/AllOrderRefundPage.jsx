import React from 'react'
import DashboardHeader from './Layout/DashboardHeader'
import DashboardSideBar from './Layout/DashboardSideBar'
import AllOrderRefund from "../Shop/AllOrderRefund.jsx"
const AllOrderRefundPage = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex  justify-between w-full">
                <div className="w-[100px] 800px:w-[330px]">
                    <DashboardSideBar active={10} />
                </div>
                <div className="w-full flex justify-center">
                    <AllOrderRefund />
                </div>
            </div>
        </div>
    )
}

export default AllOrderRefundPage

