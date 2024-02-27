import React, { useState } from 'react'
import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader.jsx"
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar.jsx"
import DashboardHero from "../../Components/Shop/Layout/DashboardHero.jsx"

const ShopDashboardPage = () => {

    return (
        <div>
            <>
                <DashboardHeader />
                <div className="flex items-start  justify-between w-full">
                    <div className="w-[100px] 800px:w-[330px]">
                        <DashboardSideBar active={1} />
                    </div>
                    <DashboardHero />
                </div>
            </>
        </div>
    )
}

export default ShopDashboardPage