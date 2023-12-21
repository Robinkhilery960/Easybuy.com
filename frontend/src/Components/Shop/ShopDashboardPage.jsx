import React, { useState } from 'react'
import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader.jsx"
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar.jsx"

const ShopDashboardPage = () => {
    const [active , setActive]= useState(1)
    return (
        <div> 
            <>
                <DashboardHeader/>
                <div className="flex items-center justify-between w-full">
                    <div className="w-[100px] 800px:w-[330px]">
                        <DashboardSideBar active={active} setActive={setActive}/>
                    </div>
                </div>
            </>
        </div>
    )
}

export default ShopDashboardPage