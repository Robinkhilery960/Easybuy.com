import React from 'react'
import DashboardSideBar from './Layout/DashboardSideBar'
import DashboardHeader from './Layout/DashboardHeader'
import ShopSetting from "./ShopSetting.jsx"

const ShopSettingPages = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex  justify-between w-full">
                <div className="w-[100px] 800px:w-[330px]">
                    <DashboardSideBar active={11} />
                </div>
                <div className="w-full flex justify-center">
                <ShopSetting/>
                </div>
            </div>
        </div>
    )
}

export default ShopSettingPages